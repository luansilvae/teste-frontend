import { useEffect, useState } from "react"
import { Products } from "../types"
import data from "../products.json"

interface useProductsProps {
  products: Products[]
  error: string | null
  isFetching: boolean
}

export function useProducts(): useProductsProps {
  const [products, setProducts] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const listProducts: Products[] | any[] = data

      if (!listProducts) {
        setError("Não foi possível listar os produtos")
      }

      setProducts(listProducts)
    } finally {
      setIsFetching(false)
    }
  }, [])

  return { products, error, isFetching }
}
