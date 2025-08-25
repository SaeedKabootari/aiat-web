import { useState, useRef, useEffect } from "react";
import { postActionAx, postActionSignalAx } from "../api"; // Assuming this supports abort signals
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useErrorHandler from "../hooks/useErrorHandler";

const ChatPage = () => {
  const errorHandler = useErrorHandler();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null); // Ref to store AbortController

  const resetChatHandler = async () => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // This cancels the fetch
      abortControllerRef.current = null; // Reset the ref
    }
    setInputValue("");
    setMessages([]); // Clear messages immediately
    try {
      await postActionAx(`/api/chat_reset`, {});
    } catch (err) {
      errorHandler(err);
    }
  };

  const newChatHandler = () => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // This cancels the fetch
      abortControllerRef.current = null; // Reset the ref
    }
    setInputValue("");
    setMessages([]); // Clear messages immediately
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setLoading(true);

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "me",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    const abortController = new AbortController(); // Create AbortController
    abortControllerRef.current = abortController; // Store it in ref

    try {
      const res = await postActionSignalAx(
        `/api/chat`,
        { msg: inputValue },
        { signal: abortController.signal }
      ); // Corrected call
      // Only add the message if the request wasn't aborted
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: res.data.message,
          sender: "other",
        },
      ]);
    } catch (err) {
      if (err.name !== "AbortError") {
        // Only log if it's not an abort
        errorHandler(err);
      }
      // If aborted, do nothing – the message won't be added
    }

    setLoading(false);
    abortControllerRef.current = null; // Clean up after the request
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[85vh] bg-[#1a1c3f] rounded-xl overflow-hidden">
      {/* Header */}
      <header className="bg-[#242752] p-4 text-white shadow-md flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <h1 className="text-xl font-semibold">چت</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={newChatHandler}
            className="px-4 py-1 text-sm font-medium rounded-md focus:outline-none cursor-pointer text-white bg-[#2b20ff]"
          >
            گفتگو جدید{" "}
          </button>
          <button
            onClick={resetChatHandler}
            className="px-4 py-1 text-sm font-medium rounded-md focus:outline-none cursor-pointer text-white bg-[#4f46e5]"
          >
            پاک کردن گفتگو
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "other" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl ${
                message.sender === "other"
                  ? "bg-[#2f346b] text-white rounded-tl-none w-full"
                  : "bg-[#4f46e5] text-white rounded-tr-none max-w-[90%]"
              }`}
              dir="auto"
            >
              {message.sender === "me" ? (
                <div dir="rtl" className="whitespace-pre-wrap break-words">
                  {message.text}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          dir="rtl"
                          className="my-4 text-justify leading-relaxed"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          dir="rtl"
                          className="text-right my-2 mr-6 leading-relaxed"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          dir="rtl"
                          className="list-disc pr-6 space-y-2"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          dir="rtl"
                          className="list-decimal pr-6 space-y-2"
                          {...props}
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1
                          dir="rtl"
                          className="text-2xl font-bold my-4 text-right"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          dir="rtl"
                          className="text-xl font-bold my-3 text-right"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          dir="rtl"
                          className="text-lg font-bold my-2 text-right"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          dir="rtl"
                          className="border-r-4 border-gray-400 pr-4 my-4 text-gray-300"
                          {...props}
                        />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr className="my-6 border-gray-600" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto">
                          <table
                            dir="rtl"
                            className="w-full my-4 border-collapse border border-gray-600"
                            {...props}
                          />
                        </div>
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="px-4 py-2 border border-gray-600 bg-gray-700 text-right"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="px-4 py-2 border border-gray-600 text-right"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold" {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic" {...props} />
                      ),
                      br: ({ node, ...props }) => (
                        <br className="my-2" {...props} />
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-[#2f346b] text-white rounded-2xl rounded-tl-none px-4 py-2">
              <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <div className="flex space-x-1 py-2">
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="bg-[#242752] p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="پیام بنویسید..."
            className="flex-1 bg-[#2f346b] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-[#4f46e5] text-white rounded-xl w-12 h-12 flex items-center justify-center hover:bg-[#4338ca] transition-colors"
          >
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
