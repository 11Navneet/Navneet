import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";

export const sendEmail = async({email, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        await User.findByIdAndUpdate(userId,{
            $set: {
                verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
            }
        })
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS,
            },
          });

          const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email, 
            subject: "Verify your email", 
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link given below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}