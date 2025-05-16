import nodemailer from "nodemailer";

export const sendEmail = async ({
    to,
    token
}: {
    to: string;
    token: string;
}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // use TLS com porta 465
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    const mailOptions = {
        from: `"MVP-SaaS" <${process.env.EMAIL_FROM}>`,
        to: to,
        subject: 'Reset Password',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição de sua senha. Clique no botão abaixo para criar uma nova senha:</p>
        <p style="text-align: center;">
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Redefinir Senha
          </a>
        </p>
        <p>Se você não solicitou esta alteração, pode ignorar este e-mail.</p>
        <p style="color: #888;">Este link expira em 1 hora.</p>
        <br/>
        <p>Atenciosamente,<br/>MVP-SaaS</p>
      </div>
    `
    };

    await transporter.sendMail(mailOptions);
};
