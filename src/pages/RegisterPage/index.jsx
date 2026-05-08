import { useState } from "react";
import "./style.css";

function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8001/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          login,
          password
        })
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

        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Зарегистрироваться
        </button>

      </form>

    </div>
  );
}

export default RegisterPage;