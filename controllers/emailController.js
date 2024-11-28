const { sendEmail } = require("../utils/email");

exports.sendTestEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res
            .status(400)
            .json({
                error: "Missing required fields: to, subject, text or html",
            });
    }

    try {
        await sendEmail({ to, subject, text, html });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
};
