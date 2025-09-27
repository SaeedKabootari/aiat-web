// import React, { useState } from 'react';
// import { FILTER_OPTIONS, MAIN_CATEGORIES } from '../../data/populationData'; // Adjust path based on your project structure

// const CategoryAccordion = (p) => {
//   const [openCategory, setOpenCategory] = useState(null);

//   const toggleCategory = (categoryId) => {
//     // If the clicked category is already open, close it; otherwise, open it and close others
//     setOpenCategory(openCategory === categoryId ? null : categoryId);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       {MAIN_CATEGORIES.map((category) => (
//         <div key={category.id} className="mb-4">
//           {/* Parent Category */}
//           <button
//             onClick={() => toggleCategory(category.id)}
//             className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl">{category.icon}</span>
//               <span className="text-lg font-semibold text-gray-800">{category.label}</span>
//             </div>
//             <svg
//               className={`w-6 h-6 text-gray-600 transform transition-transform duration-200 ${
//                 openCategory === category.id ? 'rotate-180' : ''
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* Child Groups */}
//           {openCategory === category.id && (
//             <div className="mt-2 bg-white rounded-lg shadow-inner p-4 transition-all duration-300">
//               {FILTER_OPTIONS[category.id].map((group) => (
//                 <div key={group.id} className="mb-4">
//                   <h3 className="text-md font-medium text-gray-700 mb-2">{group.label}</h3>
//                   <ul className="space-y-2">
//                     {group.filters.map((filter) => (
//                       <li
//                         key={filter.id}
//                         className="pl-4 text-gray-600 hover:text-blue-600 transition-colors duration-200"
//                       >
//                         - {filter.label}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryAccordion;






// import React, { useState } from 'react';
// import { FILTER_OPTIONS, MAIN_CATEGORIES } from '../../data/populationData'; // Adjust path based on your project structure

// const CategoryAccordion = () => {
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openGroup, setOpenGroup] = useState(null);

//   const toggleCategory = (categoryId) => {
//     // If the clicked category is already open, close it; otherwise, open it and close others
//     setOpenCategory(openCategory === categoryId ? null : categoryId);
//     setOpenGroup(null); // Close any open group when changing categories
//   };

//   const toggleGroup = (groupId) => {
//     // If the clicked group is already open, close it; otherwise, open it and close other groups
//     setOpenGroup(openGroup === groupId ? null : groupId);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       {MAIN_CATEGORIES.map((category) => (
//         <div key={category.id} className="mb-4">
//           {/* Parent Category */}
//           <button
//             onClick={() => toggleCategory(category.id)}
//             className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
//             aria-expanded={openCategory === category.id}
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl">{category.icon}</span>
//               <span className="text-lg font-semibold text-gray-800">{category.label}</span>
//             </div>
//             <svg
//               className={`w-6 h-6 text-gray-600 transform transition-transform duration-200 ${
//                 openCategory === category.id ? 'rotate-180' : ''
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* Child Groups */}
//           {openCategory === category.id && (
//             <div className="mt-2 bg-white rounded-lg shadow-inner p-4 transition-all duration-300">
//               {FILTER_OPTIONS[category.id].map((group) => (
//                 <div key={group.id} className="mb-3">
//                   {/* Group Header */}
//                   <button
//                     onClick={() => toggleGroup(group.id)}
//                     className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
//                     aria-expanded={openGroup === group.id}
//                   >
//                     <span className="text-md font-medium text-gray-700">{group.label}</span>
//                     <svg
//                       className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
//                         openGroup === group.id ? 'rotate-180' : ''
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* Group Filters */}
//                   {openGroup === group.id && (
//                     <div className="mt-2 pl-4 max-h-48 overflow-y-auto">
//                       <ul className="space-y-2">
//                         {group.filters.map((filter) => (
//                           <li
//                             key={filter.id}
//                             className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
//                           >
//                             - {filter.label}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryAccordion;



// import React, { useState } from 'react';
// import { FILTER_OPTIONS, MAIN_CATEGORIES } from '../../data/populationData'; // Adjust path based on your project structure

// const CategoryAccordion = () => {
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openGroup, setOpenGroup] = useState(null);
//   const [selectedFilter, setSelectedFilter] = useState(null);

