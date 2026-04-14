import { useState } from "react";
import style from "./Popup.module.css";

function Popup({ onCreate, onCancel }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={style.overlay}>
      <div className={style.popupCard}>
        <h3 className={style.title}>CREATE SESSION</h3>
        <input
          className={style.input}
          type="text"
          placeholder="What are you working on?"
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
        <div className={style.btnGroup}>
          <button className={style.cancelBtn} onClick={onCancel}>
            CANCEL
          </button>
          <button
            className={style.createBtn}
            onClick={() => onCreate(inputValue)}
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}
export default Popup;
