import { useEffect, useState } from "react";
import "./style.css";

function OrdersPage() {

  const [orders, setOrders] = useState([]);
    console.log("ORDERS:", orders);
    console.log("TYPE:", typeof orders);
  useEffect(() => {
    const load = async () => {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8001/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setOrders(
        [...data].sort(
          (a, b) => b.order_id - a.order_id
        )
      );
    };

    load();
  }, []);

  return (
    <div className="orders">

      <h1>История заказов</h1>

      {orders.length === 0 && (
        <p>Заказов пока нет</p>
      )}

      {orders.map((order) => (
        <div key={order.order_id} className="orders__item">

          <h3>Заказ #{order.order_id}</h3>

          <p>Статус: {order.status}</p>

          <p>Сумма: {order.amount_rub} ₽</p>

        </div>
      ))}

    </div>
  );
}

export default OrdersPage;