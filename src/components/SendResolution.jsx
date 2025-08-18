import { useState } from "react";
import SendSearchResolutionModal from "./SendSearchResolutionModal";
import { cleanMessageText } from "../utils/utils";

const SendResolution = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState({});

  console.log(cleanMessageText('18 - 4 - اگر واگن و يا بوژي طوري آسيب ديده باشد كه شكي بين اقتصادي بودن تعمير و يا از دور خارج كردن آن ويا برگشت آن به راه آهن مالك وجود داشته باشد مسأله با توافق راه آهن مالك حل و فصل مي شود . <br> <br> <br> در اين مورد راه آهن استفاده كننده ميزان و نوع خسارت وارده بر واگن و يا بوژي را به راه آهن مالك اطلاع مي دهد . واگن و يا بوژي و يا قطعات آنها فقط با توافق راه آهن مالك برگردانده مي شود . ( 1 ) . <br> <br>'))
  return (
    <>
      <div>
        <button
          className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 w-[200px] cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          انتخاب مصوبه
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
                // return <div className="text-sm">{item.text}</div>;
                return <div className="text-sm">{cleanMessageText(item.text)}</div>;
                return <div className=" whitespace-pre-wrap">{item.text}</div>;

              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SendResolution;
