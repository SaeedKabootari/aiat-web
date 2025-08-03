import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import SendResolution from "../components/SendResolution";
import SearchResolution from "../components/SearchResolution";
import { postActionAxToken } from "../api";

const DiscoveringContradiction = (props) => {
  // WebSocket:
  const {
    isConnected,
    connectionStatus,
    lastMessage,
    sendMessage,
    connect,
    disconnect,
  } = useWebSocket();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const [discoveringObj, setDiscoveringObj] = useState({
    law_id: null,
    section_no: null,
    check_law_id: null,
  });
  const [compareWithAll, setCompareWithAll] = useState(false);
  const [newRule, setnNewRule] = useState(true);
  const [newRuleValue, setnNewRuleValue] = useState(null);

  useEffect(() => {
    console.log("discoveringObj", discoveringObj);
  }, [discoveringObj]);

  useEffect(() => {
    console.log("newRule", newRule);
    console.log("compareWithAll", compareWithAll);
  }, [newRule, compareWithAll]);

  const discoveringContradictionHandler = async () => {
    if (!newRule && !compareWithAll) {
      await postActionAxToken(
        `/api/analyze_rules`,
        localStorage.getItem("token"),
        discoveringObj
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!newRule && compareWithAll) {
      await postActionAxToken(
        `/api/analyze_rules`,
        localStorage.getItem("token"),
        { ...discoveringObj, check_law_id: "*" }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newRule && !compareWithAll) {
      await postActionAxToken(`/api/analyze`, localStorage.getItem("token"), {
        prompt: newRuleValue,
        check_law_id: discoveringObj.check_law_id,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newRule && compareWithAll) {
      await postActionAxToken(`/api/analyze`, localStorage.getItem("token"), {
        prompt: newRuleValue,
        check_law_id: "*",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //WebSocket:
  // Handle incoming messages
  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [
        ...prev,
        {
          ...lastMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [lastMessage]);

  // Ensure connection when component mounts
  useEffect(() => {
    connect();
    return () => {
      // Optional: disconnect when component unmounts
      // disconnect();
    };
  }, [connect]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage({
        type: "user_message",
        content: inputMessage,
        timestamp: new Date().toISOString(),
      });
      setInputMessage("");
    }
  };

  return (
    <>
      {/* row 1 */}
      <div className="grid grid-cols-12 gap-2">
        {/* Right box */}
        <div className="col-span-6">
          <div className="flex p-1 bg-gray-200 rounded-full mb-5">
            <button
              className={`px-4 py-1 text-sm font-medium rounded-full focus:outline-none ${
                newRule === true
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setnNewRule(true)}
            >
              نوشتن مصوبه جدید
            </button>
            <button
              className={`px-4 py-1 text-sm font-medium rounded-full focus:outline-none ${
                newRule === false
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setnNewRule(false)}
            >
              انتخاب مصوبه قدیمی
            </button>
          </div>

          {!newRule ? (
            <SearchResolution setDiscoveringObj={setDiscoveringObj} />
          ) : (
            <div>
              <h1 className="text-[#242752] font-bold text-xl mb-3">
                مصوبه جدید را بنویسید:
              </h1>
              <div className="mt-2 p-3">
                <textarea
                  // ref={newResolutionRef}
                  onChange={(event) => setnNewRuleValue(event.target.value)}
                  className="w-full h-40 resize-none p-2 bg-white border-[1px] border-black"
                />
              </div>
            </div>
          )}
        </div>
        {/* Left box */}
        <div className="col-span-6">
          <div className="flex p-1 bg-gray-200 rounded-full mb-5">
            <button
              className={`px-4 py-1 text-sm font-medium rounded-full focus:outline-none ${
                compareWithAll === false
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setCompareWithAll(false)}
            >
              کشف تناقض با یک قانون
            </button>
            <button
              className={`px-4 py-1 text-sm font-medium rounded-full focus:outline-none ${
                compareWithAll === true
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setCompareWithAll(true)}
            >
              کشف تناقض با همه
            </button>
            
          </div>

          {!compareWithAll && (
            <SendResolution setDiscoveringObj={setDiscoveringObj} />
          )}
        </div>
      </div>
      {/* row 2 */}
      <div className="flex justify-end">
        <button
          onClick={discoveringContradictionHandler}
          className=" bg-[#242752] text-white font-semibold py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300"
        >
          کشف تناقض
        </button>
      </div>
      {/* Web Socket */}
      {/* Message Display Area */}
      {/* <div className="mt-4 p-4 bg-white rounded-lg shadow-md h-64 overflow-y-auto">
        <h3 className="font-bold mb-2">WebSocket Messages:</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages received yet</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <span className="text-xs text-gray-500">[{msg.timestamp}]</span>
                <pre className="mt-1">{JSON.stringify(msg, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {/* Message Input */}
      {/* <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Send
        </button>
      </div> */}
    </>
  );
};

export default DiscoveringContradiction;
