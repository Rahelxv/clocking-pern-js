import { Link } from "react-router-dom";
import style from "./NotFound.module.css";
function Notfound() {
  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <h1 className={style.code}>404</h1>
        <p className={style.text}>Page is not found</p>
        <Link to="/" className={style.link}>
          Go to HomePage
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
