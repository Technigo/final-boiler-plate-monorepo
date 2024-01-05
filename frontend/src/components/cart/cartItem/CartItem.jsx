import { cartStore } from "../../../stores/cartStore";

export const CartItem = ({ index, img, title, price, botanicalName}) => {

    const { removeFromCart } = cartStore()

    const handleRemoveFromCart = (index) => {
        removeFromCart(index);
        console.log(index);
      };

  return (
    <div className="cart-item" key={index}>
            <img className="cart-img" src={img} alt="" />
            <div className="cart-item-text">
            <h3>{title}</h3>
            <p>{botanicalName}</p>
            <p>€{price}</p>
            <button onClick={() => handleRemoveFromCart(index)}>
              Remove
            </button>
            </div>
          </div>
  )
}
