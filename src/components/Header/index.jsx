import { Link } from "react-router-dom";
import "./style.css";
import { useState, useEffect } from "react";

function Header() {

  const [user, setUser] = useState(null);

  const loadUserFromToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (e) {
      console.error("Invalid token", e);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="header">

      <div className="header__logo">
        <Link to="/">
          Магазин современных лампочек
        </Link>
      </div>

      <nav className="header__nav">

        <Link to="/">О магазине</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">Корзина</Link>
        <Link to="/promo">Промо</Link>
        <Link to="/orders">Мои заказы</Link>

        {!user && (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "admin" ? (
              <Link to="/admin">
                Админ панель
              </Link>
            ) : (
              <Link to="/user_account">
                Личный кабинет
              </Link>
            )}

            <button
              onClick={logout}
              className="header__logout"
            >
              Выход
            </button>
          </>
        )}

      </nav>

    </header>
  );
}

export default Header;