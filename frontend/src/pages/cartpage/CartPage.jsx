import { cartStore } from "../../stores/cartStore"

export const CartPage = () => {
    const { cart, removeFromCart, clearCart } = cartStore()

    console.log("CART!:", cart);

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId)
    }

    const handleClearCart = () => {
        clearCart()
    }
  return (
    <section>
        <h2>Your Shopping Cart</h2>
        {cart.map((item) => {
            return (
                <div key={item.id}>
                    <p>{item.plant_title}</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>

                </div>
            )
        })}
        <button onClick={handleClearCart}>Clear Cart</button>
    </section>
  )
}
