import React, { useEffect, useState } from "react";

function App() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if ("WebSocket" in window) {
      const ws = new WebSocket(
        "wss://ah-premier-staging.herokuapp.com/api/notifications/new_article_notification/"
      );

      ws.onopen = function() {
        // Web Socket is connected, send data using send()
      };

      ws.onmessage = evt => {
        const received_msg = JSON.parse(evt.data);
        setNotifications([...notifications, received_msg]);
      };
    } else {
      // The browser doesn't support WebSocket
      alert("WebSocket NOT supported by your Browser!");
    }
  });
  return (
    <div>
      <h1>Hi there, see the notifications on new articles</h1>
      {notifications.map((notification, i) => (
        <li key={i}>{notification.message}</li>
      ))}
    </div>
  );
}

export default App;
