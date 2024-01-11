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
      <p className="h2-p">Order Value €{total}</p>
      <p className="h2-p">Delivery €{deliveryCost}</p>
      <p className="h2-p">Total €{totalWithDelivery}</p>
    </>
  );
};
