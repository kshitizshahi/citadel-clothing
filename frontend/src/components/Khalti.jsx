import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";
import Button from "../components/Button";

const Khalti = ({ prodId, prodName, totalAmount, paymentResult }) => {
  let config = {
    publicKey: process.env.REACT_APP_KHALTI_PUBLIC_KEY,
    productIdentity: prodId,
    productName: prodName,
    productUrl: process.env.REACT_APP_PUBLIC_URL,
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        // console.log(payload);

        const data = {
          token: payload.token,
          amount: payload.amount,
        };

        const res = await axios.post(`/api/payment/verify`, data);

        if (res) {
          toast.success("Payment successfull");
          let data = res.data.verifyRes;
          paymentResult({
            id: data.idx,
            token: data.token,
            isVerified: res.data.isVerified,
            paidOn: data.created_on,
          });
        }

        // console.log(res);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);

  return (
    <div>
      <Button
        text="Pay via Khalti"
        // amount: totalAmount * 100
        className="khalti-btn"
        onClick={(e) => checkout.show({ amount: 200 * 100 })}
      />
    </div>
  );
};

export default Khalti;
