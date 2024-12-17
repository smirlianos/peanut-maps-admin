const { sendEmail } = require("../utils/email");
const { sendTimeStaff } = require("../utils/email");
const mailchimp = require("@mailchimp/mailchimp_marketing");

require("dotenv").config(); // Load environment variables

// Configure Mailchimp SDK using environment variables
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

exports.sendContactFormEmail = async (req, res) => {
    const { text, name, from } = req.body;

    if (!text) {
        return res.status(400).json({
            error: "Missing required fields: to, subject, text or html",
        });
    }

    try {
        await sendEmail({
            from: "info@peanutmaps.com",
            to: "info@peanutmaps.com",
            subject: "New Message from Peanut's General Store contact form",
            text: null,
            html: `<h3>Name:</h3><br>${name}<br><br><h3>Email:</h3><br>${from}<br><br><h3>Message:</h3><br>${text}`,
        });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
};

exports.sendTimestaff = async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Missing required fields: email",
        });
    }

    if (!name) {
        name = "Adventurer";
    }

    try {
        await sendEmail({
            from: "info@peanutmaps.com",
            to: email,
            subject: "Your FREE Timestaff PDF!",
            text: "",
            html: "<p>HERE IT IS</p>",
        });

        await sendEmail({
            from: "info@peanutmaps.com",
            to: "info@peanutmaps.com",
            subject: "New Subscriber",
            text: "",
            html: `<p>New Subscriber:<br>${email}</p><br><p>Name:<br>${name}</p>`,
        });

        // Add or update the subscriber in Mailchimp Audience
        const subscriberHash = email.toLowerCase().trim();
        const response = await mailchimp.lists.setListMember(
            AUDIENCE_ID,
            mailchimp.utils.md5(subscriberHash),
            {
                email_address: email,
                status_if_new: "subscribed", // Add subscriber if new
                merge_fields: {
                    FNAME: name,
                },
            }
        );

        console.log("Mailchimp Response:", response);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send email" });
    }
};
