import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import SendResolution from "../components/SendResolution";
import SearchResolution from "../components/SearchResolution";
import { getActionAx, postActionAx } from "../api";

const DiscoveringContradiction = (props) => {
  // WebSocket:
  // const {
  //   isConnected,
  //   connectionStatus,
  //   lastMessage,
  //   sendMessage,
  //   connect,
  //   disconnect,
  // } = useWebSocket();
  // const [messages, setMessages] = useState([]);
  // const [inputMessage, setInputMessage] = useState("");

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

  const [taskId, setTaskId] = useState(null);
  const [messages, setMessages] = useState([]);

  const [selectedContradiction, setSelectedContradiction] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(true);
  const intervalRef = useRef(null);

  const systemPromptRef = useRef(null);
  const titlePromptRef = useRef(null);

  useEffect(() => {
    console.log("MESSAGES ==========>>>>>>>>>>>>>>>", messages);
  }, [messages]);

  // const [since, setSince] = useState(null);
  const sinceRef = useRef(null); // Add this ref

  useEffect(() => {
    const getMessages = async () => {
      let getUrl;
      if (sinceRef.current === null) {
        getUrl = `/api/task/${taskId}`;
      } else {
        getUrl = `/api/task/${taskId}?since=${sinceRef.current}`;
      }

      await getActionAx(getUrl)
        .then((res) => {
          console.log(res);
          console.log(res.data.results);
          setMessages((prevMessages) => [...prevMessages, ...res.data.results]);
          console.log(res.data.latest_timestamp);
          // setSince(res.data.latest_timestamp);
          if (sinceRef.current === null) {
            sinceRef.current = res.data.latest_timestamp;
          } else if (sinceRef.current !== null) {
            if (+sinceRef.current < +res.data.latest_timestamp) {
              sinceRef.current = res.data.latest_timestamp;
            }
          }
          // sinceRef.current = res.data.latest_timestamp;
          if (
            res.data.status === "pending" ||
            res.data.status === "processing"
          ) {
            setFetchAgain((prevState) => !prevState);
          } else if (res.data.status === "completed" || res.data.status === "failed") {
            console.log("finish");
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        })
        .catch((err) => {});
    };

    console.log("++++");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (taskId) {
      intervalRef.current = setInterval(() => {
        getMessages();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [taskId, fetchAgain]);

  const discoveringContradictionHandler = async () => {
    if (!newRule && !compareWithAll) {
      await postActionAx(`/api/analyze_rules`, discoveringObj)
        .then((res) => {
          setTaskId(res.data.task_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!newRule && compareWithAll) {
      await postActionAx(`/api/analyze_rules`, {
        ...discoveringObj,
        check_law_id: "*",
      })
        .then((res) => {
          setTaskId(res.data.task_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newRule && !compareWithAll) {
      await postActionAx(`/api/analyze`, {
        prompt: newRuleValue,
        system_prompt: systemPromptRef.current.value,
        prompt_title: titlePromptRef.current.value,
        check_law_id: discoveringObj.check_law_id,
      })
        .then((res) => {
          setTaskId(res.data.task_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newRule && compareWithAll) {
      await postActionAx(`/api/analyze`, {
        prompt: newRuleValue,
        system_prompt: systemPromptRef.current.value,
        prompt_title: titlePromptRef.current.value,
        check_law_id: "*",
      })
        .then((res) => {
          setTaskId(res.data.task_id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function toPersianTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("fa-IR");
  }

  const selectContradictionHandler = async (item) => {
    console.log(item);

    let showObj = {
      first_law_caption: item.first_law_caption,
      first_section_caption: item.first_section_caption,
      second_law_caption: item.second_law_caption,
      second_section_caption: item.second_section_caption,
      response: item.response,
    };

    // this line for test:
    if (item.first_section_id !== null) {
      // await getActionAx(`/api/sections/${2446350}`)
      await getActionAx(`/api/sections/${item.first_section_id}`)
        .then((res) => {
          console.log("first_______________________", res);
          console.log(res.data);
          showObj.first_section_full_path = res.data.full_path;
          showObj.first_section_text = res.data.text;
          showObj.first_section_status_caption = res.data.status_caption;
          showObj.first_section_topics = res.data.topics;
        })
        .catch((err) => {
          console.log("ZZZZZZZZZZZZZZZZZZZZ", err);
          console.log(err);
        });
    }
    if (item.second_section_id !== null) {
      // await getActionAx(`/api/sections/${2446350}`)
      await getActionAx(`/api/sections/${item.second_section_id}`)
        .then((res) => {
          console.log("second_______________________", res);
          console.log(res.data);
          showObj.second_section_full_path = res.data.full_path;
          showObj.second_section_text = res.data.text;
          showObj.second_section_status_caption = res.data.status_caption;
          showObj.second_section_topics = res.data.topics;
        })
        .catch((err) => {
          console.log("ZZZZZZZZZZZZZZZZZZZZ", err);
          console.log(err);
        });
    }
    console.log(showObj);

    setSelectedContradiction(showObj);
  };

  // //WebSocket:
  // // Handle incoming messages
  // useEffect(() => {
  //   if (lastMessage) {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         ...lastMessage,
  //         timestamp: new Date().toLocaleTimeString(),
  //       },
  //     ]);
  //   }
  // }, [lastMessage]);

  // // Ensure connection when component mounts
  // useEffect(() => {
  //   connect();
  //   return () => {
  //     // Optional: disconnect when component unmounts
  //     // disconnect();
  //   };
  // }, [connect]);

  // const handleSendMessage = () => {
  //   if (inputMessage.trim()) {
  //     sendMessage({
  //       type: "user_message",
  //       content: inputMessage,
  //       timestamp: new Date().toISOString(),
  //     });
  //     setInputMessage("");
  //   }
  // };

  return (
    <>
      {/* row 1 */}
      <div className="grid grid-cols-12 gap-2 h-[53%]">
        {/* Right box */}
        <div className="col-span-6">
          <div className="flex p-1 bg-gray-200 rounded-md mb-5">
            <button
              className={` px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
                newRule === true
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setnNewRule(true)}
            >
              نوشتن مصوبه جدید
            </button>
            <button
              className={`px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
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
              <h1 className="text-[#242752]">عنوان:</h1>
              <div className="mt-1 p-3">
                <textarea
                  ref={titlePromptRef}
                  className="w-full h-10 resize-none p-2 bg-white border-[1px] border-black"
                />
              </div>

              <h1 className="text-[#242752]">مصوبه جدید را بنویسید:</h1>
              <div className="mt-1 p-3">
                <textarea
                  onChange={(event) => setnNewRuleValue(event.target.value)}
                  className="w-full h-20 resize-none p-2 bg-white border-[1px] border-black"
                />
              </div>

              <h1 className="text-[#242752]">پرامپت سیستم:</h1>
              <div className="mt-1 p-3">
                <textarea
                  ref={systemPromptRef}
                  className="w-full h-10 resize-none p-2 bg-white border-[1px] border-black"
                />
              </div>
            </div>
          )}
        </div>
        {/* Left box */}
        <div className="col-span-6">
          <div className="flex p-1 bg-gray-200 rounded-md mb-5">
            <button
              className={`px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
                compareWithAll === false
                  ? "bg-[#1f1f43] text-white"
                  : "text-gray-600 hover:text-[#1f1f43]"
              }`}
              onClick={() => setCompareWithAll(false)}
            >
              کشف تناقض با یک قانون
            </button>
            <button
              className={`px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
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
      <div className="flex ">
        <button
          onClick={discoveringContradictionHandler}
          className=" bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
        >
          کشف تناقض
        </button>
      </div>
      {/* row 3 */}
      <div className="bg-[#8d8da8] mt-2 text-white h-[40%]">
        <h3 className="mb-2 bg-[#242752] text-white p-2">نتایج یافت شده:</h3>

        <div className="overflow-hidden">
          <div className="h-70 p-4">
            {messages.length === 0 ? (
              <div className="">تناقضی موجود نیست.</div>
            ) : (
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "270px" }}
                    >
                      <table className="min-w-full">
                        {/* Fixed Header */}
                        <thead className="sticky top-0 z-10">
                          <tr className="bg-[#242752] text-white">
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              ردیف
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              تناقض
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              زمان پایان
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              قانون اول
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              ماده قانون اول
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              قانون دوم
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              ماده قانون دوم
                            </th>
                            <th className="px-6 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                              پاسخ
                            </th>
                          </tr>
                        </thead>
                        {/* Scrollable Body */}
                        <tbody className="bg-white divide-y divide-gray-200">
                          {messages.map((item, index) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => selectContradictionHandler(item)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {item.contradiction ? "دارد" : "ندارد"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[5%]">
                                {toPersianTime(item.finish_time)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {/* {item.first_law_caption} */}
                                {item.first_law_caption.substring(0, 20)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {item.first_section_caption}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {/* {item.second_law_caption} */}
                                {item.second_law_caption?.substring(0, 20)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                {item.second_section_section}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-[65%]">
                                <div className="relative group">
                                  <div className="truncate max-w-[400px]">
                                    {item.response.substring(0, 100)}...
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  {selectedContradiction !== null && (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm h-full">
                      <div
                        className="overflow-auto bg-white"
                        style={{ maxHeight: "270px" }}
                      >
                        {/* Left content goes here */}
                        <div className="p-4 space-y-4">
                          {/* Add more items as needed */}
                          {/* RESPONSE */}
                          <div className="text-black">
                            <div className="font-bold">تناقض:</div>
                            <div className="pr-1">
                              {selectedContradiction?.response}
                            </div>
                          </div>
                          {/*  LAW 1 */}
                          <div className="text-black">
                            <div className="font-bold">قانون اول:</div>
                            <div className="pr-1">
                              {selectedContradiction?.first_law_caption}
                            </div>
                          </div>
                          <div className="text-black">
                            <div className="font-bold">عنوان ماده</div>
                            <div className="pr-1">
                              {selectedContradiction?.first_section_caption}
                            </div>
                          </div>
                          <div className="text-black">
                            <div className="font-bold">وضعیت ماده:</div>
                            <div className="pr-1">
                              {
                                selectedContradiction?.first_section_status_caption
                              }
                            </div>
                          </div>

                          <div className="text-black">
                            <div className="font-bold">موضوعات ماده:</div>
                            {selectedContradiction?.first_section_topics?.map(
                              (item, index) => {
                                return <div className="pr-1">{item}</div>;
                              }
                            )}
                          </div>

                          <div className="text-black">
                            <div className="font-bold">محتوای ماده:</div>
                            <div className="pr-1">
                              {selectedContradiction?.first_section_text}
                            </div>
                          </div>

                          {/* {newRuleValue !== null && (
                            <div className="text-black">
                              <div className="font-bold">قانون جدید:</div>
                              <div className="pr-1">{newRuleValue}</div>
                            </div>
                          )} */}
                          {/*  LAW 2 */}
                          <div className="text-black">
                            <div className="font-bold">قانون دوم:</div>
                            <div className="pr-1">
                              {selectedContradiction?.second_law_caption}
                            </div>
                          </div>
                          <div className="text-black">
                            <div className="font-bold">عنوان ماده:</div>
                            <div className="pr-1">
                              {selectedContradiction?.second_section_caption}
                            </div>
                          </div>
                          <div className="text-black">
                            <div className="font-bold">وضعیت ماده:</div>
                            <div className="pr-1">
                              {
                                selectedContradiction?.second_section_status_caption
                              }
                            </div>
                          </div>

                          <div className="text-black">
                            <div className="font-bold">موضوعات ماده:</div>
                            {selectedContradiction?.second_section_topics?.map(
                              (item, index) => {
                                return <div className="pr-1">{item}</div>;
                              }
                            )}
                          </div>

                          <div className="text-black">
                            <div className="font-bold">محتوای ماده:</div>
                            <div className="pr-1">
                              {selectedContradiction?.second_section_text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Web Socket */}
      {/* Message Display Area */}
      {/* <div className="mt-4 p-4 bg-white rounded-lg shadow-md h-64 overflow-y-auto">
        <h3 className="font-bold mb-2">WebSocket Messages:</h3>
        {messages.length === 0 ? (
          <p className="text-white">No messages received yet</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <span className="text-xs text-white">[{msg.timestamp}]</span>
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
