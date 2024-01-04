import { CartItem } from "../../components/cartItem/cartItem";
import { Input } from "../../components/inputs/Input";
import { cartStore } from "../../stores/cartStore";
import { useState } from "react";


import "./CheckOut.css"

export const CheckOut = () => {
    const [email, setEmail] = useState();

    const { cart } = cartStore();

  return (
    <section>
        <h2>Check Out</h2>
        <p>Sign in or continue as guest</p>
        <h3>Continue as guest</h3>
        <p>YOUR INFORMATION</p>
        <Input type="text" placeholder="Your Full Name" onChange={email} ariaLabel="Name input."/>
        <Input type="number" placeholder="+46000123" onChange={email} ariaLabel="Phone input."/>
        <Input type="email" placeholder="your.email@email.com" onChange={email} ariaLabel="Email input."/>
        <Input type="text" placeholder="Street no. 1A" onChange={email} ariaLabel="Address input."/>
        <Input type="text" placeholder="ZIP" onChange={email} ariaLabel="ZIP input."/>
        <Input type="text" placeholder="City Name" onChange={email} ariaLabel="City input."/>
        <p>DELIVIERY</p>
        <p>delivery option 1</p>
        <p>delivery option 2</p>
        <p>PAYMENT</p>
        <ul>
            <li>
                <p>Pay with Klarna</p>
            </li>
            <li>
                <p>Pay with Card</p>
                <Input type="text" placeholder="Card Holder" onChange={email} ariaLabel="Cart holder input."/>
                <Input type="number" placeholder="Card Number" onChange={email} ariaLabel="City input."/>
                <Input type="number" placeholder="Date" onChange={email} ariaLabel="City input."/>
                <Input type="number" placeholder="CVC" onChange={email} ariaLabel="City input."/>
            </li>
        </ul>
        <p>TOTAL €: </p>
        <button>Pay</button>
        <p>*By pressing the pay button, you will get an email confirming our purchase. Please remember, this is not an actual shop, but a demo shop, so your purchase is not processed. </p>
        <p>Your Plants</p>
        {cart.map((item, index) => {
            return (
            <CartItem  index={index} img={item.images.full_size_url} title={item.plant_title} price={item.price}/>
            )
        })}



    </section>
  );
};
