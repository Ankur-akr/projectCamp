import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) =>{
    new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const tarnsporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail ={
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await tarnsporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed")
        console.log("error", error);
        
    }
}

const emailVerificationMailgenContent = (username, verificaionUrl) =>{
    return{
        body:{
            name: username,
            intro: "Welcome to our App! we are excited to have on board",
            action:{
                instructions: "To verify your email please click on the following button",
                button:{
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificaionUrl,
                }
            },

            outro: "Need help, or have questions? just reply to this email"
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) =>{
    return{
        body:{
            name: username,
            intro: "We got a request to reset the password of your account",
            action:{
                instructions: "To reset your password please click on the following button or link",
                button:{
                    color: "#fecc19fe",
                    text: "Verify your email",
                    link: passwordResetUrl,
                }
            },

            outro: "Need help, or have questions? just reply to this email"
        }
    }
}

export{
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
} 