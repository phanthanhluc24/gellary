const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const JWT = require("jsonwebtoken")
dotenv.config()
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const PASSWORD = process.env.PASSWORD
const TOKEN_FORGOT_PASSWORD = process.env.TOKEN_FORGOT_PASSWORD
module.exports = class Email {
    constructor(user) {
        this.to = user.email
        this.firstName = user.name
        this.from = 'Phan Thanh Luc <phanthanhluc2003@gmail.com>'
    }

    newTransport() {
        return nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: EMAIL_ADDRESS,
                pass: PASSWORD
            }
        })

    }

    async send(subject, content) {
        const mailOption = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: content
        }

        await this.newTransport().sendMail(mailOption)
    }

    async forgotPassword(id) {
        const token = JWT.sign({ id: id }, TOKEN_FORGOT_PASSWORD, { expiresIn: "1h" })
        const localhost=`http://localhost:5173/reset-new-password/${token}`
        await this.send("Bạn quên mật khẩu", `Vui lòng nhấn vào link này để nhập mật khẩu mới ${localhost}`)
    }
}
