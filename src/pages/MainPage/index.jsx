import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../store/actions/productActions";
import "./style.css";

function MainPage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

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

      {/* ПОПУЛЯРНЫЕ ТОВАРЫ */}
      <section className="main__catalog">

        <h2 className="main__subtitle">
          Популярные лампы
        </h2>

        <div className="main__grid">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>

      </section>

    </div>
  );
}

export default MainPage;