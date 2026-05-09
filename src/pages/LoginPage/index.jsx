import { useState } from "react";
import "./style.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8001/auth/login?email=${email}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Ошибка входа");
        return;
      }

      localStorage.setItem("token", data.access_token);

      // Полная перезагрузка приложения
      window.location.href = "/";

    } catch (err) {
      console.error(err);
      alert("Ошибка сервера");
    }
  };

  return (
    <div className="login">
      <h1>Вход в интернет-магазин "Сияй"</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginPage;