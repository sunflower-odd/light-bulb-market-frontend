import { Link } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">Магазин современных лампочек</Link>
      </div>

      <nav className="header__nav">
        <Link to="/">О магазине</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина</Link>
        <Link to="/promo">Промо</Link>
        <Link to="/login" className="header__btn">Вход</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/orders">Мои Заказы</Link>
      </nav>
    </header>
  );
}

export default Header;