const { sendEmail } = require("../utils/email");

exports.sendTestEmail = async (req, res) => {
    const { text, html } = req.body;

    if (!text && !html) {
        return res.status(400).json({
            error: "Missing required fields: to, subject, text or html",
        });
    }

    try {
        await sendEmail({ text, html });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
};

exports.sendTimestaff = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Missing required fields: email",
        });
    }

    try {
        await sendTimeStaff({ email });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to send email" });
    }
};
