import { useRef } from "react";

const ResolutionsList = (props) => {

  const searchTermRef = useRef(null);

  const searchHandler = async () => {
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
    <>
    test
      {/* <div className="mt-3 p-3 flex justify-center items-center gap-4">
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
      </div> */}
    </>
  );
};
export default ResolutionsList;
