import { useRef, useState } from "react";
import { getActionAx } from "../api";

const SearchResolutionModal = (props) => {
  const [resolutions, setResolutions] = useState([]);

  const selectResolutionHandler = async (resolutionId) => {
    props.setDiscoveringObj((prevState) => ({
      ...prevState,
      law_id: parseInt(resolutionId, 10),
    }));
    console.log("law_id", parseInt(resolutionId, 10));
    await getActionAx(`/api/laws/${parseInt(resolutionId, 10)}/sections`)
      .then((res) => {
        console.log("SHOW", res.data);
        props.setSelectedResolution(res.data);
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(resolutionId, "id");
  };

  const searchTermRef = useRef(null);

  const searchHandler = async () => {
    console.log(searchTermRef.current.value);
    console.log(localStorage.getItem("token"));
    console.log(document.cookie);

    await getActionAx(
      `/api/laws/search?q=${searchTermRef.current.value}&limit=${10}`
    )
      .then((res) => {
        console.log("ZZZZZZZZZZZZZZZZZZZZ", res);
        console.log(res.data);
        setResolutions(res.data);
      })
      .catch((err) => {
        console.log("ZZZZZZZZZZZZZZZZZZZZ", err);
        console.log(err);
      });
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-[rgba(36,39,82,0.5)] backdrop-blur-md z-50 flex items-center justify-center">
      {/* Modal container */}
      <div className="bg-white p-4 rounded shadow-lg relative max-w-4xl w-full">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={props.onClose}
        >
          ✖
        </button>
        {/* Modal content */}
        <div className="mt-3 p-3 flex justify-center items-center gap-4">
          <input
            className="bg-[rgba(36,39,82,0.5)] h-10 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            ref={searchTermRef}
          />
          <button
            className="bg-[#242752] text-white  py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
            onClick={searchHandler}
          >
            جستجو
          </button>
        </div>
        <div>
          <div className="overflow-y-auto max-h-[60vh]  mt-2">
            {resolutions.map((item, index) => {
              return (
                <div
                  onClick={() => selectResolutionHandler(item.id)}
                  id={item.id}
                  key={index}
                  className="flex flex-col bg-[rgba(36,39,82,0.5)] mb-3 p-2 rounded border border-gray-300 cursor-pointer"
                >
                  <div>{item.law_no}</div>
                  <div>{item.approve_date}</div>
                  <div>{item.caption}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResolutionModal;
