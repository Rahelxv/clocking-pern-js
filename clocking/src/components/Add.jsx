import style from "./Add.module.css";

function Add({ addSession }) {
  return (
    <button className={style.btn} onClick={addSession}>
      <div className={style.plusIcon}></div>
      <span className={style.label}>NEW SESSION</span>
    </button>
  );
}

export default Add;
