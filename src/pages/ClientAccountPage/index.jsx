import "./style.css";

function UserAccountPage() {
  return (
    <div className="account">
      <h1>Личный кабинет</h1>

      <div className="account__card">
        <h2>Профиль пользователя</h2>
        <p>Имя: Иван Иванов</p>
        <p>Email: user@mail.com</p>
      </div>

      <div className="account__card">
        <h2>Мои заказы</h2>
        <p>У вас пока нет заказов</p>
      </div>

      <div className="account__card">
        <h2>Адрес доставки</h2>
        <p>Не указан</p>
      </div>
    </div>
  );
}

export default UserAccountPage;