//   const toggleCategory = (categoryId) => {
//     // If the clicked category is already open, close it; otherwise, open it and close others
//     setOpenCategory(openCategory === categoryId ? null : categoryId);
//     setOpenGroup(null); // Close any open group when changing categories
//     setSelectedFilter(null); // Reset selected filter
//     console.log('categoryId ==>' ,categoryId)
//   };

//   const toggleGroup = (groupId) => {
//     // If the clicked group is already open, close it; otherwise, open it and close other groups
//     setOpenGroup(openGroup === groupId ? null : groupId);
//     setSelectedFilter(null); // Reset selected filter
//     console.log('groupId ==>' ,groupId)
//   };

//   const handleFilterClick = (filterId) => {
//     // Select the clicked filter, deselect if already selected
//     setSelectedFilter(selectedFilter === filterId ? null : filterId);
//     console.log('filterId ==>' ,filterId)

//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
//       {MAIN_CATEGORIES.map((category) => (
//         <div key={category.id} className="mb-4">
//           {/* Parent Category */}
//           <button
//             onClick={() => toggleCategory(category.id)}
//             className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
//             aria-expanded={openCategory === category.id}
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl">{category.icon}</span>
//               <span className="text-lg font-semibold text-gray-800">{category.label}</span>
//             </div>
//             <svg
//               className={`w-6 h-6 text-gray-600 transform transition-transform duration-200 ${
//                 openCategory === category.id ? 'rotate-180' : ''
//               }`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* Child Groups */}
//           {openCategory === category.id && (
//             <div className="mt-2 bg-white rounded-lg shadow-inner p-4 transition-all duration-300">
//               {FILTER_OPTIONS[category.id].map((group) => (
//                 <div key={group.id} className="mb-3">
//                   {/* Group Header */}
//                   <button
//                     onClick={() => toggleGroup(group.id)}
//                     className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
//                     aria-expanded={openGroup === group.id}
//                   >
//                     <span className="text-md font-medium text-gray-700">{group.label}</span>
//                     <svg
//                       className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
//                         openGroup === group.id ? 'rotate-180' : ''
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* Group Filters */}
//                   {openGroup === group.id && (
//                     <div className="mt-2 pl-4 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
//                       <ul className="space-y-2">
//                         {group.filters.map((filter) => (
//                           <li
//                             key={filter.id}
//                             onClick={() => handleFilterClick(filter.id)}
//                             className={`cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 rounded ${
//                               selectedFilter === filter.id ? 'text-blue-600 bg-blue-100' : ''
//                             }`}
//                           >
//                             - {filter.label}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryAccordion;




import React, { useState } from 'react';
import { FILTER_OPTIONS, MAIN_CATEGORIES } from '../../data/populationData'; // Adjust path based on your project structure

const CategoryAccordion = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openGroup, setOpenGroup] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setOpenGroup(null); // Close any open group when changing categories
    setSelectedFilter(null); // Reset selected filter
    console.log('categoryId ==>', categoryId);
  };

  const toggleGroup = (groupId) => {
    setOpenGroup(openGroup === groupId ? null : groupId);
    setSelectedFilter(null); // Reset selected filter
    console.log('groupId ==>', groupId);
  };

  const handleFilterClick = (filterId) => {
    setSelectedFilter(selectedFilter === filterId ? null : filterId);
    console.log('filterId ==>', filterId);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
      {MAIN_CATEGORIES.map((category) => (
        <div key={category.id} className="mb-3">
          {/* Parent Category */}
          <button
            onClick={() => toggleCategory(category.id)}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
            aria-expanded={openCategory === category.id}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{category.icon}</span>
              <span className="text-base font-medium text-gray-800">{category.label}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                openCategory === category.id ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Child Groups */}
          {openCategory === category.id && (
            <div className="mt-1 bg-white rounded-lg shadow-inner p-3 transition-all duration-300">
              {FILTER_OPTIONS[category.id].map((group) => (
                <div key={group.id} className="mb-2">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    aria-expanded={openGroup === group.id}
                  >
                    <span className="text-sm font-medium text-gray-700">{group.label}</span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
                        openGroup === group.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Group Filters */}
                  {openGroup === group.id && (
                    <div className="mt-1 pl-3 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                      <ul className="space-y-1">
                        {group.filters.map((filter) => (
                          <li
                            key={filter.id}
                            onClick={() => handleFilterClick(filter.id)}
                            className={`cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 rounded text-sm ${
                              selectedFilter === filter.id ? 'text-blue-600 bg-blue-100' : ''
                            }`}
                          >
                            - {filter.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordion;