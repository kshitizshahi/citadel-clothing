import { useEffect, useState } from "react";
import { Forgot_Password_Page_Title } from "../utils/PageTitle";
import Button from "../components/Button";
import { toast } from "react-toastify";
import LoadingDots from "../components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FORGOT_PASSWORD } from "../utils/BaseUrl";
import "../styles/forgotPassword.scss";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const forgotPasswordSchema = yup
    .object({
      email: yup
        .string()
        .email("Invalid email address.")
        .required("This field is required."),
    })
    .required();

  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors: errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(FORGOT_PASSWORD, {
        email: data.email,
      });
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = Forgot_Password_Page_Title;
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="forgot-password-container">
          <div className="container">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="form-container">
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  ></input>
                  <p className="error">{errors.email?.message || "\u00A0"}</p>
                </div>
              </div>
              <Button className="send-email-btn" text="Send Email" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
