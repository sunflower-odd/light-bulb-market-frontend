import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function UserAccountPage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8004/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setUser(data);
    };

    loadUser();
  }, []);

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="account">

      <h1>Личный кабинет</h1>

      <div className="account__card">
        <h2>Профиль пользователя</h2>
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <div className="account__card">
        <h2>Мои заказы</h2>
        <p>Посмотреть историю заказов:</p>
        <Link to="/orders" className="account__link">
          Перейти к заказам →
        </Link>
      </div>

      <div className="account__card">
        <h2>Адрес доставки</h2>
        <p>{user.address || "Не указан"}</p>
      </div>

    </div>
  );
}

export default UserAccountPage;