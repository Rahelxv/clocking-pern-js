import { useState, useContext } from "react";
import Stopwatch from "./Stopwatch";
import Add from "./Add";
import style from "./Basic.module.css";
import Popup from "./Popup";
import { HistoryContext } from "../context/HistoryContext";

function Basic() {
  const { addHistory, addstopwatch, setAddStopwatch, updateStopwatchTime } =
    useContext(HistoryContext);
  const [popup, setPopup] = useState(false);

  function addstp(nama) {
    setAddStopwatch([
      ...addstopwatch,
      { id: Date.now(), name: nama || "non-session-tag", time: 0 },
    ]);
    setPopup(false);
  }

  async function deleted(id, time) {
    const item = addstopwatch.find((item) => item.id === id);
    const endTime = Date.now();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: item.name,
            duration: time,
            endTime: endTime,
          }),
        },
      );

      if (response.ok) {
        addHistory({ ...item, duration: time, endTime: endTime });
        setAddStopwatch(addstopwatch.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.container}>
      {popup && <Popup onCreate={addstp} onCancel={() => setPopup(false)} />}
      {addstopwatch.length === 0 && <Add addSession={() => setPopup(true)} />}
      {addstopwatch.map((item) => (
        <Stopwatch
          key={item.id}
          name={item.name}
          initialTime={item.time || 0} // Ambil waktu terakhir dari context
          onTimeUpdate={(currentTime) =>
            updateStopwatchTime(item.id, currentTime)
          } // Lapor ke context
          fDeleted={(time) => deleted(item.id, time)}
        />
      ))}
      {addstopwatch.length > 0 && <Add addSession={() => setPopup(true)} />}
    </div>
  );
}
export default Basic;
