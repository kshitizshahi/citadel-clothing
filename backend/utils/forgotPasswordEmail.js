import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendForgotPasswordMail = ({ path, user }) => {
  console.log(user);
  jwt.sign(
    { userId: user._id },
    process.env.EMAIL_SECRET,
    {
      expiresIn: "1h",
    },
    (err, emailToken) => {
      const url = `http://${path}/api/users/forgot-password/confirmation/${emailToken}`;

      const html = `  <table
      width="650"
      align="center"
      style="max-width: 650px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.9)"
      ;
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td>
          <a
            href="${process.env.ORIGIN}"
            style="
              text-decoration: none;
              font-size: 28px;
              color: black;
              font-family: Roboto;
              font-weight: 500;
            "
          >
            <p style="margin: 0 0 0 10px">Citadel</p>
          </a>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p
            style="
              font-size: 22px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-bottom: 0;
            "
          >
            Hello ${user.firstName},
          </p>
          <p
            style="
              margin-block: 50px 0;
              font-size: 22px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              padding-inline: 20px;
            "
          >
            Reset your password by clicking the button below.
          </p>
          <p
          style="
            margin-block: 0 40px;
            font-size: 20px;
            color: black;
            font-family: 'Roboto';
            font-weight: 500;
            padding-inline: 20px;
          "
        >
          The link will self expire in 1 hour.
        </p>
        </td>
      </tr>
      <tr style="text-align: center; height: 70px"">
        <td>
          <a
            style="
              font-size: 18px;
              color: black;
              font-family: 'Roboto';
              font-weight: 550;
              background-color: #ffffff;
              border: 1px solid black;
              text-align: center;
              border-radius: 2px;
              padding: 10px 45px;
              cursor: pointer;
              text-decoration: none
            "
            href="${url}"
          >
            Reset Password
          </a>
        </td>
      </tr>
    </table>
`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD,
        },
      });

      const mailOptions = {
        from: `Citadel <${process.env.SENDER_EMAIL}>`,
        to: user.email,
        subject: "Reset Password",
        html: html,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  );
};
