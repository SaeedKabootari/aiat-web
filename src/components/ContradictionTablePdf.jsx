import React from "react";

// const data = [
//   // داده‌های شما اینجا قرار می‌گیرند
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116833,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "امتداد",
//     first_section_id: 1876895,
//     id: 8569,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116833,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116835,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116834,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116834,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116834,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   {
//     contradiction: false,
//     finish_time: 1754584913,
//     first_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     first_law_id: 116833,
//     first_section_caption: "متن > بند 2",
//     first_section_id: 1876894,
//     id: 8568,
//     response: "This statement doesn't seem questionable.",
//     second_law_caption: "اجراي طرحي تمام برق و سيلينايلينگ و شبكه برق با استفاده از تسييلات مالي خارجي",
//     second_law_id: 116834,
//     second_section_caption: null,
//     second_section_id: 2,
//   },
//   // داده‌های بیشتر ...
// ];

const groupBySecondLawId = (data) => {
  const groups = {};
  data?.forEach((item) => {
    // const key = item.second_law_id;
    const key = item.first_law_id;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  return Object.values(groups);
};

const ContradictionTablePdf = ({ data }) => {
  const groupedData = groupBySecondLawId(data);
  console.log("GROUP==>", groupedData);

  // for (let i = 0; i < groupedData.length; i++) {}

  return (
    <>
      {groupedData.map((item, index) => {
        console.log((index === 0))
        return (
          <table
            className="border-collapse border border-gray-400 w-full"
            dir="rtl"
          >
            {/* {index === 0 && ( */}
              <thead lassName="bg-blue-300">
                <tr>
                  <th colSpan="2" className="border border-gray-400 p-2">
                    قانون / مقرره
                  </th>
                </tr>
                <tr>
                  <td colSpan="2" className="border border-gray-400 p-2">
                    {item[0].first_law_caption}
                  </td>
                </tr>
              </thead>
            {/* )} */}

            <tbody>
              {item.map((item, index) => {
                return (
                  <>
                    {index === 0 && (
                      <tr>
                        <th className="border border-gray-400 p-2">
                          ماده / تبصره
                        </th>
                        <th className="border border-gray-400 p-2">نتیجه</th>
                      </tr>
                    )}
                    <tr>
                      <td className="border border-gray-400 p-2">
                        {item.first_section_caption}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {item.response}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </>
  );
};

export default ContradictionTablePdf;

// const groupBySecondLawId = (data) => {
//   const groups = {};
//   data.forEach((item) => {
//     const key = item.first_law_id; // یا هر کلید دیگری که می‌خواهید گروه‌بندی کنید
//     if (!groups[key]) {
//       groups[key] = [];
//     }
//     groups[key].push(item);
//   });
//   return Object.values(groups);
// };

// const ContradictionTablePdf = ({ data }) => {
//   const groupedData = groupBySecondLawId(data);

//   return (
//     <table className="border-collapse border border-gray-400 w-full" dir="rtl">
//       <thead className="bg-blue-300">
//         <tr>
//           <th className="border border-gray-400 p-2">عنوان</th>
//           <th className="border border-gray-400 p-2">محتوا</th>
//         </tr>

//         <tr>
//           <th className="border border-gray-400 p-2">عنوان</th>
//           <th className="border border-gray-400 p-2">محتوا</th>
//         </tr>
//       </thead>
//       <tbody>
//         {groupedData.map((group, groupIndex) => (
//           <>
//             {/* سطر عنوان گروه: قانون */}
//             <tr key={`law-title-${groupIndex}`}>
//               <td className="border border-gray-400 p-2 font-bold" colSpan={2}>
//                 قانون: {group[0].first_law_caption}
//               </td>
//             </tr>
//             {/* سطرهای مربوط به هر آیتم در گروه */}
//             {group.map((item, idx) => (
//               <React.Fragment key={item.id}>
//                 {/* اگر اولین آیتم نیست، ستون قانون رو تکرار نکن */}
//                 {idx !== 0 && (
//                   <tr>
//                     <td
//                       className="border border-gray-400 p-2 font-bold"
//                       colSpan={2}
//                     >
//                       قانون: {item.first_law_caption}
//                     </td>
//                   </tr>
//                 )}
//                 {/* ماده و نتیجه */}
//                 <tr>
//                   <td className="border border-gray-400 p-2">
//                     ماده: {item.first_section_caption}
//                   </td>
//                   <td className="border border-gray-400 p-2">
//                     نتیجه: {item.response}
//                   </td>
//                 </tr>
//               </React.Fragment>
//             ))}
//           </>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ContradictionTablePdf;
