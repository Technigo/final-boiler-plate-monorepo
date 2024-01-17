import { cartStore } from "../../../stores/cartStore";
import { Button } from "../../../components/buttons/Button";
import "./CartItem.css";

import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

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
        <span className="botanical-name cart-item-botanical-name">
          {botanicalName}
        </span>
        <p>€{price}</p>
        <p>Quantity {quantity}</p>
        <div className="cart-item-btn-container">
          <Button
            className="cart-btn"
            onClick={() => handleRemoveFromCart(index)}
            btnText={<CiCircleMinus size={28} />}
          />
          <Button
            className="cart-btn"
            onClick={() => handleAddToCart(index)}
            btnText={<CiCirclePlus size={28} />}
          />
        </div>
      </div>
    </div>
  );
};
