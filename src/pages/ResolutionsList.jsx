import { useRef, useState } from "react";
import MultiSelect from "../components/MultiSelect";
import { getActionAx } from "../api";
import { transformKeys } from "../utils/utils";
import PDFExport from "../components/PDFExport";
import MyTable from "../components/ContradictionTablePdf";

const ResolutionsList = (props) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopicsId, setSelectedTopicsId] = useState([]);

  const d = (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2</td>
          <td>sd</td>
        </tr>
      </tbody>
    </table>
  );

  const selectionIdsHandler = (selectedArray) => {
    setSelectedTopicsId(selectedArray);
    console.log("Selected IDs in parent:", selectedArray);
  };

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
    {/* <table className="border-collapse border border-gray-400">
  <tbody>
    <tr>
      <td rowSpan="2" className="border border-gray-400 p-2">پراپرتی مشترک (ادغام شده در ردیف‌ها)</td>
      <td className="border border-gray-400 p-2">مقدار ۱</td>
    </tr>
    <tr>
      <td className="border border-gray-400 p-2">مقدار ۲</td>
    </tr>
  </tbody>
</table>
<MyTable />
      <PDFExport
        tableJSX={
          <div>
            <span>heeloo</span>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>sd</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      />{" "}
      <MultiSelect treeData={topics} onSelectionChange={selectionIdsHandler} />
      <button
        className="bg-[#242752] text-white py-2 px-4 rounded hover:bg-[#1f1f43] transition duration-300 cursor-pointer"
        onClick={fetchHandler}
      >
        fetch
      </button> */}
    </>
  );
};
export default ResolutionsList;
