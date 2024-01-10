import { cartStore } from "../../stores/cartStore";
import { useEffect } from "react";

export const OrderInfo = () => {
  const { calculateTotalPrice, total, totalWithDelivery, deliveryCost } =
    cartStore();

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  console.log(totalWithDelivery);

  return (
    <>
      <div>Order Value €{total}</div>
      <div>Delivery €{deliveryCost}</div>
      <div className="total-price">Total €{totalWithDelivery}</div>
    </>
  );
};
