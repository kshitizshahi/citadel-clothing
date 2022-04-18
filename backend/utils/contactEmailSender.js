import nodemailer from "nodemailer";

export const sendMail = ({ name, email, message }) => {
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
            <p>Citadel</p>
          </a>
        </td>
      </tr>
      <tr >
        <td>
          <p
            style="
              font-size: 20px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-bottom: 10px;
              margin-top: 0;
            "
          >
            Name: ${name},
          </p>
          <p
          style="
            font-size: 22px;
            color: black;
            font-family: 'Roboto';
            font-weight: 500;
            margin-bottom: 0;
            margin-top: 0;
          "
        >
          Email: ${email},
        </p>
          <p
            style="
              font-size: 20px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-top: 10px;
            "
          >
          Message: ${message},

          </p>
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
    from: `Citadel Contact Us <${process.env.SENDER_EMAIL}>`,
    to: `Citadel <${process.env.SENDER_EMAIL}>`,
    subject: "Customer Support",

    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
