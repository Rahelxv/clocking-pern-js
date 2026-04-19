import { createContext, useState, useEffect } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [addstopwatch, setAddStopwatch] = useState(() => {
    const saved = localStorage.getItem("active_sessions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("active_sessions", JSON.stringify(addstopwatch));
  }, [addstopwatch]);

  const updateStopwatchTime = (id, currentTime) => {
    setAddStopwatch((prev) =>
      prev.map((s) => (s.id === id ? { ...s, time: currentTime } : s))
    );
  };

  const addHistory = (item) => {
    setHistory((prev) => [item, ...prev]);
  };

  const clearActiveSessions = () => {
    setAddStopwatch([]);
    localStorage.removeItem("active_sessions");
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistory,
        addstopwatch,
        setAddStopwatch,
        updateStopwatchTime,
        clearActiveSessions, 
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
