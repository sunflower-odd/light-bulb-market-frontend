import "./style.css";

const users = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    status: "Активен",
  },
  {
    id: 2,
    name: "Анна Смирнова",
    email: "anna@example.com",
    status: "Неактивен",
  },
  {
    id: 3,
    name: "Дмитрий Иванов",
    email: "dmitry@example.com",
    status: "Активен",
  },
];

function UsersListPage() {
  return (
    <div className="users">

      <h1 className="users__title">Пользователи</h1>

      <div className="users__table">

        <div className="users__row users__row--head">
          <div>Имя</div>
          <div>Email</div>
          <div>Статус</div>
        </div>

        {users.map((user) => (
          <div key={user.id} className="users__row">

            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>
              <span
                className={
                  user.status === "Активен"
                    ? "users__status users__status--active"
                    : "users__status users__status--inactive"
                }
              >
                {user.status}
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default UsersListPage;