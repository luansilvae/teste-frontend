import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { formattedCurrency } from "../../utils/formattedCurrency";
import "./style.sass";
import { useCart } from "../../hooks/useCart";

const ProductList: React.FC = () => {
  const { products } = useProducts();
  const { handleAddToCart, isInCart, handleWishlist, wishlist } = useCart();

  return (
    <ul className="product__list">
      {products &&
        products.map((product) => (
          <li key={product.id} className="product__card">
            <div className="product__card--image">
              <img src={product.image} alt="Image" className="product__image" />

              <button
                className="product__wishlist-button"
                data-active={
                  wishlist.some((item) => item.productId === product.id)
                    ? "true"
                    : "false"
                }
                onClick={() => handleWishlist(product.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <g id="wishlist">
                    <circle
                      id="Ellipse 1"
                      cx="24"
                      cy="24"
                      r="24"
                      fill="#F2F3F6"
                    />
                    <path
                      id="Vector"
                      d="M34.1494 16.8566C33.5629 16.268 32.8667 15.8011 32.1003 15.4825C31.334 15.164 30.5126 15 29.6831 15C28.8535 15 28.0321 15.164 27.2658 15.4825C26.4994 15.8011 25.8032 16.268 25.2167 16.8566L23.9997 18.0775L22.7826 16.8566C21.5981 15.6682 19.9915 15.0006 18.3163 15.0006C16.6411 15.0006 15.0346 15.6682 13.85 16.8566C12.6655 18.0449 12 19.6566 12 21.3372C12 23.0177 12.6655 24.6295 13.85 25.8178L15.0671 27.0387L23.9997 36L32.9323 27.0387L34.1494 25.8178C34.7361 25.2295 35.2015 24.531 35.519 23.7622C35.8366 22.9934 36 22.1694 36 21.3372C36 20.505 35.8366 19.681 35.519 18.9122C35.2015 18.1434 34.7361 17.4449 34.1494 16.8566Z"
                      fill="#F2F3F6"
                      stroke="#1C1C1C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </button>
            </div>

            <h4 className="product__name">{product.name}</h4>

            <div className="product__price">
              <span className="product__price--listPrice">
                {formattedCurrency(product.price.listPrice)}
              </span>

              <strong className="product__price--sellingPrice">
                {formattedCurrency(product.price.sellingPrice)}
              </strong>

              <small className="product__price--installments">
                em até{" "}
                <strong>
                  {product.price.installments}x de{" "}
                  {formattedCurrency(
                    product.price.sellingPrice / product.price.installments
                  )}
                </strong>{" "}
                sem juros
              </small>
            </div>

            <button
              className="product__buyButton"
              data-added={isInCart(product.id)}
              onClick={() => handleAddToCart(product.id)}
            >
              {!isInCart(product.id) ? "Adicionar" : "Adicionado"}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ProductList;
