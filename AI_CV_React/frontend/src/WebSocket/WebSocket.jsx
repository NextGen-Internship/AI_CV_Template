import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  const WS_URL = "ws://backend_java:8080/ws";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      });
    }
  }, [readyState]);

  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`);
  }, [lastJsonMessage]);
};

export default WebSocket;
