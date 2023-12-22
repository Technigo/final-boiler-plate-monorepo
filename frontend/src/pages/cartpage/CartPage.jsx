import { cartStore } from "../../stores/cartStore";

export const CartPage = () => {
  const { cart, removeFromCart, clearCart } = cartStore();

  console.log("CART!:", cart);
  console.log("item-id's:", cart[0]._id);

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
      {cart.map((item) => {
        return (
          <div key={item._id}>
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
