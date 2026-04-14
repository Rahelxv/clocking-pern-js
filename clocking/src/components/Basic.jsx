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
    };
    setAddStopwatch([...addstopwatch, newStopwatch]);
    setPopup(false);
  }

  function addpopup() {
    setPopup(true);
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
        // Hapus dari list aktif (otomatis update localStorage lewat Context)
        setAddStopwatch(addstopwatch.filter((item) => item.id !== id));
        console.log("Session saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save session:", error);
      alert("Failed to save to server.");
    }
  }

  return (
    <div className={style.container}>
      {popup && <Popup onCreate={addstp} onCancel={() => setPopup(false)} />}

      {/* Tampilkan tombol Add di awal jika kosong */}
      {addstopwatch.length === 0 && <Add addSession={addpopup} />}

      {addstopwatch.map((item) => (
        <Stopwatch
          key={item.id}
          name={item.name}
          fDeleted={(time) => deleted(item.id, time)}
        />
      ))}

      {/* Tampilkan tombol Add di akhir jika ada list */}
      {addstopwatch.length > 0 && <Add addSession={addpopup} />}
    </div>
  );
}

export default Basic;
