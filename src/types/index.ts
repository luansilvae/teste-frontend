export interface Products {
  id: number
  name: string
  image: string
  price: {
    listPrice: number
    sellingPrice: number
    installments: number
  }
  quantity: number,
  wishlist: boolean
}

export interface WishList {
  productId: number
  wishlist: boolean
}
