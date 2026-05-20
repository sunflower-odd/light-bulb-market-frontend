import { useState } from "react";
import "./style.css";

const API = "http://localhost:8004"; // order_app (users)

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          login,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Ошибка регистрации");
        return;
      }

      alert("Пользователь создан!");
    } catch (e) {
      console.error(e);
      alert("Ошибка сервера");
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>

      <form className="register__form" onSubmit={register}>
        <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
        <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default RegisterPage;