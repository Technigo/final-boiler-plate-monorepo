import { cartStore } from "../../stores/cartStore";
import { Link } from "react-router-dom";
import { CartItem } from "../../components/cart/cartItem/CartItem";
import { useEffect } from "react";
import { OrderInfo } from "../../components/checkout/OrderInfo";

import { MdKeyboardArrowLeft } from "react-icons/md";
import "./CartPage.css";

export const CartPage = () => {
  const {
    cart,
    clearCart,
    total,
    calculateTotalPrice,
    freeDelivery,
    numberOfProducts,
  } = cartStore();

  //   console.log("CART!:", cart);
  //   console.log("item-id's:", cart[0]._id);
  //   console.log("remove item id:", itemId);

  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  //console.log("TOTAL:", total);
  console.log(numberOfProducts);

  return (
    <section className="cart-page-section">
      <Link to="" className="go-back">
        <MdKeyboardArrowLeft className="go-back-icon"/>
        Continue shopping
      </Link>
      <h2 className="section-title">Shopping Cart</h2>
      <div className="cart-list-container">
      {cart.length === 0 && <p className="h2-p">Your cart is empty...</p>}
      {cart.map((item, index) => {
        return (
            <CartItem key={index}
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
      <OrderInfo />
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/check-out">
        <button>Proceed to checkout</button>
      </Link>
      <Link to="/plants/all-plants">
        <button>continue shopping</button>
      </Link>
    </section>
  );
};
