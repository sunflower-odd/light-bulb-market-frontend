import { useEffect, useState } from "react";
import "./style.css";

const API = "http://localhost:8004";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const loadOrders = async () => {
    const res = await fetch(`${API}/admin/orders`, {
      headers,
    });

    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    await fetch(`${API}/admin/orders/${orderId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    loadOrders();
  };

  return (
    <div className="admin-orders">

      <h1>Заказы</h1>

      {orders.map((order) => (
        <div key={order.order_id} className="admin-orders__item">

          <div>
            <p><b>ID:</b> {order.order_id}</p>
            <p><b>Сумма:</b> {order.amount_rub}</p>
            <p><b>Статус:</b> {order.status}</p>
          </div>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order.order_id, e.target.value)
            }
          >
            <option value="NEW">NEW</option>
            <option value="PAID">PAID</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

        </div>
      ))}

    </div>
  );
}

export default AdminOrders;