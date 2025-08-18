import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActionAx } from "../api";

const ResolutionDetail = () => {
  const [resolution, setResolution] = useState();
  const params = useParams();
  const getResolution = async () => {
    await getActionAx(`/api/laws/${parseInt(params.id, 10)}/sections`)
      .then((res) => {
        setResolution(res.data);
        console.log("resolutionDetail==>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getResolution();
  }, []);
  
  return (
    <div>
      {resolution && (
        <div className="mt-2 p-2">
          <div className="text-[#242752]  ">
            <h1 className="text-2xl"> {resolution?.law?.caption}</h1>
          </div>
          <div className="flex flex-col mt-6">
            {resolution?.sections?.map((item, index) => {
              return <div className=" whitespace-pre-wrap">{item.text}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolutionDetail;
