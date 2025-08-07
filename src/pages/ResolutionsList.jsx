import { useRef, useState } from "react";
import MultiSelect from "../components/MultiSelect";
import { getActionAx } from "../api";
import { transformKeys } from "../utils/utils";



const ResolutionsList = (props) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicsId, setSelectedTopicsId] = useState([]);



const selectionIdsHandler = (selectedArray)=>{
    setSelectedTopicsId(selectedArray);
    console.log("Selected IDs in parent:", selectedArray);

}


  const fetchHandler = async () => {
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
      });
  };
  return (
    <>
      <MultiSelect treeData={topics} onSelectionChange={selectionIdsHandler}
/>
      <button
        className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
        onClick={fetchHandler}
      >fetch</button>
    </>
  );
};
export default ResolutionsList;
