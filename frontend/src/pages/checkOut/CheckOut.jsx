import { CartItem } from "../../components/cart/cartItem/CartItem";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import { OrderInfo } from "../../components/cart/OrderInfo";
import { cartStore } from "../../stores/cartStore";
import { useState } from "react";
import emailjs from "@emailjs/browser"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import "./CheckOut.css";

export const CheckOut = () => {
  const [email, setEmail] = useState();

  const { cart } = cartStore();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_yl79s0f", "template_l1q27lx", e.target, "14TsPm9sc7yUWZT-s")
  } 

  return (
    <section>
      <h2>Check Out</h2>
      <p>Already have an account?</p>
      <Button btnText={"Log in"}/> 

      
      <Button btnText={"Register"}/>
      <h3>Continue as guest</h3>
      <form className={"checkout-form"} onSubmit={sendEmail}>
      <Accordion>
        <AccordionSummary>
          <h3>YOUR INFORMATION</h3>
        </AccordionSummary>
        <AccordionDetails>
        <Input
            type="email"
            name={"email_from"}
            id={"emailFrom"}
            placeholder="your.email@email.com"
            onChange={email}
            ariaLabel="Email input."
            labelTxt={"Please put in your email"}
          />
          <Input
            type="text"
            placeholder="Daisy Evergreen"
            onChange={email}
            ariaLabel="Name input."
            value={"Lily Landersen"}
          />
          <Input
            type="text"
            placeholder="+46 12 123 12 12"
            onChange={email}
            ariaLabel="Phone input."
            value={"+46 12 123 12 12"}
          />
          <Input
            type="text"
            placeholder="Lily Lane 12"
            onChange={email}
            ariaLabel="Address input."
            value={"Lily Lane 12"}
          />
          <Input
            type="text"
            placeholder="123 45"
            onChange={email}
            ariaLabel="ZIP input."
            value={"123 45"}
          />
          <Input
            type="text"
            placeholder="Gardenville"
            onChange={email}
            ariaLabel="City input."
            value={"Lilytown"}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <h3>DELIVERY DETAILS</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Input type={"checkbox"} value={true} ariaLabel={"address-check"} labelTxt={"Same addess as above"} />
          <Input type={"radio"} labelTxt={"Collect at Post Office"} /> 
          <Input type={"radio"} labelTxt={"Home delivery"}/> 
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <h3>PAYMENT INFORMATION</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
            <Input type={"radio"} labelTxt={"Pay with Klarna"} />
            <ul>
              <li>Safe and easy</li>
              <li>Pay directly, with invoice or partial payments</li>
              <li>Save your card and banc card</li>
            </ul>
            </li>
            <li>
            <Input type={"radio"} labelTxt={"Pay with card"}/> 
              <Input
                type="text"
                placeholder="Lily Landersen"
                onChange={email}
                ariaLabel="Card holder input."
              />
              <Input
                type="number"
                placeholder="XXXX XXXX XXXX XXXX"
                onChange={email}
                ariaLabel="City input."
              />
              <Input
                type="number"
                placeholder="MM/YY"
                onChange={email}
                ariaLabel="City input."
              />
              <Input
                type="number"
                placeholder="CVC"
                onChange={email}
                ariaLabel="City input."
              />
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <h3>YOUR ORDER</h3>
        </AccordionSummary>
        <AccordionDetails>
          <OrderInfo />
          {cart.map((item, index) => {
            return (
              <CartItem
                index={index}
                img={item.images.full_size_url}
                title={item.plant_title}
                price={item.price}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Button type={"submit"} btnText={"Pay"} />
      <p>
        *By pressing the pay button, you will get an email with your plant buddies.
        Please remember, this is <b>not</b> an actual shop, no money will be drawn,
        and unfortunately no plants will be sent. But thank you for testing it out!{" "}
      </p>
      </form>
    </section>
  );
};
