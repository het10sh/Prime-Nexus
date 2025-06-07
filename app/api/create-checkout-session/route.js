import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { userId, email, returnUrl } = await req.json(); // Get returnUrl from request

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            success_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/workspace`,
            cancel_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/workspace`,
            customer_email: email,
            metadata: {
              userId: userId, // ✅ This must be added!
            },
            line_items: [
              {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
              },
            ],
          });
          

        return Response.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
