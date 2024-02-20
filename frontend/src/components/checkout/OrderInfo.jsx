import { cartStore } from "../../stores/useCartStore";
import { useEffect } from "react";
import "../../pages/checkOutPage/CheckOutPage.css";

export const OrderInfo = () => {
  const { calculateTotalPrice, total, totalWithDelivery, deliveryCost } =
    cartStore();

  useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <>
      <div className="order-info-item-wrapper">
        <p className="p-body">Order Value </p>
        <p className="p-body">€{total}</p>
      </div>
      <div className="order-info-item-wrapper">
        <p className="p-body">Delivery</p>
        <p className="p-body">€{deliveryCost}</p>
      </div>
      <div className="order-info-item-wrapper">
        <p className="p-body">Total</p>
        <p className="p-body">€{totalWithDelivery}</p>
      </div>
    </>
  );
};
