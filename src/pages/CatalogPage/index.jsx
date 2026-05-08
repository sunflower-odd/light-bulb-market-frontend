import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import "./style.css";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:8000/products/");

    if (search) url.searchParams.append("search", search);

    selectedCategories.forEach((id) => {
      url.searchParams.append("category_id", id);
    });

    if (maxPrice) {
      url.searchParams.append("max_price", maxPrice);
    }

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [search, selectedCategories, maxPrice]);

  // фильтрация по категории
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // фильтрация по цене
  const handlePriceChange = (value) => {
    setMaxPrice(value);
  };

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

            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(1)}
              />
              LED
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(2)}
              />
              Smart
            </label>

            <label>
              <input
                type="checkbox"
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
                onChange={() => handlePriceChange(5)}
              />
              до 5₽
            </label>

            <label>
              <input
                type="radio"
                name="price"
                onChange={() => handlePriceChange(15)}
              />
              до 15₽
            </label>
          </div>

        </aside>

        {/* товары */}
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