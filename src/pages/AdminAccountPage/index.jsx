import { Link } from "react-router-dom";
import "./style.css";

const user = {
  name: "Анна Смирнова",
  role: "admin", // "employee" | "admin"
};

function AdminAccountPage() {
  return (
    <div className="admin">

      <h1 className="admin__title">
        Панель управления
      </h1>

      <div className="admin__info">
        <p><b>Пользователь:</b> {user.name}</p>
        <p><b>Роль:</b> {user.role === "admin" ? "Администратор" : "Сотрудник"}</p>
      </div>

      <div className="admin__actions">

        <Link to="/admin/products" className="admin__button">
          Управление товарами (лампы)
        </Link>

        {user.role === "admin" && (
          <Link to="/admin/users" className="admin__button admin__button--danger">
            Управление пользователями
          </Link>
        )}

        <Link to="/admin/orders" className="admin__button">
          Управление заказами
        </Link>

      </div>

    </div>
  );
}

export default AdminAccountPage;