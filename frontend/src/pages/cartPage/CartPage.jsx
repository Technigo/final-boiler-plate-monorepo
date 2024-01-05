import { cartStore } from "../../stores/cartStore";
import { Link } from "react-router-dom";
import { CartItem } from "../../components/cart/cartItem/cartItem";
import { useEffect } from "react"
import { OrderInfo } from "../../components/cart/OrderInfo"

import "./CartPage.css";

export const CartPage = () => {
  const { cart, clearCart, total, calculateTotalPrice, freeDelivery } = cartStore();

//   console.log("CART!:", cart);
//   console.log("item-id's:", cart[0]._id);
//   console.log("remove item id:", itemId);


  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    calculateTotalPrice()
  }, []);

  //console.log("TOTAL:", total);

  return (
    <section className="cart-page-section">
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty...</p>}
      {cart.map((item, index) => {
        return (
          <div key={index}>
          <CartItem index={index} img={item.images.full_size_url} title={item.plant_title} botanicalName={item.botanical_name} price={item.price}/>
          </div>
        );
      })}
      <OrderInfo />
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/check-out" ><button>Proceed to checkout</button></Link>
      <Link to="/plants/all-plants" ><button>continue shopping</button></Link>
    </section>
  );
};