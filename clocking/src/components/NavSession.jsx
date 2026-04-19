import { useState, useEffect, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { HistoryContext } from "../context/HistoryContext"; 
import DigitalTime from "./DigitalTime";
import AnalogTime from "./AnalogTime";
import style from "./NavSession.module.css";

function NavSession() {
  const navigate = useNavigate();
  const { clearActiveSessions } = useContext(HistoryContext); 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    clearActiveSessions(); 
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <nav className={style.nav}>
      <div className={style.navGroup}>
        <button onClick={handleBack} className={style.backBtn}>BACK</button>
      </div>
      <div className={style.timeContainer}>
        <AnalogTime time={time} />
        <DigitalTime time={time} />
      </div>
      <div className={style.navGroup}>
        <button onClick={handleLogout} className={style.logoutBtn}>LOGOUT</button>
      </div>
    </nav>
  );
}

export default NavSession;
