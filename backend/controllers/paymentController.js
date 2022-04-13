import axios from "axios";

const verifyKhalti = async (req, res) => {
  const { token, amount } = req.body;
  const data = {
    token,
    amount,
  };
  const config = {
    headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` },
  };
  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );
    const verifyRes = response.data;
    res.status(200).json({ verifyRes, isVerified: true });
  } catch (error) {
    res.status(400).json({ error, isVerified: false });
  }
};

export { verifyKhalti };
