import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/contactUs.scss";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CONTACT_US } from "../utils/BaseUrl";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const contactUsSchema = yup
    .object({
      name: yup.string().required("This field is required."),
      email: yup
        .string()
        .email("Invalid email address.")
        .required("This field is required."),
      message: yup.string().required("This field is required."),
    })
    .required();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const handleContactUs = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(CONTACT_US, {
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="container">
        <p className="contact-heading">Shoot Us a Message</p>
        <div className="container-wrapper">
          <div className="contact-information">
            <p className="heading">Contact Info</p>
            <p className="sub-heading">
              Leave us a message and we will get back to you shortly.
            </p>
            <div className="contact-phone">
              <Icon icon="carbon:phone-filled" className="phone-number" />
              <p>+977 982992292</p>
            </div>
            <div className="contact-email">
              <Icon icon="ant-design:mail-outlined" className="email" />
              <p>citadel754@gmail.com</p>
            </div>
            <div className="contact-address">
              <Icon icon="carbon:location-filled" className="address" />
              <p>New Baneshwor, Kathmandu</p>
            </div>
          </div>
          <div className="contact-form">
            <div className="shipping-address-container">
              <div className="ship-container">
                <form onSubmit={handleSubmit(handleContactUs)}>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      {...register("name")}
                    ></input>
                    <p className="error">{errors.name?.message || "\u00A0"}</p>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email address"
                      {...register("email")}
                    ></input>
                    <p className="error">{errors.email?.message || "\u00A0"}</p>
                  </div>
                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                      type="text"
                      id="message"
                      placeholder="Your Message"
                      {...register("message")}
                    ></textarea>
                    <p className="error">
                      {errors.message?.message || "\u00A0"}
                    </p>
                  </div>

                  <div>
                    <Button
                      className="send-message-btn"
                      text="Send Message"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
