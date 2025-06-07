const functions = require("firebase-functions");
const { google } = require("googleapis");

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID1;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET1;
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN1;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI1;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

exports.sendEmail = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(204).send("");
    }

    const { recipient, subject, message } = req.body;
    if (!recipient || !subject || !message) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
    }

    try {
        const email = [
            `To: ${recipient}`,
            "Subject: " + subject,
            "",
            message
        ].join("\n");

        const encodedMessage = Buffer.from(email).toString("base64");

        await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage
            }
        });

        res.status(200).json({ success: true, message: "Email Sent" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.toString() });
    }
});
