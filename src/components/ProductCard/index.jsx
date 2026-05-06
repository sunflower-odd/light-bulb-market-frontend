import { Link } from "react-router-dom";
import "./style.css";

const DEFAULT_IMAGE =
  "https://via.placeholder.com/300x200?text=No+Image";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        className="product-card__image"
        src={product.image_url || DEFAULT_IMAGE}
        alt={product.title}
      />

      <div className="product-card__content">

        <h3 className="product-card__title">
          {product.title}
        </h3>

        <p className="product-card__description">
          {product.description}
        </p>

        <p className="product-card__price">
          {product.price} ₽
        </p>

        <Link
          to={`/product/${product.product_id}`}
          className="product-card__button"
        >
          Подробнее
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;