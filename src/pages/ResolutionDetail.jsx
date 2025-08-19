import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActionAx } from "../api";

const ResolutionDetail = () => {
  const [resolution, setResolution] = useState();
  const params = useParams();
  
  const getResolution = async () => {
    await getActionAx(`/api/laws/${parseInt(params.id, 10)}/sections`)
      .then((res) => {
        setResolution(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getResolution();
  }, []);

  return (
    <div className="mt-2 p-2">
      <style>
        {`
          /* Preserve whitespace for all content */
          .content-container {
            white-space: pre-wrap;
            word-break: break-word;
            font-family: inherit;
          }
          
          /* Reset whitespace handling for tables and their cells */
          .content-container table,
          .content-container th,
          .content-container td {
            white-space: normal;
          }
          
          /* Table styling */
          .content-container table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
          }
          
          .content-container table, 
          .content-container th, 
          .content-container td {
            border: 1px solid #ccc;
          }
          
          .content-container th, 
          .content-container td {
            padding: 8px;
            text-align: right;
          }
          
          /* Special handling for text nodes directly in container */
          .content-container > :not(table) {
            white-space: pre-wrap;
          }
        `}
      </style>

      {resolution && (
        <div>
          <div className="text-[#242752]">
            <h1 className="text-2xl">{resolution?.law?.caption}</h1>
          </div>
          <div className="flex flex-col mt-6">
            {resolution?.sections?.map((item, index) => (
              <div 
                key={index} 
                className="content-container dir-rtl  p-3 bg-white rounded "
                dangerouslySetInnerHTML={{ __html: item.text }} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolutionDetail;