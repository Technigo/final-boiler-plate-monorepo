import { cartStore } from "../../../stores/cartStore";

export const CartItem = ({
  index,
  img,
  title,
  price,
  botanicalName,
  quantity,
}) => {
  const { removeFromCart, addByIndexToCart } = cartStore();

  const handleRemoveFromCart = (index) => {
    removeFromCart(index);
    console.log(index);
  };

  const handleAddToCart = (index) => {
    addByIndexToCart(index);
  };

  return (
    <div className="cart-item" key={index}>
      <img className="cart-img" src={img} alt="" />
      <div className="cart-item-text">
        <h3>{title}</h3>
        <p>{botanicalName}</p>
        <p>€{price}</p>
        <p>Quantity {quantity}</p>
        <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
        <button onClick={() => handleAddToCart(index)}>Add Another</button>
      </div>
    </div>
  );
};
