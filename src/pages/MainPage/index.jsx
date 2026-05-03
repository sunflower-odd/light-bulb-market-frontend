import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import "./style.css";

const products = [
  {
    id: 1,
    title: "LED лампа E27 10W",
    price: 3.99,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Умная лампа WiFi",
    price: 12.99,
    image: "https://via.placeholder.com/300",
  },
];

function MainPage() {
  return (
    <div className="main">

      {/* о магазине */}
      <section className="main__hero">
        <h1 className="main__title">
          Интернет-магазин «Сияй»
        </h1>

        <p className="main__text">
          Магазин современных лампочек: LED, умные и энергосберегающие решения для дома и бизнеса.
        </p>

        <Link to="/catalog" className="main__button">
          Перейти в каталог
        </Link>
      </section>

      {/* товары */}
      <section className="main__catalog">

        <h2 className="main__subtitle">
          Популярные лампы
        </h2>

        <div className="main__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

    </div>
  );
}

export default MainPage;