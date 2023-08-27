import { useEffect, useState } from "react";
import { Reset_Password_Page_Title } from "../utils/PageTitle";
import Button from "../components/Button";
import { toast } from "react-toastify";
import LoadingDots from "../components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { RESET_PASSWORD } from "../utils/BaseUrl";
import "../styles/forgotPassword.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const resetPasswordSchema = yup
    .object({
      newPassword: yup
        .string()
        .required("This field is required.")
        .min(8, "New Password must be at least 8 characters."),
      confirmNewPassword: yup
        .string()
        .required("This field is required.")
        .test("checkPassword", "Password does not match", (value) => {
          return value === getValues("newPassword");
        }),
    })
    .required();

  const {
    register: register,
    handleSubmit: handleSubmit,
    getValues,
    formState: { errors: errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      if (token !== "") {
        setLoading(true);
        const res = await axios.post(`${RESET_PASSWORD}/${token}`, {
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        });
        setLoading(false);
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error("No token");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = Reset_Password_Page_Title;
  }, []);

  useEffect(() => {
    if (searchParams.get("success") !== null) {
      const message = decodeURI(searchParams.get("success"));
      toast.success(message);
    }

    if (searchParams.get("token") !== null) {
      const resetPasswordToken = searchParams.get("token");
      setToken(resetPasswordToken);
    }
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
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter your new password"
                    {...register("newPassword")}
                  ></input>
                  <p className="error">
                    {errors.newPassword?.message || "\u00A0"}
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmNewPassword">
                    Re-enter New Password
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    placeholder="Re-enter your new password"
                    {...register("confirmNewPassword")}
                  ></input>
                  <p className="error">
                    {errors.confirmNewPassword?.message || "\u00A0"}
                  </p>
                </div>
              </div>
              <Button className="send-email-btn" text="Reset Password" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
