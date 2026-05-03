import { useState } from "react";
import "./style.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // пока заглушка
    console.log("Login:", { email, password });

    alert("Вход выполнен (мок)");
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
            placeholder="Введите email"
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginPage;