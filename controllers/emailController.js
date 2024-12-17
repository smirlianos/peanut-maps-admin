const { sendEmail } = require("../utils/email");
const { sendTimeStaff } = require("../utils/email");

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

        //add email to mailchimp list

        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send email" });
    }
};
