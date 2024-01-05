import { cartStore } from "../../stores/cartStore";
import { useEffect } from "react"

export const OrderInfo = () => {

    const { total, calculateTotalPrice, freeDelivery } = cartStore();

    useEffect(() => {
        calculateTotalPrice()
      }, []);

  return (
    <>
    <div>Order Value €{total}</div>
        {freeDelivery ? (
          <>
            <div>Delivery €0</div>
            <div className="total-price">Total €{total}</div>
          </>
        ) : (
          <>
            <div>Delivery €9</div>
            <div className="total-price">Total €{total + 9}</div>
          </>
        )}
    </>
  )
}
