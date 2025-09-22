import { useEffect, useRef, useState } from "react";
import { getActionAx, postActionAx } from "../api";
import { transformKeys } from "../utils/utils";
import MultiSelect from "../components/UI/MultiSelect";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler";

const ResolutionsList = (props) => {
  const errorHandler = useErrorHandler();

  const navigate = useNavigate();
  const [resolutions, setResolutions] = useState(null);

  const [topics, setTopics] = useState([]);
  const [selectedTopicsId, setSelectedTopicsId] = useState([]);

  const selectionIdsHandler = (selectedArray) => {
    setSelectedTopicsId(selectedArray);
  };

  useEffect(() => {
    const getTopics = async () => {
      await getActionAx(`/api/topics`)
        .then((res) => {
          setTopics(transformKeys(res.data));
        })
        .catch((err) => {
          errorHandler(err);
        });
    };

    getTopics();
  }, []);

  const selectResolutionHandler = async (resolutionId) => {
    navigate(`/resolution/${resolutionId}`);
  };

  const searchTermRef = useRef(null);

  const searchHandler = async () => {

    await postActionAx(`/api/laws/search`, {
      q: searchTermRef.current.value,
      limit: 50,
      topic_ids: selectedTopicsId,
    })
      .then((res) => {
        setResolutions(res.data);
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <>
      {/* header */}
      <div className="bg-white p-4 rounded shadow-lg w-full">
        <div className="mt-3 p-3 flex justify-center items-center gap-4 ">
          <input
            className="bg-[rgba(36,39,82,0.5)] h-10 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            ref={searchTermRef}
          />
          <button
            className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
            onClick={searchHandler}
          >
            جستجو
          </button>
          <button
            className="bg-blue-400 text-white font- py-2 px-4 rounded transition duration-300 cursor-pointer"
            onClick={() => setResolutions(null)}
          >
            ✖
          </button>
        </div>
        {resolutions === null && (
          <div>
            <MultiSelect
              treeData={topics}
              onSelectionChange={selectionIdsHandler}
            />
          </div>
        )}
        <div></div>
      </div>
      {/* content */}
      <div className="overflow-y-auto mt-2 h-[70vh]">
        {resolutions?.map((item, index) => {
          return (
            <div
              onClick={() => selectResolutionHandler(item.id)}
              id={item.id}
              key={index}
              className="flex flex-col bg-[rgba(36,39,82,0.5)] mb-3 p-2 rounded border border-gray-300"
            >
              <div>{item.law_no}</div>
              <div>{item.approve_date}</div>
              <div>{item.caption}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ResolutionsList;
