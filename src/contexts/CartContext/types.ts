import { ReactNode } from "react"
import { Products, WishList } from "../../types"

export interface CartProps {
  children: ReactNode
}

export interface CartContextData {
  handleAddToCart: (productId: number) => void
  handleWishlist: (productId: number) => void
  isInCart: (productId: number) => boolean
  wishlist: WishList[]
  cart: Products[]
}