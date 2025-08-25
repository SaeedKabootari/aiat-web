import { useEffect, useRef, useState } from "react";
import { getActionAx, postActionAx } from "../api";
import { transformKeys } from "../utils/utils";
import MultiSelect from "../components/MultiSelect";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../hooks/useErrorHandler";

const ResolutionsList = (props) => {
    const errorHandler = useErrorHandler();

  const navigate = useNavigate()
  const [resolutions, setResolutions] = useState(null);

  const [topics, setTopics] = useState([]);
  const [selectedTopicsId, setSelectedTopicsId] = useState([]);

  const selectionIdsHandler = (selectedArray) => {
    setSelectedTopicsId(selectedArray);
    console.log("Selected IDs in parent:", selectedArray);
  };

  useEffect(() => {
    const getTopics = async () => {
      await getActionAx(`/api/topics`)
        .then((res) => {
          console.log("ZZZZZZZZZZZZZZZZZZZZ", res);
          console.log(transformKeys(res.data));
          console.log(res.data);
          setTopics(transformKeys(res.data));
        })
        .catch((err) => {
          console.log("ZZZZZZZZZZZZZZZZZZZZ", err);
          console.log(err);
          errorHandler(err);
        });
    };

    getTopics();
  }, []);

  const selectResolutionHandler = async (resolutionId) => {

    navigate(`/resolution/${resolutionId}`)
    // props.setDiscoveringObj((prevState) => ({
    //   ...prevState,
    //   check_law_id: parseInt(resolutionId, 10),
    // }));
    // await getActionAx(`/api/laws/${parseInt(resolutionId, 10)}/sections`)
    //   .then((res) => {
    //     console.log("SHOW", res.data);
    //     // props.setSelectedResolution(res.data);
    //     // props.onClose();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(resolutionId, "id");


  };

  const searchTermRef = useRef(null);

  const searchHandler = async () => {
    console.log(searchTermRef.current.value);
    console.log(localStorage.getItem("token"));

    // await getActionAx(
    //   `/api/laws/search?q=${searchTermRef.current.value}&limit=${10}`
    // )
    //   .then((res) => {
    //     console.log(res.data);
    //     setResolutions(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    await postActionAx(`/api/laws/search`, {
      q: searchTermRef.current.value,
      limit: 50,
      topic_ids: selectedTopicsId,
    })
      .then((res) => {
        console.log(res.data);
        setResolutions(res.data);
      })
      .catch((err) => {
        console.log(err);
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
