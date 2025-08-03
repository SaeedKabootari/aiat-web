import { useState } from "react";
import SendSearchResolutionModal from "./SendSearchResolutionModal";

const SendResolution = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState({});

  return (
    <>
      <div>
        <button
          className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 w-[200px] cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          انتخاب مصوبه برای کشف تناقض
        </button>
        {modalOpen && (
          <SendSearchResolutionModal
            onClose={() => setModalOpen(false)}
            setSelectedResolution={setSelectedResolution}
            setDiscoveringObj={props.setDiscoveringObj}
          />
        )}
        {selectedResolution && (
          <div className="mt-2 p-2">
            <div className="text-[#242752]  ">
              <div>{selectedResolution?.law?.caption}</div>
            </div>
            <div className="flex flex-col gap-4 mt-2 max-h-60 overflow-y-auto">
              {selectedResolution?.sections?.map((item, index) => {
                return <div className="text-sm">{item.text}</div>;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SendResolution;
