import { useEffect, useRef, useState } from "react";
import { delActionAx, getActionAx } from "../api";
import { formatText, toPersianTime } from "../utils/utils";
import PDFExport from "../components/PDFExport";
import ContradictionTablePdf from "../components/ContradictionTablePdf";
import useErrorHandler from "../hooks/useErrorHandler";
import Modal from "../components/Modal";

const FunctionsHistory = () => {
  const [tab, setTab] = useState("tasksTab");

  const errorHandler = useErrorHandler();
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [comparisonWithHeading, setComparisonWithHeading] = useState("");

  const [selectedContradiction, setSelectedContradiction] = useState(null);

  const [haveContradiction, setHaveContradiction] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteTaskRef = useRef(null);

  const getTasks = async () => {
    let getUrl = "/api/tasks";

    await getActionAx(getUrl)
      .then((res) => {
        setTasks(res.data);
        console.log("tasks=>", res.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTaskHandler = async () => {
    let url = `/api/task/${deleteTaskRef.current.task_id}`;
    await delActionAx(url)
      .then((res) => {})
      .catch((err) => {
        errorHandler(err);
      });

    getTasks();
    setDeleteModalOpen(false);
  };

  const selectTaskHandler = async (task) => {
    let getUrl = `/api/task/${task.task_id}`;
    const params = new URLSearchParams();
    if (haveContradiction !== null) {
      params.append("contradiction", haveContradiction);
    }
    if (params.toString()) {
      getUrl += `?${params.toString()}`;
    }

    let comparisonWith;
    let lawId;
    await getActionAx(getUrl)
      .then((res) => {
        setMessages(res.data.results);
        console.log("selectedTask=>", res.data);

        if (res.data.data.hasOwnProperty("prompt")) {
          comparisonWith = "prompt";
          setComparisonWithHeading(res.data.data.prompt);
        } else {
          comparisonWith = "law_id";
          lawId = res.data.data.law_id;
        }
      })
      .catch((err) => {
        errorHandler(err);
      });

    if ((comparisonWith = "law_id")) {
      await getActionAx(`/api/laws/${parseInt(lawId, 10)}`)
        .then((res) => {
          setComparisonWithHeading(res.data.caption);
        })
        .catch((err) => {
          errorHandler(err);
        });
    }

    setTab("detailTaskTab");
  };

  const selectContradictionHandler = async (item) => {
    let showObj = {
      first_law_caption: item.first_law_caption,
      first_section_caption: item.first_section_caption,
      second_law_caption: item.second_law_caption,
      second_section_caption: item.second_section_caption,
      response: item.response,
    };

    // this line for test:
    if (item.first_section_id !== null) {
      await getActionAx(`/api/sections/${item.first_section_id}`)
        .then((res) => {
          showObj.first_section_full_path = res.data.full_path;
          showObj.first_section_text = res.data.text;
          showObj.first_section_status_caption = res.data.status_caption;
          showObj.first_section_topics = res.data.topics;
        })
        .catch((err) => {
          errorHandler(err);
        });
    }
    if (item.second_section_id !== null) {
      await getActionAx(`/api/sections/${item.second_section_id}`)
        .then((res) => {
          showObj.second_section_full_path = res.data.full_path;
          showObj.second_section_text = res.data.text;
          showObj.second_section_status_caption = res.data.status_caption;
          showObj.second_section_topics = res.data.topics;
        })
        .catch((err) => {
          errorHandler(err);
        });
    }
    setSelectedContradiction(showObj);
  };

  return (
    <div>
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        // title="Simple Modal"
      >
        <div className="w-full">
          <div>آیا مطمئنید که می‌خواهید این کارکرد را حذف کنید؟</div>
          <div className="text-sm mt-2">
            {deleteTaskRef && deleteTaskRef?.current?.title}
          </div>

          <div className="w-full flex flex-row-reverse gap-2">
            <button
              className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 w-[200px] cursor-pointer"
              onClick={() => deleteTaskHandler()}
            >
              بله
            </button>
            <button
              className=" text-white py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 transition duration-300 w-[200px] cursor-pointer"
              onClick={() => setDeleteModalOpen(false)}
            >
              خیر
            </button>
          </div>
        </div>
      </Modal>
      {/* tabs */}
      <div className="flex p-1 bg-gray-200 rounded-md mb-5">
        <button
          className={`px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
            tab === "tasksTab"
              ? "bg-[#1f1f43] text-white"
              : "text-gray-600 hover:text-[#1f1f43]"
          }`}
          onClick={() => {
            setTab("tasksTab");
            setMessages([]);
            setSelectedContradiction(null);
          }}
        >
          کارکردها{" "}
        </button>
        <button
          className={`px-4 py-1 text-sm font-medium rounded-t-md focus:outline-none cursor-pointer ${
            tab === "detailTaskTab"
              ? "bg-[#1f1f43] text-white"
              : "text-gray-600 hover:text-[#1f1f43]"
          }`}
          onClick={() => setTab("detailTaskTab")}
        >
          جزعیات کارکرد{" "}
        </button>
      </div>
      {/* tasksTab: */}
      {tab === "tasksTab" && (
        <div>
          {/* filters */}
          <div className="w-full mb-5 flex justify-center">
            <div className="w-[100%] py-3 px-3  flex items-center  gap-2 bg-gray-50 rounded-sm ring-2 ring-[#242752]">
              <span>تناقض:</span>
              <input
                type="checkbox"
                checked={haveContradiction}
                onChange={(e) =>
                  e.target.checked
                    ? setHaveContradiction(true)
                    : setHaveContradiction(null)
                }
              />
            </div>
            <div className="flex justify-end"></div>
          </div>

          {/* first row */}
          <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div
              className="overflow-auto max-h-[70vh]"
              // style={{ maxHeight: "380px" }}
            >
              <table className="min-w-full">
                {/* Fixed Header */}
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#242752] text-white">
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      ردیف
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      نوع مصوبه
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      مقایسه با
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      وضعیت
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      زمان شروع
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      زمان پایان
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      نتیجه
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      عنوان
                    </th>
                    <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                      عملیات
                    </th>
                  </tr>
                </thead>
                {/* Scrollable Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks?.map((item, index) => (
                    <tr
                      key={item?.task_id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectTaskHandler(item)}
                    >
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                        {index + 1}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                        {item?.type === "custom" ? "مصوبه جدید" : "مصوبه قدیمی"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[5%]">
                        {item?.compare_all ? "همه قوانین" : "یک قانون"}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                        {item?.status}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                        {toPersianTime(item?.created_at)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                        {item?.finished_at === null
                          ? "---"
                          : toPersianTime(item?.finished_at)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[30%]">
                        {formatText(item?.result)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[25%]">
                        {formatText(item?.title)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                        <div className="flex items-center gap-2">
                          <button
                            // onClick={(event) => deleteTaskHandler(event, item)}
                            onClick={(event) => {
                              setDeleteModalOpen(true);
                              deleteTaskRef.current = item;
                              console.log(item);
                              event.stopPropagation();
                              console.log(item.task_id);
                              //write api for it
                              getTasks();
                            }}
                            className="cursor-pointer hover:text-red-500"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H9m9 0H6"
                              />
                            </svg>
                          </button>

                          <button className="cursor-pointer hover:text-blue-500">
                            <svg
                              className="w-5 h-5 "
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* detailTaskTab: */}
      {tab === "detailTaskTab" && (
        <div className="">
          {/* secondrow */}
          <div className="bg-[#8d8da8] mt-2 text-white">
            <h3 className="mb-2 bg-[#242752] text-white p-2">نمایش نتایج:</h3>

            <div className="overflow-hidden">
              <div className=" p-4">
                {messages.length === 0 ? (
                  <div className="">نتیجه ای موجود نیست.</div>
                ) : (
                  <div>
                    <h3 className="mb-1 text-white p-2">مقایسه:</h3>

                    <div className="pr-2 mb-2">{comparisonWithHeading}</div>

                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-8">
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <div
                            className="overflow-auto max-h-[40vh]"
                            // style={{ maxHeight: "270px" }}
                          >
                            <table className="min-w-full">
                              {/* Fixed Header */}
                              <thead className="sticky top-0 z-10">
                                <tr className="bg-[#242752] text-white">
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    ردیف
                                  </th>
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    تناقض
                                  </th>
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    زمان پایان
                                  </th>
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    قانون اول
                                  </th>
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    ماده
                                  </th>
                                  {/* <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    قانون دوم
                                  </th>
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    ماده
                                  </th> */}
                                  <th className="px-3 py-3 text text-sm font-semibold uppercase tracking-wider border-b border-[#242752]">
                                    پاسخ
                                  </th>
                                </tr>
                              </thead>
                              {/* Scrollable Body */}
                              <tbody className="bg-white divide-y divide-gray-200">
                                {messages.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                      selectContradictionHandler(item)
                                    }
                                  >
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                      {index + 1}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[5%]">
                                      {item?.contradiction ? "دارد" : "ندارد"}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[10%]">
                                      {toPersianTime(item?.finish_time)}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                                      {formatText(item?.first_law_caption)}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                                      {formatText(item?.first_section_caption)}
                                    </td>
                                    {/* <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                                      {formatText(item?.second_law_caption)}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[10%]">
                                      {formatText(item?.second_section_section)}
                                    </td> */}
                                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[40%]">
                                      {formatText(item?.response)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <PDFExport
                          tableJSX={
                            <>
                              <ContradictionTablePdf data={messages} />
                            </>
                          }
                        />
                      </div>
                      <div className="col-span-4">
                        {selectedContradiction !== null && (
                          <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <div
                              className="overflow-auto max-h-[40vh] bg-white"
                              // style={{ maxHeight: "270px" }}
                            >
                              {/* Left content goes here */}
                              <div className="p-4 space-y-4">
                                {/* Add more items as needed */}
                                {/* RESPONSE */}
                                <div className="text-black">
                                  <div className="font-bold">نتیجه:</div>
                                  <div className="pr-1">
                                    {selectedContradiction?.response}
                                  </div>
                                </div>
                                {/*  LAW 1 */}
                                <div className="text-black">
                                  <div className="font-bold">قانون:</div>
                                  <div className="pr-1">
                                    {selectedContradiction?.first_law_caption}
                                  </div>
                                </div>
                                <div className="text-black">
                                  <div className="font-bold">عنوان ماده</div>
                                  <div className="pr-1">
                                    {
                                      selectedContradiction?.first_section_caption
                                    }
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
                                {/* <div className="text-black">
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
                            </div> */}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* secondrow */}
    </div>
  );
};

export default FunctionsHistory;
