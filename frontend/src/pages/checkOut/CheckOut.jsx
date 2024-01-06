import { CartItem } from "../../components/cart/cartItem/CartItem";
import { Input } from "../../components/inputs/Input";
import { OrderInfo } from "../../components/cart/OrderInfo";
import { cartStore } from "../../stores/cartStore";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import "./CheckOut.css";

export const CheckOut = () => {
  const [email, setEmail] = useState();

  const { cart } = cartStore();

  return (
    <section>
      <h2>Check Out</h2>
      <p>Sign in or continue as guest</p>
      <h3>Continue as guest</h3>

      <Accordion>
        <AccordionSummary>
          <h3>YOUR INFORMATION</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Input
            type="text"
            placeholder="Your Full Name"
            onChange={email}
            ariaLabel="Name input."
          />
          <Input
            type="number"
            placeholder="+46000123"
            onChange={email}
            ariaLabel="Phone input."
          />
          <Input
            type="email"
            placeholder="your.email@email.com"
            onChange={email}
            ariaLabel="Email input."
          />
          <Input
            type="text"
            placeholder="Street no. 1A"
            onChange={email}
            ariaLabel="Address input."
          />
          <Input
            type="text"
            placeholder="ZIP"
            onChange={email}
            ariaLabel="ZIP input."
          />
          <Input
            type="text"
            placeholder="City Name"
            onChange={email}
            ariaLabel="City input."
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <h3>DELIVERY DETAILS</h3>
        </AccordionSummary>
        <AccordionDetails>
          <input type="radio" />
          <p>delivery option 1</p>
          <p>delivery option 2</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <h3>PAYMENT INFORMATION</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              <p>Pay with Klarna</p>
            </li>
            <li>
              <p>Pay with Card</p>
              <Input
                type="text"
                placeholder="Card Holder"
                onChange={email}
                ariaLabel="Cart holder input."
              />
              <Input
                type="number"
                placeholder="Card Number"
                onChange={email}
                ariaLabel="City input."
              />
              <Input
                type="number"
                placeholder="Date"
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

      <button>Pay</button>
      <p>
        *By pressing the pay button, you will get an email confirming our
        purchase. Please remember, this is not an actual shop, but a demo shop,
        so your purchase is not processed.{" "}
      </p>
    </section>
  );
};
