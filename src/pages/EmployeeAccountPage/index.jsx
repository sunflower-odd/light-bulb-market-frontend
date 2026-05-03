import "./style.css";

const orders = [
  {
    id: 101,
    date: "2026-05-01",
    status: "В обработке",
    total: 25.97,
    items: 3,
  },
  {
    id: 102,
    date: "2026-04-28",
    status: "Доставлен",
    total: 12.99,
    items: 1,
  },
  {
    id: 103,
    date: "2026-04-20",
    status: "Отменён",
    total: 8.5,
    items: 2,
  },
];

function UserAccountPage() {
  return (
    <div className="account">

      <h1 className="account__title">
        Личный кабинет
      </h1>

      <div className="account__info">
        <p><b>Роль:</b> Сотрудник</p>
        <p><b>Доступ:</b> Просмотр и обработка заказов</p>
      </div>

      <h2 className="account__subtitle">
        Заказы
      </h2>

      <div className="account__table">

        <div className="account__row account__row--head">
          <div>ID</div>
          <div>Дата</div>
          <div>Статус</div>
          <div>Товаров</div>
          <div>Сумма</div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className="account__row">

            <div>#{order.id}</div>
            <div>{order.date}</div>

            <div>
              <span
                className={
                  "account__status " +
                  (order.status === "Доставлен"
                    ? "account__status--done"
                    : order.status === "Отменён"
                    ? "account__status--cancel"
                    : "account__status--progress")
                }
              >
                {order.status}
              </span>
            </div>

            <div>{order.items}</div>
            <div>{order.total} ₽</div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default UserAccountPage;