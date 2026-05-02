import { Link } from "react-router-dom";
import "./style.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
      />

      <div className="product-card__content">
        <h3 className="product-card__title">
          {product.title}
        </h3>

        <p className="product-card__price">
          {product.price} ₽
        </p>

        <Link
          to={`/product/${product.id}`}
          className="product-card__button"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;