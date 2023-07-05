import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

export const useCart = () => {
  const {
    cart,
    handleAddToCart,
    isInCart,
    handleWishlist,
    wishlist
  } = useContext(CartContext)

  return {
    cart,
    handleAddToCart,
    isInCart,
    handleWishlist,
    wishlist
  }
}
