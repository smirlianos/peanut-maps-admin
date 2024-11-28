const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

exports.sendEmail = async ({ text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: "info@peanutmaps.com", // Sender address
            to: "info@peanutmaps.com", // Receiver
            subject: "Peanutmaps Contact Form", // Subject line
            text, // Plain text body
            html, // HTML body
        });

        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

exports.sendTimeStaff = async ({ email }) => {
    try {
        const info = await transporter.sendMail({
            from: "info@peanutmaps.com", // Sender address
            to: email, // Receiver
            subject: "Your PDF", // Subject line
            text, // Plain text body
            html: "HERE IS A PDF YOU MF",
        });
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};
