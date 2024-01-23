import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cartStore } from "../../stores/useCartStore";
import { CartItem } from "../../components/cart/cartItem/CartItem";
import { OrderInfo } from "../../components/checkout/OrderInfo";
import { Button } from "../../components/buttons/Button"
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./CartPage.css";

export const CartPage = () => {
  const {
    cart,
    clearCart,
    calculateTotalPrice
  } = cartStore();

  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  return (
    <section className="cart-page-section">
      <div className="cart-page-wrapper">
      <Link to="/plants/all-plants" className="go-back">
        <MdKeyboardArrowLeft className="go-back-icon" />
        Continue shopping
      </Link>
        <h2 className="section-title">Shopping Cart</h2>
        <div className="cart-list-container">
          {cart.length === 0 && <p className="h2-p">Your cart is empty...</p>}
          {cart.map((item, index) => {
            return (
              <CartItem
                key={index}
                index={index}
                img={item.images.full_size_url}
                title={item.plant_title}
                botanicalName={item.botanical_name}
                price={item.price}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <div className="orderinfo-container">
          <OrderInfo />
        </div>
        <Button className="clear-btn" onClick={handleClearCart}
            btnText="Clear Cart"/>
        <div className="btn-wrapper-cart">
          <Link to="/plants/all-plants">
          <Button className="btn-primary" 
            btnText="Continue shopping"/>
          </Link>
          {cart.length != 0 && 
            <Link to="/check-out">
              <Button className="checkout-btn gradient-btn" 
              btnText="Proceed to checkout"/>
            </Link>
          }
        </div>
      </div>
    </section>
  );
};
