import { useParams } from "react-router-dom";
import "./style.css";

const products = [
  {
    id: 1,
    title: "LED лампа E27 10W",
    price: 3.99,
    category: "LED",
    power: "10W",
    brightness: "806 lm",
    color: "Тёплый белый",
    description: "Энергоэффективная LED лампа для дома и офиса.",
    image: "https://via.placeholder.com/400",
  },
  {
    id: 2,
    title: "Умная лампа WiFi",
    price: 12.99,
    category: "Smart",
    power: "9W",
    brightness: "800 lm",
    color: "RGB",
    description: "Умная лампа с управлением через приложение.",
    image: "https://via.placeholder.com/400",
  },
];

function ProductPage() {
  const { id } = useParams();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="product">Товар не найден</div>;
  }

  return (
    <div className="product">

      <div className="product__left">
        <img
          src={product.image}
          alt={product.title}
          className="product__image"
        />
      </div>

      <div className="product__right">
        <h1 className="product__title">
          {product.title}
        </h1>

        <p className="product__price">
          {product.price} ₽
        </p>

        <p className="product__description">
          {product.description}
        </p>

        <div className="product__specs">
          <p><b>Категория:</b> {product.category}</p>
          <p><b>Мощность:</b> {product.power}</p>
          <p><b>Яркость:</b> {product.brightness}</p>
          <p><b>Цвет:</b> {product.color}</p>
        </div>

        <button className="product__button">
          Добавить в корзину
        </button>
      </div>

    </div>
  );
}

export default ProductPage;