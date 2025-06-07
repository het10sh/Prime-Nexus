export const sendInvitation = async (email, documentId) => {
    if (!email) return;

    try {
        const documentUrl = `${window.location.origin}/workspace/${documentId}`;

        const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recipient: email,
                subject: "You're Invited to Collaborate on Prime Nexus!",
                message: `
                    <p>Hello,</p>
                    <p>You have been invited to collaborate on a document in <strong>Prime Nexus</strong>.</p>
                    <p>Click the button below to access the document:</p>
                    <a href="${documentUrl}" 
                        style="display:inline-block; padding:10px 15px; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">
                        Open Document
                    </a>
                    <p>If you don’t have an account, you’ll need to create one to access the document.</p>
                    <p>Best regards,<br>Prime Nexus Team</p>
                `,
                documentUrl
            }),
        });

        const data = await response.json();
        console.log("Response:", data);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};
