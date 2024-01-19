import { CartItem } from "../../components/cart/cartItem/CartItem";
import { InputField } from "../../components/inputs/InputField";
import { Link } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import { PersonalInfo } from "../../components/checkout/PersonalInfo";
import { DeliveryDetails } from "../../components/checkout/DeliveryDetails";
import { PaymentInfo } from "../../components/checkout/PaymentInfo";
import { OrderInfo } from "../../components/checkout/OrderInfo";
import { cartStore } from "../../stores/useCartStore";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Accordion from "../../components/accordion/Accordion";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { RiTruckLine, RiPlantLine } from "react-icons/ri";
import "./CheckOut.css";

export const CheckOut = () => {
  // variables for the emailjs function
  const serviceId = "service_yl79s0f";
  const templateId = "template_a3do47o";
  const publicKey = "14TsPm9sc7yUWZT-s";

  // email state for guest users for emailjs function
  const [email, setEmail] = useState();

  // accordion activeStep state for next and back button
  // const [activeStep, setActiveStep] = useState(0);
  // show state for show/hide additional personal information
  const [show, toggleShow] = useState(false);

  //This variable should change when we have an actual username
  let username = "Plant Friend";

  const { cart } = cartStore();

  console.log("EMAIL:", email);
  console.log("CART:", cart);

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: email,
      to_name: username,
      message: cart
        .map(
          (item, index) =>
            `${item.plant_title}\n Botanical Name: ${item.botanical_name}\nPrice: €${item.price}\nQuantity: ${item.quantity}\n\n`
        )
        .join("\n"),
      image_link: cart[0].images.full_size_url,
      image_alt: cart[0].plant_title,
      logo_link: "./big-logo-sand.svg",
      logo_alt: "Plants by Holm & Witting logotype",
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert(
          "You've got mail! An order confirmation is on it's way to your inbox!"
        );
      })
      .catch((error) => {
        console.error("Email could not be sent:", error);
        alert(
          "Unfortunately, we could not send you your order confirmation. Please try again!"
        );
      });
  };

  const handleContinueAsGuest = (e) => {
    e.preventDefault();
    toggleShow(!show);
  };

  // function to send email via emailjs to the user's email address
  const handlePayButtonClick = (e) => {
    e.preventDefault();
    sendEmail(e);
  };

  const accordionItems = [
    {
      title: "YOUR INFORMATION",
      content: (
        <div className="accordion-detail-wrapper">
          <div className="checkout-account-wrapper">
            <div className="login-wrapper">
              <p className="h2-p">Already have an account?</p>
              <Button btnText={"Log in"} />
            </div>
            <div className="login-wrapper">
              <p className="h2-p">Create an account!</p>
              <Button btnText={"Register"} />
            </div>
            <Button
              btnText={"Continue as guest"}
              onClick={handleContinueAsGuest}
            />
            <div className="form-wrapper">
              {show && (
                <>
                  <InputField
                    type="email"
                    name="email_from"
                    placeholder="your.email@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    ariaLabel="Email input."
                    labelTxt="Please put in your email"
                  />
                  <PersonalInfo />

                  {/* <Button btnText={"Next"} onClick={handleNext} /> */}
                </>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "DELIVERY DETAILS",
      content: (
        <div className="accordion-detail-wrapper">
          <div className="accordion-step-container">
            <div className="delivery-icons-wrapper">
              <div className="packed-with-love-container">
                <LuPackageCheck className="icon" />
                <p>packed with love</p>
              </div>
              <div className="climate-shipping-container">
                <RiTruckLine className="icon" />
                <p>climate shipping </p>
              </div>
            </div>
            <DeliveryDetails />
            {/* <Button btnText={"Back"} onClick={handleBack} />
            <Button btnText={"Next"} onClick={handleNext} /> */}
          </div>
        </div>
      ),
    },
    {
      title: "PAYMENT INFORMATION",
      content: (
        <div className="accordion-detail-wrapper">
          <div className="acc-step-container">
            <PaymentInfo />
            {/* <Button btnText={"Back"} onClick={handleBack} />
            <Button btnText={"Next"} onClick={handleNext} /> */}
          </div>
        </div>
      ),
    },
    {
      title: "YOUR ORDER",
      content: (
        <div className="accordion-detail-wrapper">
          <OrderInfo />
          <div className="cart-list-container">
            {cart.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  index={index}
                  img={item.images.full_size_url}
                  title={item.plant_title}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
          </div>
          {/* <Button btnText={"Back"} onClick={handleBack} /> */}
        </div>
      ),
    },
  ];

  return (
    <section>
      <Link to="/cart" className="go-back">
        <MdKeyboardArrowLeft className="go-back-icon" />
        Go back to cart
      </Link>
      <h2 className="section-title">Check Out</h2>
      <form className={"checkout-form"}>
        <Accordion items={accordionItems} showButtons={true} openFirstAccordion={true}/>

        <Button className={"pay-button"} type={"submit"} btnText={"Pay"} onClick={handlePayButtonClick} />
        <p className="p-small">
          *By pressing the pay button, you will get an email with your plant
          buddies. Please remember, this is <b>not</b> an actual shop, no money
          will be drawn, and unfortunately no plants will be sent. But thank you
          for testing it out!{" "}
        </p>
      </form>
    </section>
  );
};
