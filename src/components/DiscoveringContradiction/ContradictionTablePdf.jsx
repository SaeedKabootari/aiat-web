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

  return (
    <>
      {groupedData.map((item, index) => {
        console.log(index === 0);
        return (
          <table
            className="border-collapse border border-gray-400 w-full"
            dir="rtl"
          >
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
