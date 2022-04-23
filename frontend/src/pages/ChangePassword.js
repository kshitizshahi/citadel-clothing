import { useEffect, useState } from "react";
import "../styles/changePassword.scss";
import { Change_Password_Page_Title } from "../utils/PageTitle";
import Button from "../components/Button";
import { toast } from "react-toastify";
import LoadingDots from "../components/Loading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { UPDATE_USER } from "../utils/BaseUrl";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const changePasswordSchema = yup
    .object({
      oldPassword: yup.string().required("This field is required."),
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
    resolver: yupResolver(changePasswordSchema),
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(UPDATE_USER, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = Change_Password_Page_Title;
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingDots />
      ) : (
        <div className="change-password-container">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-container">
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="Enter your old password"
                  {...register("oldPassword")}
                ></input>
                <p className="error">
                  {errors.oldPassword?.message || "\u00A0"}
                </p>
              </div>
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
                  placeholder="Enter your new password"
                  {...register("confirmNewPassword")}
                ></input>
                <p className="error">
                  {errors.confirmNewPassword?.message || "\u00A0"}
                </p>
              </div>
            </div>
            <Button className="change-password-btn" text="Change Password" />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
