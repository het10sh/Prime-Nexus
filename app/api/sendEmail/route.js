import { google } from "googleapis";
import { NextResponse } from "next/server";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

// Authenticate with Gmail API
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function POST(req) {
    try {
        const { recipient, subject, message, documentUrl } = await req.json();

        // Log received data to check if it's correct
        console.log("Received Data:", { recipient, subject, message, documentUrl });

        if (!recipient || !subject || !message || !documentUrl) {
            console.error("❌ Missing required fields!");
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        // HTML email content with a button
        const emailContent = `
            <html>
            <body>
                <p>${message}</p>
                <a href="${documentUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                    Click Here to View Document
                </a>
            </body>
            </html>
        `;

        const encodedMessage = Buffer.from(
            `To: ${recipient}\r\n` +
            `Subject: ${subject}\r\n` +
            "MIME-Version: 1.0\r\n" +
            "Content-Type: text/html; charset=UTF-8\r\n\r\n" +
            `${emailContent}`
        ).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

        console.log("📨 Sending email...");

        await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: encodedMessage }
        });

        console.log("✅ Email sent successfully!");
        return NextResponse.json({ success: true, message: "Email Sent!" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        return NextResponse.json({ success: false, message: error.toString() }, { status: 500 });
    }
}
