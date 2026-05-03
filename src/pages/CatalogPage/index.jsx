import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import "./style.css";

const products = [
  {
    id: 1,
    title: "LED лампа E27 10W",
    price: 3.99,
    category: "LED",
    power: 10,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Умная лампа WiFi",
    price: 12.99,
    category: "Smart",
    power: 9,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Галогенная лампа",
    price: 2.49,
    category: "Галогенная",
    power: 35,
    image: "https://via.placeholder.com/300",
  },
];

function CatalogPage() {
  const [search, setSearch] = useState("");

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
              <ProductCard key={product.id} product={product} />
            ))}
        </section>

      </div>
    </div>
  );
}

export default CatalogPage;