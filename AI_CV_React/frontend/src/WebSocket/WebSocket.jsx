import { Client } from "@stomp/stompjs";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const SOCKET_URL = "ws://localhost:8080/ws-message";

function WebSocket({ messages, setMessages }) {
  const [message, setMessage] = useState(null);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    const onConnected = () => {
      console.log("Connected!!");
      client.subscribe("/topic/message", function (msg) {
        if (msg.body) {
          var jsonBody = JSON.parse(msg.body);
          // console.log(jsonBody);
          setMessages((prevMessages) => [...prevMessages, jsonBody]);
          setMessage(jsonBody.message);
          // console.log(messages.length);
        }
      });
    };

    const onDisconnected = () => {
      console.log("Disconnected!!");
    };

    client.onConnect = onConnected;
    client.onDisconnect = onDisconnected;

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return <></>;
}

export default WebSocket;
