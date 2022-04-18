import { sendMail } from "../utils/contactEmailSender.js";

const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  sendMail({
    name: name,
    email: email,
    message: message,
  });

  res.status(201).json({
    message: "Thanks, For Contacting Us",
  });
};

export { sendMessage };
