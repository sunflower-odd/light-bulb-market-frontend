import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import "./style.css";

const API = "http://localhost:8004";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // загрузка категорий
  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("categories error:", err));
  }, []);

  // загрузка продуктов
  useEffect(() => {
    const url = new URL(`${API}/products`);

    if (search) {
      url.searchParams.append("search", search);
    }

    selectedCategories.forEach((id) => {
      url.searchParams.append("category_id", id);
    });

    if (minPrice !== null) {
      url.searchParams.append("min_price", minPrice);
    }

    if (maxPrice !== null) {
      url.searchParams.append("max_price", maxPrice);
    }

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, [search, selectedCategories, minPrice, maxPrice]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setMinPrice(null);
    setMaxPrice(null);
  };

  return (
    <div className="catalog">

      <div className="catalog__search">
        <input
          type="text"
          placeholder="Поиск лампочек..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="catalog__layout">

        <aside className="catalog__filters">

          <h3>Фильтры</h3>

          <button onClick={resetFilters}>
            Сбросить фильтры
          </button>

          {/* КАТЕГОРИИ ИЗ API */}
          <div>
            <p>Категории</p>

            {categories.map((cat) => (
              <label key={cat.category_id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.category_id)}
                  onChange={() => handleCategoryChange(cat.category_id)}
                />
                {cat.title}
              </label>
            ))}
          </div>

          <div>
            <p>Цена</p>

            <label>
              <input
                type="radio"
                name="price"
                checked={minPrice === null && maxPrice === 5}
                onChange={() => {
                  setMinPrice(null);
                  setMaxPrice(5);
                }}
              />
              до 5₽
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={minPrice === 5 && maxPrice === 15}
                onChange={() => {
                  setMinPrice(5);
                  setMaxPrice(15);
                }}
              />
              5–15₽
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={minPrice === 15 && maxPrice === null}
                onChange={() => {
                  setMinPrice(15);
                  setMaxPrice(null);
                }}
              />
              больше 15₽
            </label>

          </div>

        </aside>

        <section className="catalog__products">
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
            />
          ))}
        </section>

      </div>
    </div>
  );
}

export default CatalogPage;