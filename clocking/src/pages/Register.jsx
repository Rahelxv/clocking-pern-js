import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pesan, setPesan] = useState("");

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
      setPesan("Registering an account...");
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setPesan("Registration successful! Please go to the Login page.");
        setEmail("");
        setPassword("");
      } else {
        setPesan(`Failed: ${data.error}`);
      }
    } catch (error) {
      setPesan("Failed to connect to backend server.");
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h3 className={styles.title}>Register</h3>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button onClick={handleSubmit} className={styles.button}>
          Register
        </button>

        {pesan && <p className={styles.message}>{pesan}</p>}

        <Link to="/login" className={styles.link}>
          Don't have an account? Log in here
        </Link>
      </div>
    </div>
  );
}

export default Register;
