import { cartStore } from "../../stores/cartStore";
import { useEffect } from "react";
import "../../pages/checkOut/CheckOut.css";

export const OrderInfo = () => {
  const { calculateTotalPrice, total, totalWithDelivery, deliveryCost } =
    cartStore();

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  console.log(totalWithDelivery);

  return (
    <>
      <div className="order-info-item-wrapper">
        <p className="h2-p">Order Value </p>
        <p className="h2-p">€{total}</p>
      </div>
      <div className="order-info-item-wrapper">
        <p className="h2-p">Delivery</p>
        <p className="h2-p">€{deliveryCost}</p>
      </div>
      <div className="order-info-item-wrapper">
        <p className="h2-p">Total</p>
        <p className="h2-p">€{totalWithDelivery}</p>
      </div>
    </>
  );
};
