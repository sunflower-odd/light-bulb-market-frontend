import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/actions/cartActions";
import { removeFromCart, decreaseQty, increaseQty } from "../../store/actions/cartActions";
import "./style.css";

function CartPage() {

  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState("");
  const [promoId, setPromoId] = useState(null);

  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const navigate = useNavigate();

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.qty;
  }, 0);

  const finalTotal = total - (total * discount) / 100;

  const applyPromo = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/promos/check/${promoCode}`
      );

      const data = await res.json();

      if (!res.ok) {
        setPromoError(data.detail || "Promo not found");
        setDiscount(0);
        setPromoId(null);
        return;
      }

      setDiscount(data.discount_percent);
      setPromoId(data.promo_id); 
      setPromoError("");

    } catch (e) {
      console.error(e);
      setPromoError("Server error");
      setDiscount(0);
      setPromoId(null);
    }
  };

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const body = {
        items: items.map((item) => ({
          product_id: item.product.product_id,
          quantity: item.qty
        })),
        promo_id: promoId
      };

      const res = await fetch(
        "http://localhost:8001/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        }
      );

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        alert(data.detail || "Ошибка заказа");
        return;
      }

      alert("Заказ создан!");

      // очищаем корзину
      dispatch(clearCart());

      setPromoCode("");
      setPromoId(null);
      setDiscount(0);

      // переходим в историю заказов
      navigate("/orders");

    } catch (e) {
      console.error(e);
      alert("Ошибка сервера");
    }
  };

  return (
    <div className="cart">

      <h1>Корзина</h1>

      {/* промо */}
      <div className="cart__promo">

        <input
          type="text"
          placeholder="Промокод"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />

        <button onClick={applyPromo}>
          Применить
        </button>

        {promoError && (
          <p style={{ color: "red" }}>
            {promoError}
          </p>
        )}

      </div>

      {/* пустая */}
      {items.length === 0 && (
        <p className="cart__empty">Корзина пустая</p>
      )}

      {/* товары в корзине */}
      {items.map((item) => (
        <div
          key={item.product.product_id}
          className="cart__item"
        >

          <div>
            <h3>{item.product.title}</h3>
            <p>{item.product.price} ₽</p>
            <p>Количество: {item.qty}</p>
          </div>

        <div className="cart__controls">

          <button
            onClick={() =>
              dispatch(decreaseQty(item.product.product_id))
            }
          >
            -
          </button>

          <span className="cart__qty">
            {item.qty}
          </span>

          <button
            onClick={() =>
              dispatch(increaseQty(item.product.product_id))
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch(removeFromCart(item.product.product_id))
            }
          >
            удалить
          </button>

        </div>

        </div>
      ))}

      {/* итого */}
      {items.length > 0 && (
        <div className="cart__summary">

          <div>
            <h2>Итого: {finalTotal.toFixed(2)} ₽</h2>

            {discount > 0 && (
              <p>Скидка: -{discount}%</p>
            )}
          </div>

          <button
            className="cart__button"
            onClick={createOrder}
          >
            Оформить заказ
          </button>

        </div>
      )}

    </div>
  );
}

export default CartPage;