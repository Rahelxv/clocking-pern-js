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

  if (time < 1000) {
    setAddStopwatch((prev) => prev.filter((i) => i.id !== id));
    return;
  }

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
      }
    );

    if (response.ok) {
      addHistory({ ...item, duration: time, endTime: endTime });
      setAddStopwatch((prev) => prev.filter((i) => i.id !== id));
    } else if (response.status === 401 || response.status === 403) {
      alert("Sesi login berakhir. Silakan login ulang untuk menyimpan log.");
    } else {
      const errData = await response.json();
      alert(`Gagal menyimpan: ${errData.error || "Server error"}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Koneksi terputus. Data tidak bisa disimpan ke server.");
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
