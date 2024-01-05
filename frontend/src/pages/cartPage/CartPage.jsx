import { cartStore } from "../../stores/cartStore";
import { Link } from "react-router-dom"
import { CartItem } from "../../components/cartItem/cartItem"

import "./CartPage.css"

export const CartPage = () => {
  const { cart, clearCart } = cartStore();

  // console.log("CART!:", cart);
  // console.log("item-id's:", cart[0]._id);

  

  // console.log("remove item id:", itemId);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <section className="cart-page-section">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty...</p>}
      {cart.map((item, index) => {
        return (
          <CartItem  index={index} img={item.images.full_size_url} title={item.plant_title} price={item.price}/>
          // <div className="cart-item" key={index}>
          //   <img className="cart-img" src={item.images.full_size_url} alt="" />
          //   <div className="cart-item-text">
          //   <h3>{item.plant_title}</h3>
          //   <p>{item.price}€</p>
          //   <button onClick={() => handleRemoveFromCart(index)}>
          //     Remove
          //   </button>
          //   </div>
          // </div>
        );
      })}
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/check-out" ><button >Proceed to checkout</button></Link>
    </section>
  );
};