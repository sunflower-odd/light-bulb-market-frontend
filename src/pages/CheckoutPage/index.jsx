import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

const API = "http://localhost:8004"; // order_app

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      let userId = null;

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload.user_id;
        } catch (e) {
          console.error("Invalid token", e);
        }
      }

      const items = cartItems.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.qty,  
      }));

      const res = await fetch(`${API}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,   
        },
        body: JSON.stringify({
          items,
          promo_id: null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Ошибка оформления заказа");
        return;
      }

      // успех → success page
      navigate("/success", {
        state: data,
      });

    } catch (err) {
      console.error(err);
      alert("Ошибка сервера");
    }
  };

  return (
    <div className="checkout">
      <h1 className="checkout__title">Оформление заказа</h1>

      <div className="checkout__form">
        <h2>Контактные данные</h2>

        <input type="text" placeholder="Имя" />
        <input type="text" placeholder="Телефон" />
        <input type="text" placeholder="Адрес доставки" />
      </div>

      <div className="checkout__items">
        <h2>Ваш заказ</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="checkout__item">
            <span>{item.product.title}</span>
            <span>
              {item.qty} × {item.product.price} ₽
            </span>
          </div>
        ))}
      </div>

      <div className="checkout__summary">
        <h3>Итого: {total.toFixed(2)} ₽</h3>
      </div>

      <div className="checkout__actions">
        <button onClick={handleCheckout} className="checkout__button">
          Подтвердить заказ
        </button>

        <Link to="/cart" className="checkout__back">
          Вернуться в корзину
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;