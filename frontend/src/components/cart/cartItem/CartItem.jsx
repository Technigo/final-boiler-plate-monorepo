import { cartStore } from "../../../stores/cartStore";
import { Button } from "../../../components/buttons/Button";
import "./CartItem.css"

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
    <div className="cart-item-wrapper" key={index}>
      <div className="cart-img-wrapper">
        <img className="cart-img" src={img} alt={title} />
      </div>
      <div className="cart-item-text">
        <h2 className="cart-item-title">{title}</h2>
        <span className="botanical-name cart-item-botanical-name">{botanicalName}</span>
        <p>€{price}</p>
        <p>Quantity {quantity}</p>
        <div className="cart-item-btn-container">
          <Button onClick={() => handleRemoveFromCart(index)} btnText={"Remove"} />
          <Button onClick={() => handleAddToCart(index)} btnText={"Add Another"}/>
        </div>
      </div>
    </div>
  );
};
