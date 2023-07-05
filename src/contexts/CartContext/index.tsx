import { createContext, useCallback, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Products, WishList } from "../../types";
import { CartContextData, CartProps } from "./types";

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProps) {
  const { products } = useProducts();

  const [cart, setCart] = useState<any[]>(() => {
    const storageValue = localStorage.getItem("cart");

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return [] as Products[];
    }
  });

  const [wishlist, setWishList] = useState<any[]>(() => {
    const storageValue = localStorage.getItem("wishlist");

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return [] as WishList[];
    }
  });

  const handleWishlist = useCallback((productId: number) => {
    setWishList((prev: WishList[]) => {
      const isProductInWishlist = prev.find(
        (product) => product.productId === productId
      );

      if (!isProductInWishlist) {
        const addedWishlist = [...prev, { productId, wishlist: true }];

        localStorage.setItem("wishlist", JSON.stringify(addedWishlist));

        return addedWishlist;
      } else {
        const removedWishlist = prev.filter(
          (product) => product.productId !== productId || !product.wishlist
        );

        localStorage.setItem("wishlist", JSON.stringify(removedWishlist));

        return removedWishlist;
      }
    });
  }, []);

  const handleAddToCart = useCallback(
    (productId: number) => {
      const productAdded = products.find((product) => product.id === productId);

      setCart((prev: Products[]) => {
        const isProductInCart = prev.find(
          (product) => product.id === productId
        );

        if (isProductInCart) {
          const cartRemovedProduct = prev.reduce((acc, product) => {
            if (product.id === productId) {
              if (product.quantity === 1) return acc;
              return [...acc, { ...product, quantity: product.quantity - 1 }];
            } else {
              return [...acc, product];
            }
          }, [] as Products[]);

          localStorage.setItem("cart", JSON.stringify(cartRemovedProduct));

          return cartRemovedProduct;
        } else {
          const newProductAdded = [...prev, { ...productAdded, quantity: 1 }];

          localStorage.setItem("cart", JSON.stringify(newProductAdded));

          return newProductAdded;
        }
      });
    },
    [products]
  );

  const isInCart = useCallback(
    (productId: number) => cart.some((product) => product.id === productId),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        cart,
        isInCart,
        handleWishlist,
        wishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
