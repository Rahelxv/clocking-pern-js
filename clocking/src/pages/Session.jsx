import { useState, useEffect } from "react";
import style from "./Session.module.css";
import NavSession from "../components/NavSession";

function Session() {
  const [history, setHistory] = useState([]);
  const [pesan, setPesan] = useState("LOADING DATA...");
  const [activeCategory, setActiveCategory] = useState(null);

  // Helper untuk format waktu durasi (Jam:Menit:Detik)
  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // FORMAT BARU: Tanggal + Jam (6:00 PM)
  const formatBoxDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp));

    // Menggunakan toLocaleString untuk mendapatkan format "14/4/2026, 6:00 PM"
    return date
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true, // Mengaktifkan format AM/PM
      })
      .toUpperCase();
  };

  useEffect(() => {
    async function fetchHistory() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sessions`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setHistory(data);
          if (data.length === 0) setPesan("NO SESSION HISTORY YET.");
        } else {
          setPesan("FAILED TO LOAD DATA.");
        }
      } catch (error) {
        setPesan("SERVER CONNECTION ERROR.");
      }
    }
    fetchHistory();
  }, []);

  const groupedData = history.reduce((acc, item) => {
    const key = item.name || "UNNAMED_TASK";
    if (!acc[key]) {
      acc[key] = { items: [], total: 0 };
    }
    acc[key].items.push(item);
    acc[key].total += parseInt(item.duration || 0);
    return acc;
  }, {});

  const toggleCategory = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  return (
    <div className={style.container}>
      <NavSession />

      <div style={{ marginTop: "20px" }}>
        {history.length === 0 ? (
          <p className={style.message}>{pesan}</p>
        ) : (
          Object.entries(groupedData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([nama, data]) => (
              <div key={nama} style={{ marginBottom: "15px" }}>
                <div
                  className={style.categoryLabel}
                  onClick={() => toggleCategory(nama)}
                >
                  <span className={style.nameText}>{nama.toUpperCase()}</span>
                  <span className={style.totalDuration}>
                    TOTAL: {formatTime(data.total)}
                  </span>
                </div>

                {activeCategory === nama && (
                  <div className={style.sessionGrid}>
                    {data.items
                      .sort(
                        (a, b) =>
                          (b.endTime || b.end_time) - (a.endTime || a.end_time),
                      )
                      .map((item, index) => (
                        <div key={index} className={style.stopwatchBox}>
                          <h1 className={style.timeDisplay}>
                            {formatTime(item.duration)}
                          </h1>
                          <p className={style.dateDisplay}>
                            {formatBoxDate(item.endTime || item.end_time)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Session;
