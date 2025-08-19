import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActionAx } from "../api";
import DOMPurify from "dompurify";

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
        <style>
        {`
          .custom-table table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto;  /* Adjusts table based on content */
            margin: 0 auto;  /* Centers the table horizontally if desired */
          }

          .custom-table th, .custom-table td {
            border: 1px solid #000;
            padding: 10px 15px;  /* Increased padding for better spacing */
            text-align: right;  /* Right alignment for RTL; change to 'center' if you want centered text */

            word-wrap: break-word;  /* Ensures long text wraps and doesn't overflow */
            min-width: 100px;  /* Prevents cells from being too narrow */
          }

          .custom-table td {
            /* Specific styles for td elements */
            font-size: 14px;  /* Adjust font size for readability if needed */
          }
        `}
      </style>
      {resolution && (
        <div className="mt-2 p-2">
          <div className="text-[#242752]  ">
            <h1 className="text-2xl"> {resolution?.law?.caption}</h1>
          </div>
          <div className="flex flex-col mt-6">
            {/* before */}
            {/* {resolution?.sections?.map((item, index) => {
              return <div className=" whitespace-pre-wrap">{item.text}</div>;
            })} */}
            {/* then */}
            {resolution?.sections?.map((item, index) => {
              const sanitizedHTML = DOMPurify.sanitize(item.text || "", {
                ALLOWED_TAGS: [
                  "br",
                  "table",
                  "tr",
                  "td",
                  "th",
                  "hr",
                  "div",
                  "col",
                ],
                ALLOWED_ATTR: [
                  "style",
                  "width",
                  "dir",
                  "lang",
                  "border",
                  "cellpadding",
                  "cellspacing",
                  "valign",
                  "padding-top",
                  "padding-bottom",
                  "padding-left",
                  "padding-right",
                ],
              });

              return (
                <div
                  key={index}
                  className="custom-table dir-rtl p-4 rounded mb-3 overflow-x-auto overflow-y-auto"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizedHTML,
                    }}
                  />
                </div>
              );
            })}

            {/* end */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolutionDetail;
