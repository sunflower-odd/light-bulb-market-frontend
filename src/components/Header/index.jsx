import { Link } from "react-router-dom";
import "./style.css";

function Header() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isAuth = !!localStorage.getItem("token");

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
        <Link to="/orders">Мои заказы</Link>

        {!isAuth && (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}

        {isAuth && (
          <>
            <Link to="/user_account">Личный кабинет</Link>

            <button onClick={logout} className="header__logout">
              Выход
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

export default Header;