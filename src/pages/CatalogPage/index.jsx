import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";
import "./style.css";

function CatalogPage() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // берём товары из Redux
  const products = useSelector((state) => state.products.list);
  console.log("CATALOG STATE:", products);
  // загрузка товаров при открытии страницы
  useEffect(() => {
    console.log(products);
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="catalog">

      {/* поиск */}
      <div className="catalog__search">
        <input
          type="text"
          placeholder="Поиск лампочек..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="catalog__layout">

        {/* фильтры */}
        <aside className="catalog__filters">
          <h3>Фильтры</h3>

          <div>
            <p>Категория</p>
            <label><input type="checkbox" /> LED</label><br />
            <label><input type="checkbox" /> Smart</label><br />
            <label><input type="checkbox" /> Галогенная</label>
          </div>

          <div>
            <p>Мощность</p>
            <label><input type="checkbox" /> до 10W</label><br />
            <label><input type="checkbox" /> 10–50W</label>
          </div>

          <div>
            <p>Цена</p>
            <label><input type="checkbox" /> до 5₽</label><br />
            <label><input type="checkbox" /> 5–15₽</label>
          </div>
        </aside>

        {/* товары */}
        <section className="catalog__products">
          {products
            .filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
        </section>

      </div>
    </div>
  );
}

export default CatalogPage;