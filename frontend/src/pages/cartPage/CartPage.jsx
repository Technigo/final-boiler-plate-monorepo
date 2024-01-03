import { cartStore } from "../../stores/cartStore";

import "./CartPage.css"

export const CartPage = () => {
  const { cart, removeFromCart, clearCart } = cartStore();

  // console.log("CART!:", cart);
  // console.log("item-id's:", cart[0]._id);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    console.log(itemId);
  };

  // console.log("remove item id:", itemId);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <section>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty...</p>}
      {cart.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.plant_title}</p>
            <button onClick={() => handleRemoveFromCart(item._id)}>
              Remove
            </button>
          </div>
        );
      })}
      <button onClick={handleClearCart}>Clear Cart</button>
    </section>
  );
};