import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DigitalTime from "./DigitalTime";
import style from "./Nav.module.css";
import AnalogTime from "./AnalogTime";

function Nav({ history }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }
  //time config
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className={style.nav}>
      <div className={style.navGroup}>
        <Link to="/session" className={style.link}>
          SECTION HISTORY
        </Link>
      </div>

      <div className={style.timeContainer}>
        <AnalogTime time={time} />
        <DigitalTime time={time} />
      </div>

      <div className={style.navGroup}>
        <button onClick={handleLogout} className={style.logoutBtn}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
export default Nav;
