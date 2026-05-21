import { useEffect, useState } from "react";
import "./style.css";

const API = "http://localhost:8004";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    image_url: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();

      console.log("PRODUCTS FROM API:", data);

      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("LOAD PRODUCTS ERROR:", e);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // CREATE PRODUCT
  // =========================
  const createProduct = async () => {
    const payload = {
      title: form.title,
      category_id: Number(form.category_id),
      image_url: form.image_url,
      price: Number(form.price),
      description: form.description,
    };

    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      console.log("CREATE ERROR:", err);
      alert(err.detail || "Ошибка создания товара");
      return;
    }

    setForm({
      title: "",
      category_id: "",
      image_url: "",
      price: "",
      description: "",
    });

    loadProducts();
  };

  // =========================
  // DELETE PRODUCT
  // =========================
const deleteProduct = async (productId) => {
  console.log("DELETE ID:", productId);

  const res = await fetch(`${API}/products/${productId}`, {
    method: "DELETE",
    headers,
  });

  const text = await res.text(); // 👈 ВАЖНО

  console.log("DELETE STATUS:", res.status);
  console.log("DELETE RESPONSE:", text);

  if (!res.ok) {
    alert(`Ошибка удаления: ${res.status}`);
    return;
  }

  loadProducts();
};

  return (
    <div className="admin-products">
      <h1>Управление товарами</h1>

      {/* FORM */}
      <div className="admin-products__form">
        <input
          placeholder="Название"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Категория ID"
          value={form.category_id}
          onChange={(e) =>
            setForm({ ...form, category_id: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image_url}
          onChange={(e) =>
            setForm({ ...form, image_url: e.target.value })
          }
        />

        <input
          placeholder="Цена"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Описание"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={createProduct}>Создать</button>
      </div>

      {/* LIST */}
      <div className="admin-products__list">
        {products.map((p, index) => {
          const id = p.product_id ?? p.id; // 🔥 защита от разных API

          return (
            <div key={id ?? index} className="admin-products__item">
              <div>
                <b>{p.title}</b>

                <p><b>ID:</b> {id}</p>
                <p><b>Категория:</b> {p.category_id}</p>
                <p><b>Цена:</b> {p.price} ₽</p>
                <p><b>Описание:</b> {p.description}</p>

                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    style={{ width: "80px", marginTop: "8px" }}
                  />
                )}
              </div>

              <button onClick={() => deleteProduct(id)}>
                Удалить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminProducts;