require('dotenv').config({ path: "./config.env" });

const nodemailer = require('nodemailer');
const {authTemplate} = require('./template');

const EmailAddress = process.env.EMAIL;

const Email = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EmailAddress,
        pass: process.env.EMAIL_PASSWORD,
    }
});

exports.emailSignup = async (data) => {
    const transporter = Email();

    const mailOptions = {
        from: `${EmailAddress} <${EmailAddress}>`,
        to: data.email,
        subject: "Confirm Email",
        html: `
            ${authTemplate(
                "Verify email by clicking the box below.",
                "Confirm Email",
                data.url
            )}
        `
    }

    await transporter.sendMail(mailOptions);
}

exports.emailLogin = async (data) => {
    const transporter = Email();

    const mailOptions = {
        from: `${EmailAddress} <${EmailAddress}>`,
        to: data.email,
        subject: "Magic Link",
        html: `
            ${authTemplate(
                "Hello, you requested a login link",
                "Login to Meusic",
                data.url, 
            )}
        `
    }

    await transporter.sendMail(mailOptions);
}

