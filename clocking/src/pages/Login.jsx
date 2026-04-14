import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email.includes("@")) {
      setPesan("Please use the correct email");
      return;
    }
    if (password.length < 5) {
      setPesan("Input more for password (min. 5 characters)");
      return;
    }

    try {
      setPesan("Processing...");
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setPesan("Login successful! Login...");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setPesan(`Failed: ${data.error}`);
      }
    } catch (error) {
      setPesan("Failed to connect to backend server.");
    }
  }

  return (
    <div className={style.main}>
      <div className={style.card}>
        <h3 className={style.title}>Login</h3>

        <input
          className={style.input}
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={style.input}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={style.button} onClick={handleSubmit}>
          Login
        </button>

        {pesan && <p className={style.message}>{pesan}</p>}

        <Link to="/register" className={style.link}>
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
}

export default Login;
