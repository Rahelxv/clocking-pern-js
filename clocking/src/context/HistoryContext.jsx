import { createContext, useState, useEffect } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // State untuk menyimpan list stopwatch yang sedang aktif/running
  const [addstopwatch, setAddStopwatch] = useState(() => {
    const saved = localStorage.getItem("active_sessions");
    return saved ? JSON.parse(saved) : [];
  });

  // Sinkronkan ke LocalStorage setiap ada perubahan list
  useEffect(() => {
    localStorage.setItem("active_sessions", JSON.stringify(addstopwatch));
  }, [addstopwatch]);

  const addHistory = (item) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        setHistory,
        addHistory,
        addstopwatch,
        setAddStopwatch,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
