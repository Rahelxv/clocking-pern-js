import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={style.main}>
      <div className={style.card}>
        <h3 className={style.title}>Clocking</h3>
        <Link to="/login" className={style.login}>
          Login
        </Link>
        <Link to="/register" className={style.reg}>
          Register
        </Link>
        <span className={style.copyright}>CopyRight © 2026 Rahel</span>
      </div>
    </div>
  );
}

export default LandingPage;
