import { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  //   const [messages, setMessages] = useState([
  //     { id: 1, text: 'Hello there! 👋', sender: 'other' },
  //     { id: 2, text: "Hi! How's it going?", sender: 'me' },
  //     { id: 3, text: 'Working on a cool chat app!', sender: 'other' },
  //   ]);
  const [messages, setMessages] = useState([
    { id: 1, text: "سلام.چه کمکی از دستم برمیاد؟", sender: "other" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "me",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate reply after 1 second
    setTimeout(() => {
      if (inputValue === "خوبی؟") {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "نه",
            sender: "other",
          },
        ]);
      } else if (inputValue === "چرا؟") {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "چون دوس دارم!",
            sender: "other",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "مرسی بابت پیام",
            sender: "other",
          },
        ]);
      }
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[85vh] bg-[#1a1c3f] rounded-xl overflow-hidden">
      {/* Header */}
      <header className="bg-[#242752] p-4 text-white shadow-md">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <h1 className="text-xl font-semibold">چت</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              //   message.sender === "me" ? "justify-end" : "justify-start"
              message.sender === "me" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "me"
                  ? "bg-[#4f46e5] text-white rounded-tr-none"
                  : "bg-[#2f346b] text-white rounded-tl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="bg-[#242752] p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // placeholder="Type a message..."
            placeholder="پیام بنویسید..."
            className="flex-1 bg-[#2f346b] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
          />
          <button
            type="submit"
            className="bg-[#4f46e5] text-white rounded-xl w-12 h-12 flex items-center justify-center hover:bg-[#4338ca] transition-colors"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 rotate-270"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
