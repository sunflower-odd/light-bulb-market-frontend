import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import "./style.css";

const cartItems = [
  {
    id: 1,
    title: "LED лампа E27 10W",
    price: 3.99,
    quantity: 2,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    title: "Умная лампа WiFi",
    price: 12.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
  },
];

function CartPage() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">

      <h1 className="cart__title">Корзина</h1>

      {cartItems.length === 0 ? (
        <p className="cart__empty">Корзина пуста</p>
      ) : (
        <>
          <div className="cart__list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart__summary">
            <h3>Итого: {total.toFixed(2)} ₽</h3>

            <Link to="/checkout" className="cart__button">
              Перейти к оформлению
            </Link>
          </div>
        </>
      )}

    </div>
  );
}

export default CartPage;