import { Link } from "react-router-dom";
import "./style.css";

function AdminAccountPage() {

  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Invalid token", e);
    }
  }

  return (
    <div className="admin">

      <h1 className="admin__title">
        Панель управления
      </h1>

      <div className="admin__info">

        <p>
          <b>Пользователь:</b> {user?.email}
        </p>

        <p>
          <b>Роль:</b>{" "}
          {user?.role === "admin"
            ? "Администратор"
            : "Сотрудник"}
        </p>

      </div>

      <div className="admin__actions">

        {user?.role === "admin" && (
          <Link
            to="/admin/products"
            className="admin__button"
          >
            Управление товарами
          </Link>
        )}

        <Link
          to="/admin/orders"
          className="admin__button"
        >
          Управление заказами
        </Link>

        <button
          className="admin__button admin__button--danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Выйти
        </button>

      </div>

    </div>
  );
}

export default AdminAccountPage;