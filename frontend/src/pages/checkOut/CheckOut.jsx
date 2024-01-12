import { CartItem } from "../../components/cart/cartItem/CartItem";
import { Input } from "../../components/inputs/Input";
import { Link } from "react-router-dom";
import { InputReadOnly } from "../../components/inputs/InputReadOnly";
import { Button } from "../../components/buttons/Button";
import { PersonalInfo } from "../../components/checkout/PersonalInfo";
import { DeliveryDetails } from "../../components/checkout/DeliveryDetails";
import { PaymentInfo } from "../../components/checkout/PaymentInfo";
import { OrderInfo } from "../../components/checkout/OrderInfo";
import { cartStore } from "../../stores/cartStore";
import { useState } from "react";
import emailjs from "@emailjs/browser";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "../../components/Accordion"

import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";
import { RiTruckLine, RiPlantLine } from "react-icons/ri";
import "./CheckOut.css";

export const CheckOut = () => {
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = "template_a3do47o";
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  const [email, setEmail] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [show, toggleShow] = useState(false);

  //This variable should change when we have an actual username
  let username = "Plant Friend"

  const { cart } = cartStore();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  console.log("EMAIL:", email);
  console.log("CART:", cart);

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: email,
      to_name: username,
      message: cart.map((item, index) => (
        `${item.plant_title}\n Botanical Name: ${item.botanical_name}\nPrice: €${item.price}\nQuantity: ${item.quantity}\n\n`
      )).join('\n'),
      image_link: cart[0].images.full_size_url,
      image_alt: cart[0].plant_title,
      logo_link: "./big-logo-sand.svg",
      logo_alt: "Plants by Holm & Witting logotype", 
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        alert("You've got mail! An order confirmation is on it's way to your inbox!")
      })
      .catch((error) => {
        console.error("Email could not be sent:", error);
        alert("Unfortunately, we could not send you your order confirmation. Please try again!")
      });
  };

  const accordionItems = [
    {
      title: "YOUR INFORMATION",
      content: (<div className="accordion-detail-wrapper">
      <div className="checkout-account-wrapper">
      <div className="login-wrapper">
        <p className="h2-p">Already have an account?</p>
        <Button btnText={"Log in"} />
        </div>
        <div className="register-wrapper">
        <p className="h2-p">Create an account!</p>
        <Button btnText={"Register"} />
        </div>
        <Button
          btnText={"Continue as guest"}
          onClick={() => toggleShow(!show)}
        />
        {show && (
          <>
            <input
              type="email"
              name={"email_from"}
              id={"emailFrom"}
              placeholder="your.email@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
              ariaLabel="Email input."
              labelTxt={"Please put in your email"}
            />
            <PersonalInfo />
            
            <Button btnText={"Next"} onClick={handleNext} />
          </>
        )}
        
      </div>
      <p className="h2-p step-counter">STEP 1/3</p>
    </div>),
    },
    {
      title: "DELIVERY DETAILS",
      content: (<div className="accordion-detail-wrapper">
      <div className="accordion-step-container">
      <div className="packed-with-love-container">
  <LuPackageCheck className="icon" />
  <p>packed with love</p>
</div>
<div className="climate-shipping-container">
  <RiTruckLine className="icon" />
  <p>climate shipping </p>
</div>
        <DeliveryDetails />
        <Button btnText={"Back"} onClick={handleBack} />
        <Button btnText={"Next"} onClick={handleNext} />
      </div>
      <p className="h2-p step-counter">STEP 2/3</p>
    </div>),
    },
    {
      title: "PAYMENT INFORMATION",
      content: (<div className="accordion-detail-wrapper">
      <div className="acc-step-container">
        <PaymentInfo />
        <Button btnText={"Back"} onClick={handleBack} />
        <Button btnText={"Next"} onClick={handleNext} />
      </div>
      <p className="h2-p step-counter">STEP 3/3</p>
    </div>),
    },
    {
      title: "YOUR ORDER",
      content: (
        <div className="accordion-detail-wrapper">
            <OrderInfo />
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
            <Button btnText={"Back"} onClick={handleBack} />
          </div>
      ),
    },
  ];

  return (
    <section>
      <Link to="/cart" className="go-back">
        <MdKeyboardArrowLeft className="go-back-icon"/>
        Go back to cart
      </Link>
      <h2 className="section-title">Check Out</h2>
      <form className={"checkout-form"} onSubmit={sendEmail}>
        
        <Accordion items={accordionItems}/>

        <Button type={"submit"} btnText={"Pay"} />
        <p>
          *By pressing the pay button, you will get an email with your plant
          buddies. Please remember, this is <b>not</b> an actual shop, no money
          will be drawn, and unfortunately no plants will be sent. But thank you
          for testing it out!{" "}
        </p>
      </form>
    </section>
  );
};

{/* <Accordion className="personal-info-accordion" defaultExpanded>
          <AccordionSummary>
            <Button btnText={"YOUR INFORMATION"} />
          </AccordionSummary>
          <AccordionDetails className="accordion-detail-wrapper">
            <div className="checkout-account-wrapper">
            <div className="login-wrapper">
              <p className="h2-p">Already have an account?</p>
              <Button btnText={"Log in"} />
              </div>
              <div className="register-wrapper">
              <p className="h2-p">Create an account!</p>
              <Button btnText={"Register"} />
              </div>
              <Button
                btnText={"Continue as guest"}
                onClick={() => toggleShow(!show)}
              />
              {show && (
                <>
                  <input
                    type="email"
                    name={"email_from"}
                    id={"emailFrom"}
                    placeholder="your.email@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    ariaLabel="Email input."
                    labelTxt={"Please put in your email"}
                  />
                  <PersonalInfo />
                  
                  <Button btnText={"Next"} onClick={handleNext} />
                </>
              )}
              
            </div>
            <p className="h2-p step-counter">STEP 1/3</p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={activeStep === 1}>
          <AccordionSummary>
            <Button btnText={"DELIVERY DETAILS"} />
          </AccordionSummary>
          <AccordionDetails className="accordion-detail-wrapper">
            <div className="accordion-step-container">
            <div className="packed-with-love-container">
        <LuPackageCheck className="icon" />
        <p>packed with love</p>
      </div>
      <div className="climate-shipping-container">
        <RiTruckLine className="icon" />
        <p>climate shipping </p>
      </div>
              <DeliveryDetails />
              <Button btnText={"Back"} onClick={handleBack} />
              <Button btnText={"Next"} onClick={handleNext} />
            </div>
            <p className="h2-p step-counter">STEP 2/3</p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={activeStep === 2}>
          <AccordionSummary>
            <Button btnText={"PAYMENT INFORMATION"} />
          </AccordionSummary>
          <AccordionDetails className="accordion-detail-wrapper">
            <div className="acc-step-container">
              <PaymentInfo />
              <Button btnText={"Back"} onClick={handleBack} />
              <Button btnText={"Next"} onClick={handleNext} />
            </div>
            <p className="h2-p step-counter">STEP 3/3</p>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={activeStep === 3}>
          <AccordionSummary>
            <Button btnText={"YOUR ORDER"} />
          </AccordionSummary>
          <AccordionDetails>
            <OrderInfo />
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
            <Button btnText={"Back"} onClick={handleBack} />
          </AccordionDetails>
        </Accordion> */}