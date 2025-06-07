import { buffer } from "micro";
import Stripe from "stripe";
import * as admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_KEY)
    ),
  });
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // optional, for serverless limits
export const runtime = 'nodejs'; // or 'edge' if using Edge functions

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  let event;

  try {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    console.log("🔍 Webhook request body:", buf.toString());  // Debugging log

    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Webhook received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userEmail = session.customer_email;

      console.log("🔥 Got user email from session:", userEmail);

      if (userEmail) {
        // Update user doc in Firebase
        await admin.firestore().collection("PrimeNexusUsers").doc(userEmail).set({
          subscriptionStatus: "active",
          docLimit: 20,
        }, { merge: true });

        console.log(`🔥 User ${userEmail} subscription updated to active with docLimit 20.`);
      } else {
        console.warn("⚠️ No user email found in session.");
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
