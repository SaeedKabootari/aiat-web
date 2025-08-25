import { useState } from "react";
import SearchResolutionModal from "./SearchResolutionModal";

const SearchResolution = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState({});
  const [selectedSection, setSelectedSection] = useState({});
  return (
    <div>
      <button
        className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 w-[200px] cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        انتخاب مصوبه
      </button>
      {modalOpen && (
        <SearchResolutionModal
          onClose={() => setModalOpen(false)}
          setSelectedResolution={setSelectedResolution}
          setDiscoveringObj={props.setDiscoveringObj}
        />
      )}
      {selectedResolution && (
        <div className="mt-2 p-2">
          <div className="text-[#242752] font-semibold ">
            <div>{selectedResolution?.law?.caption}</div>
          </div>
          <div className="flex flex-col gap-4 mt-2 max-h-60 overflow-y-auto">
            {selectedResolution?.sections?.map((item, index) => {
              return (
                <div
                  className={`${
                    item.order == selectedSection.order
                      ? "bg-[#242752] text-white"
                      : "bg-[#ccc] text-black"
                  } text-sm `}
                  onClick={() => {
                    setSelectedSection(item);
                    props.setDiscoveringObj((prevState) => ({
                      ...prevState,
                      section_no: parseInt(item.order, 10),
                    }));
                  }}
                >
                  <div
                    key={index}
                    className="content-container dir-rtl p-3 rounded "
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchResolution;
