import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

function CheckoutPage() {

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.qty,
    0
  );

  return (
    <div className="checkout">

      <h1 className="checkout__title">
        Оформление заказа
      </h1>

      {/* форма */}
      <div className="checkout__form">

        <h2>Контактные данные</h2>

        <input type="text" placeholder="Имя" />
        <input type="text" placeholder="Телефон" />
        <input type="text" placeholder="Адрес доставки" />

      </div>

      {/* товары */}
      <div className="checkout__items">

        <h2>Ваш заказ</h2>

        {cartItems.map((item) => (
          <div key={item.id} className="checkout__item">
            <span>{item.product.title}</span>
            <span>{item.qty} × {item.product.price} ₽</span>
          </div>
        ))}

      </div>

      {/* итого */}
      <div className="checkout__summary">
        <h3>Итого: {total.toFixed(2)} ₽</h3>
      </div>

      {/* кнопки */}
      <div className="checkout__actions">

        <Link to="/success" className="checkout__button">
          Подтвердить заказ
        </Link>

        <Link to="/cart" className="checkout__back">
          Вернуться в корзину
        </Link>

      </div>

    </div>
  );
}

export default CheckoutPage;