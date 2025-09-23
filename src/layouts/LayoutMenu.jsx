import { useTranslation } from "react-i18next";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { Bounce, ToastContainer } from "react-toastify";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SidebarLinks from "./SidebarLinks";
import { useWebSocket } from "../context/WebSocketContext";
import { WEB_SOCKET_URL } from "../api";
import { useDispatch } from "react-redux";
import { chatActions } from "../shop/chatSlice";
import { toast } from "react-toastify";
import { contradictionActions } from "../shop/contradictionSlice";

const LayoutMenu = (props) => {
  const windowWidth = useWindowDimensions().width;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   const token = localStorage.getItem("token");

  //   if (!isLoggedIn || !token) {
  //     // If not logged in or no token, redirect to '/'
  //     navigate("/");
  //   }
  // }, [navigate]);

  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000; // 3 seconds
  const wsRef = useRef(null);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEW WS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const connectWebSocket = () => {
    try {
      // let socketObj = null;
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, skipping WebSocket connection");
        return;
      }

      // if (WEB_SOCKET_URL) {
      //   socketObj = new WebSocket(WEB_SOCKET_URL + "?token=" + token);
      // } else {
      //   const originalURL = "ws" + window.location.origin.substring(4);
      //   socketObj = new WebSocket(originalURL + "?token=" + token);
      // }

// new for firefox
let socketUrl;
    if (WEB_SOCKET_URL) {
      socketUrl = new URL(WEB_SOCKET_URL);
      socketUrl.searchParams.append('token', token);
    } else {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      socketUrl = new URL(`${protocol}//${host}/ws`);
      socketUrl.searchParams.append('token', token);
    }

    const socketObj = new WebSocket(socketUrl.toString());
// new for firefox



      socketObj.addEventListener("open", () => {
        console.log("WebSocket connection established");
        reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
        toast.success("Connected to server");
      });

      socketObj.addEventListener("close", (event) => {
        console.log("WebSocket connection closed", event.code, event.reason);

        // Clean up current connection
        if (wsRef.current) {
          wsRef.current.removeEventListener("message", handleMessage);
          wsRef.current = null;
        }

        // Attempt reconnect if not a normal closure
        if (event.code !== 1000) {
          attemptReconnect();
        }
      });

      socketObj.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        toast.error("Connection error");
      });

      const handleMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("wsData", data);

          if (data?.type === "ping") {
            console.log("Ping received");
            // Optionally send pong response
            if (socketObj.readyState === WebSocket.OPEN) {
              socketObj.send(JSON.stringify({ type: "pong" }));
            }
          } else if (data?.type === "chatlog") {
            // chat ws:
            if (data.state === "notif") {
              toast.info(data.message);
            } else if (data.state === "warnning") {
              toast.warning(data.message);
            } else if (data.state === "error") {
              toast.error(data.message);
            } else if (data.state === "Success") {
              console.log("chat SuccessSuccessSuccessSuccessSuccessSuccessSuccessSuccessSuccess")
              toast.success(data.message);
              dispatch(chatActions.addMessage(data.data) )
            }
          }else if(data?.type === "log"){
            // contradiction ws:
            if (data.state === "notif") {
              toast.info(data.message);
            } else if (data.state === "warnning") {
              toast.warning(data.message);
            } else if (data.state === "error") {
              toast.error(data.message);
            } else if (data.state === "Success") {
              console.log("contradiction SuccessSuccessSuccessSuccessSuccessSuccessSuccessSuccessSuccess")
              toast.success(data.message);
              dispatch(contradictionActions.addMessage(data.data) )
            }

          }

        } catch (error) {
          console.error("Error parsing WebSocket message:", error, event.data);
        }
      };

      socketObj.addEventListener("message", handleMessage);
      wsRef.current = socketObj;
    } catch (error) {
      console.error("WebSocket connection failed:", error);
      attemptReconnect();
    }
  };

  // Reconnect function with exponential backoff
  const attemptReconnect = () => {
    // if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
    //   console.warn("Max reconnection attempts reached");
    //   toast.error("Failed to connect to server");
    //   return;
    // }

    const delay =
      RECONNECT_INTERVAL * Math.pow(2, reconnectAttemptsRef.current);
    reconnectAttemptsRef.current++;

    console.log(
      `Attempting reconnect in ${delay}ms (attempt ${reconnectAttemptsRef.current})`
    );

    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, delay);
  };

  // Cleanup function
  const cleanupWebSocket = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      try {
        wsRef.current.close(1000, "Component unmounting");
      } catch (error) {
        console.error("Error closing WebSocket:", error);
      }
      wsRef.current = null;
    }
  };

  // WebSocket effect
  useEffect(() => {
    connectWebSocket();

    return () => {
      cleanupWebSocket();
    };
  }, []);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NEW WS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // WebSocket:
  // const wsRef = useRef(null);
  // useEffect(() => {
  //   let socketObj = null;
  //   if (WEB_SOCKET_URL) {
  //     socketObj = new WebSocket(
  //       WEB_SOCKET_URL + "?token=" + localStorage.getItem("token")
  //     );
  //     wsRef.current = socketObj;
  //   } else {
  //     let orginalURL = "ws" + window.location.origin.substring(4);
  //     socketObj = new WebSocket(
  //       orginalURL + "?token=" + localStorage.getItem("token")
  //     );
  //     wsRef.current = socketObj;
  //   }
  //   socketObj.addEventListener("open", () => {
  //     console.log("WebSocket connection established");
  //   });
  //   socketObj.addEventListener("close", (event) => {
  //     console.log("WebSocket connection closed");
  //   });
  //   socketObj.addEventListener("message", (event) => {

  //     toast.error('asasa');
  //     const data = JSON.parse(event.data);
  //     console.log('wsData',data);
  //      if(data?.type && data?.type === 'ping'){
  //       console.log('LOG','chatlog')
  //     }
  //     if(data?.type && data?.type === 'chatlog'){
  //       console.log('chatlog جواب')
  //     }
  //     console.log("EVENT Socket", event);
  //     dispatch(webSocketActions.addMessage(data));
  //   });

  //   return () => {
  //     console.log("Closing WebSocket connection");
  //     wsRef.current.close();
  //     socketObj.close();
  //   };
  // }, []);

  const sidebarLinks = [
    {
      path: "/chat",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          />
        </svg>
      ),
      label: "چت", // You can use t("Chat") if you want to translate it
    },
    {
      path: "/discovering-contradiction",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            x1="21"
            y1="21"
            x2="16.65"
            y2="16.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      label: t("Discovering a contradiction"),
    },
    {
      path: "/functions-history",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: "تاریخچه کارکردها",
    },
    {
      path: "/resolutions-list",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
          />
        </svg>
      ),
      label: t("List of resolutions"),
    },
    {
      path: "/graph-chat",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Y-axis */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 20V4" // Draws Y-axis from (3, 20) to (3, 4)
          />
          {/* X-axis */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 20h18" // Draws X-axis from (3, 20) to (21, 20)
          />
          {/* Descending Line Graph */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 17l4-4 3 3 4-4 5-5" // Descending line graph
          />
        </svg>
      ),
      label: "گراف چت", // You can use t("Chat") if you want to translate it
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className=" p-2 bg-[#242752]/75 text-white fixed top-0 right-4  w-full h-full z-[6000]"></div>
      )}
      {/* mobile sidebar */}
      <aside
        className={`w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto fixed right-0 top-0 h-full transition-transform duration-300 ease-in-out transform z-[7000] ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav>
          <ul className="space-y-2">
            <li className="flex flex-row-reverse">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center p-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
            <SidebarLinks
              links={sidebarLinks}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </ul>
        </nav>
      </aside>
      <div className={`flex flex-col h-[100vh] bg-gray-100 `}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* Header (Full width) */}
        <Header
          sidebarButtonClick={() => setSidebarOpen((prevState) => !prevState)}
        />
        {/* Main Content Area with Sidebar */}
        <div
          className={`flex flex-1 overflow-hidden ${
            i18n.language === "fa" ? "rtl" : "ltr"
          }`}
        >
          {/* Sidebar (Right) */}
          {/* desktop sidebar */}
          {windowWidth > 1024 && (
            <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
              <SidebarLinks links={sidebarLinks} />
            </aside>
          )}
          {/* Main Content (Left) */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutMenu;
