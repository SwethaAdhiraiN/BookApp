import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

// PUBLIC_INTERFACE
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  function notify(message, severity = "info") {
    setNotifications(n => [...n, { message, severity, id: Date.now() }]);
  }
  function clear(id) {
    setNotifications(n => n.filter(notif => notif.id !== id));
  }
  return (
    <NotificationContext.Provider value={{ notifications, notify, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}
