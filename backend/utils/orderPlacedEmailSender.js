import nodemailer from "nodemailer";

export const sendMail = ({ order, user, shippingAddress, name }) => {
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
              font-size: 23px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-bottom: 30px;
              margin-top: 0;
            "
          >
            Order Placed,
          </p>
          <p
            style="
              font-size: 22px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-bottom: 15px;
              margin-top: 0;
            "
          >
            Hi ${name},

          </p>
          <p
          style="
            font-size: 20px;
            color: black;
            font-family: 'Roboto';
            font-weight: 500;
            margin-bottom: 23px;
            margin-top: 0;
          "
        >
          Thanks for placing an order with us.

        </p>
          <p
            style="
              font-size: 18px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-bottom: 10px;
              margin-top: 0;
            "
          >
            Order Id: ${order._id},

          </p>
          <p
          style="
            font-size: 18px;
            color: black;
            font-family: 'Roboto';
            font-weight: 500;
            margin-bottom: 0;
            margin-top: 0;
          "
        >
          Placed On: ${order.createdAt},
        </p>
          <p
            style="
              font-size: 18px;
              color: black;
              font-family: 'Roboto';
              font-weight: 500;
              margin-top: 10px;
            "
          >
          Shipping Address: ${shippingAddress},

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
    from: `Citadel <${process.env.SENDER_EMAIL}>`,
    // to: user.email,
    to: `Citadel <${process.env.SENDER_EMAIL}>`,
    subject: "Your order has been placed",

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
