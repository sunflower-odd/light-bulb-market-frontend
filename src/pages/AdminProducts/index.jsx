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
    description: ""
  });

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadProducts = async () => {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async () => {
    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title: form.title,
        category_id: Number(form.category_id),
        image_url: form.image_url,
        price: Number(form.price),
        description: form.description
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.log(err);
      alert(err.detail || "Ошибка создания товара");
      return;
    }

    setForm({
      title: "",
      category_id: "",
      image_url: "",
      price: "",
      description: ""
    });

    loadProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers,
    });

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
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
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

        <button onClick={createProduct}>
          Создать
        </button>

      </div>

      {/* LIST */}
      <div className="admin-products__list">

        {products.map((p) => (
            <div key={p.product_id} className="admin-products__item">

            <div>
                <b>{p.title}</b>

                <p><b>ID:</b> {p.product_id}</p>
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

            <button onClick={() => deleteProduct(p.product_id)}>
                Удалить
            </button>

            </div>
        ))}

      </div>

    </div>
  );
}

export default AdminProducts;