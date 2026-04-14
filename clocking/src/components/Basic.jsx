import { useState, useContext } from "react";
import Stopwatch from "./Stopwatch";
import Add from "./Add";
import style from "./Basic.module.css";
import Popup from "./Popup";
import { HistoryContext } from "../context/HistoryContext";

function Basic() {
  const { addHistory, addstopwatch, setAddStopwatch } =
    useContext(HistoryContext);
  const [popup, setPopup] = useState(false);

  function addstp(nama) {
    const newStopwatch = {
      id: Date.now(),
      name: nama || "non-session-tag",
      // KUNCI: Simpan waktu mulai saat ini
      startTime: Date.now(),
      initialTime: 0,
    };
    setAddStopwatch([...addstopwatch, newStopwatch]);
    setPopup(false);
  }

  async function deleted(id, time) {
    const item = addstopwatch.find((i) => i.id === id);
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
        setAddStopwatch(addstopwatch.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error("Error saving session:", error);
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
          // Kirim startTime agar stopwatch tahu harus mulai dari detik ke berapa
          startTime={item.startTime}
          fDeleted={(time) => deleted(item.id, time)}
        />
      ))}

      {addstopwatch.length > 0 && <Add addSession={() => setPopup(true)} />}
    </div>
  );
}

export default Basic;
