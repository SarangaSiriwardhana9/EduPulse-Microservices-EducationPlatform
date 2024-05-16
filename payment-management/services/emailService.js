import Mailgun from "mailgun-js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const mailgun = new Mailgun({
    apiKey: API_KEY,
    domain: DOMAIN,
});

const sendEmail = async (email, subject, text, html) => {
    try {
        const data = {
            from: "imeshworkspace@gmail.com",
            to: email,
            subject,
            text,
            html,
        };
        return await mailgun.messages().send(data);
    }
    catch (error) {
        throw new Error("Failed to send email");
    }
}


export { sendEmail };