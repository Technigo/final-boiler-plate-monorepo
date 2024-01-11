import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contactForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import closeBtn from "../assets/close.svg";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json/";

// Contact form

export const ContactForm = ({
  advertiserName,
  productName,
  adTitle,
  handleClose,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const advertiserEmail = "greenbuddy.strawberry@gmail.com";

  // Send email
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Set up template parameters
    const templateParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      subject: adTitle,
      product_name: productName,
      message: form.current.message.value,
      to_email: advertiserEmail,
      to_name: advertiserName,
    };

    emailjs
      .send(
        "gmail_greenbuddy",
        "contactEmail_template",
        templateParams,
        "7DgDTJxdbcmLY4q0c"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          // Display message once the form has been sent successfully
          Swal.fire({
            title: "Congratulations!",
            text: "Your message has been sent successfully",
            icon: "success",
          }).then(() => {
            handleClose();
          });
        },
        (error) => {
          console.log(error.text);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="contact-form" ref={form} onSubmit={sendEmail}>
      <div className="close-btn">
        <img
          src={closeBtn}
          className="close-btn"
          alt="search-icon"
          onClick={handleClose}
        />
      </div>
      <div>
        <h1 className="contact-title">Contact Form</h1>
        <input placeholder="Your name" name="user_name" required />
        <input placeholder="E-mail" name="user_email" required />
        <textarea className="msg-box" placeholder="Message" name="message" />
      </div>
      <button className="submit-btn" type="submit" value="Send">
        {loading ? "Sending..." : "Submit"}
      </button>
      {loading && (
        <Lottie animationData={loadingAnimation} height={100} width={100} />
      )}
    </form>
  );
};
