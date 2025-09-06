import { useEffect, useState } from "react";
import { getActionAx } from "../../api";
import useErrorHandler from "../../hooks/useErrorHandler";

const ChatSidebar = (props) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState();
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

  return (
    <>
      <aside
        className={`w-[250px] bg-white border-l border-gray-200 p-4 overflow-y-auto  h-full`}
      >
        <nav>
          <ul>

            {chats.map((item, index) => (
              <li
                key={item.id}
                onClick={()=>setActiveChat(item.id)}
                className={`p-2 cursor-pointer rounded-md mb-2 
                ${
                  activeChat === item.id
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default ChatSidebar;
