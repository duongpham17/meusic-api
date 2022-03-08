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
                "Confirm Email",
                data.url,
                data.code
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
                "Login now",
                data.url, 
                data.code
            )}
        `
    }

    await transporter.sendMail(mailOptions);
}

