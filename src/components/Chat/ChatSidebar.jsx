import { useEffect, useState } from "react";
import { getActionAx } from "../../api";
import useErrorHandler from "../../hooks/useErrorHandler";

const ChatSidebar = (props) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState();
  const [hoveredChatId, setHoveredChatId] = useState(null);
  const [clickedModify,setClickedModify]= useState(null)
  const errorHandler = useErrorHandler();

  const getChats = async () => {
    let getUrl = "/api/chat/sessions";
    await getActionAx(getUrl)
      .then((res) => {
        setChats([...res.data.sessions]);
        console.log("Chats===>", res);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };
  useEffect(() => {
    getChats();
  }, []);

  const chatItemClickHandler = async (item) => {
    console.log("zzzzzzzzzz", item);
    setActiveChat(item.id);
    props.setSessionId(item.id);
    let getUrl = `/api/chat/sessions/${item.id}`;
    console.log(getUrl);

    getActionAx(getUrl)
      .then((res) => {
        console.log("chat detail", res.data.messages);
        props.setMessages(res.data.messages);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <>
      <aside
        onScroll={() => setClickedModify(null)}
        className={`w-[250px] bg-white border-l border-gray-200 p-4 overflow-y-auto  h-full`}
      >
        <nav>
          <ul>
            {chats.map((item, index) => (
              <li
                key={item.id}
                onClick={() => chatItemClickHandler(item)}
                onMouseEnter={() => setHoveredChatId(item.id)}
                onMouseLeave={() => setHoveredChatId(null)}
                className={`p-2 cursor-pointer rounded-md mb-2 
                ${
                  activeChat === item.id
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                } flex justify-between relative`}
              >
                <span className="line-clamp-1">{item.title}</span>
                {hoveredChatId === item.id && (
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      setClickedModify(item)
                      console.log(item.id)
                    }}
                    className="cursor-pointer"
                  >
                    ...
                  </button>
                )}
                {clickedModify?.id === item.id && (
                  <div className="absolute w-[132px]  left-0 bg-white border border-gray-200  rounded-lg shadow-lg p-2 z-50 font-normal">
                    <ul>
                      <li>
                        <div>
                          <button className="w-full flex gap-2 items-center hover:bg-gray-300 rounded-md px-2 py-1">
                            
                            <svg
                              className="w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            <span className="text-right text-sm">تغییر نام</span>
                          </button>

                          <button className="w-full flex gap-2 items-center hover:bg-gray-300 rounded-md px-2 py-1">
                           
                            <svg
                              className="w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                             <span className="text-right text-sm">حذف</span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default ChatSidebar;
