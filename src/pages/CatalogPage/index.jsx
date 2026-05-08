import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import "./style.css";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:8000/products/");

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
      .then((data) => setProducts(data))
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

          <div>
            <p>Категория</p>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(1)}
                onChange={() => handleCategoryChange(1)}
              />
              LED
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(2)}
                onChange={() => handleCategoryChange(2)}
              />
              Smart
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(3)}
                onChange={() => handleCategoryChange(3)}
              />
              Other
            </label>
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