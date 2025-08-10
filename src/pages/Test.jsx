import { useRef } from "react";
import { postActionAx } from "../api";
import useErrorHandler from "../hooks/useErrorHandler";

const Test = (props) => {
  const errorHandler =useErrorHandler()
  const searchTermRef = useRef(null);
  const testApiHandler = async () => {
    console.log(searchTermRef.current.value)
    await postActionAx(`/api/search_similar`, {
      query_text: searchTermRef.current.value,
    })
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
        errorHandler(err)
      });
  };
  return (
    <>
      <input
        className="bg-[rgba(36,39,82,0.5)] h-10 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        ref={searchTermRef}
      />
      <button className="bg-[#242752] text-white  py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer" onClick={testApiHandler}>Test API</button>
    </>
  );
};
export default Test;
