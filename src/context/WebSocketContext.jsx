// import { createContext, useContext, useEffect, useRef, useState } from "react";

// const WebSocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const socketRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);

//   const connect = () => {
//     if (socketRef.current) return;
//     socketRef.current = new WebSocket("ws://192.168.2.10:8889");

//     socketRef.current.onopen = () => {
//       setIsConnected(true);
//       console.log("WebSocket connected");
//       // Send authentication token if needed
//       // socketRef.current.send(JSON.stringify({ type: 'auth', token }));
//     };

//     socketRef.current.onclose = () => {
//       setIsConnected(false);
//       console.log("WebSocket disconnected");
//     };

//     socketRef.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };
//   };

//   const disconnect = () => {
//     if (socketRef.current) {
//       socketRef.current.close();
//       socketRef.current = null;
//       setIsConnected(false);
//     }
//   };

//   const sendMessage = (message) => {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       socketRef.current.send(JSON.stringify(message));
//     }
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup on unmount
//       if (socketRef.current) {
//         disconnect();
//       }
//     };
//   }, []);

//   return (
//     <WebSocketContext.Provider
//       value={{
//         isConnected,
//         connect,
//         disconnect,
//         sendMessage,
//         socket: socketRef.current,
//       }}
//     >
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = () => useContext(WebSocketContext);

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { WEB_SOCKET_URL } from "../api";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({
  children,
  url = WEB_SOCKET_URL,
  autoReconnect = true,
  reconnectInterval = 600000,
  enabled = true,
}) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [lastMessage, setLastMessage] = useState(null);
  const messageQueue = useRef([]);
  const reconnectAttemptRef = useRef(null);

  const connect = () => {
    if (!enabled) return;
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus("connecting");
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      setConnectionStatus("connected");
      console.log("WebSocket connected");

      // Send any queued messages
      while (messageQueue.current.length > 0) {
        const message = messageQueue.current.shift();
        sendMessage(message);
      }
    };

    socketRef.current.onclose = (event) => {
      setIsConnected(false);
      setConnectionStatus("disconnected");
      console.log("WebSocket disconnected", event.reason);

      if (autoReconnect && !event.wasClean) {
        console.log(`Attempting to reconnect in ${reconnectInterval}ms...`);
        reconnectAttemptRef.current = setTimeout(connect, reconnectInterval);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    };

    socketRef.current.onmessage = (event) => {
      try {
        // First try to parse as JSON
        const data = JSON.parse(event.data);
        setLastMessage({
          type: "json",
          data: data,
          raw: event.data,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        // If not JSON, treat as plain text
        setLastMessage({
          type: "text",
          data: event.data,
          raw: event.data,
          timestamp: new Date().toISOString(),
        });
      }
    };
  };

  const disconnect = () => {
    if (reconnectAttemptRef.current) {
      clearTimeout(reconnectAttemptRef.current);
      reconnectAttemptRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
      setConnectionStatus("disconnected");
      messageQueue.current = [];
    }
  };

  const sendMessage = (message) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not connected. Queuing message...");
      messageQueue.current.push(message);
      if (connectionStatus === "disconnected" && autoReconnect) {
        connect();
      }
      return;
    }

    try {
      socketRef.current.send(JSON.stringify(message));
    } catch (error) {
      console.error("Error sending WebSocket message:", error);
      messageQueue.current.push(message);
    }
  };

  useEffect(() => {
    if (enabled) {
      connect();
    }
    // To disconnect when disabled
    return () => {
      if (!enabled) {
        disconnect();
      }
    };
  }, [enabled]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        connect,
        disconnect,
        sendMessage,
        socket: socketRef.current,
        connectionStatus,
        lastMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
