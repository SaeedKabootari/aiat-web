import { useTranslation } from "react-i18next";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { Bounce, ToastContainer } from "react-toastify";
import Header from "./Header";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const LayoutMenu = (props) => {
  const windowWidth = useWindowDimensions().width;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { i18n, t } = useTranslation();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   const token = localStorage.getItem("token");

  //   if (!isLoggedIn || !token) {
  //     // If not logged in or no token, redirect to '/'
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <>
      {sidebarOpen && (
        <div className=" p-2 bg-[#242752]/75 text-white fixed top-0 right-4  w-full h-full z-[6000]"></div>
      )}
      {/* mobile sidebar */}
      <aside
        className={`w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto fixed right-0 top-0 h-full transition-transform duration-300 ease-in-out transform z-[7000] ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav>
          <ul className="space-y-2">
            <li className="flex flex-row-reverse">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center p-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>

            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  />
                </svg>
                چت
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/discovering-contradiction"
                className={({ isActive }) =>
                  `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                {t("Discovering a contradiction")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/functions-history"
                className={({ isActive }) =>
                  `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                تاریخچه کارکردها
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/resolutions-list"
                className={({ isActive }) =>
                  `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                  />
                </svg>
                {t("List of resolutions")}
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className={`flex flex-col h-[100vh] bg-gray-100 `}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* Header (Full width) */}
        <Header
          sidebarButtonClick={() => setSidebarOpen((prevState) => !prevState)}
        />
        {/* Main Content Area with Sidebar */}
        <div
          className={`flex flex-1 overflow-hidden ${
            i18n.language === "fa" ? "rtl" : "ltr"
          }`}
        >
          {/* Sidebar (Right) */}
          {/* desktop sidebar */}
          {windowWidth > 1024 && (
            <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
              <nav>
                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/chat"
                      className={({ isActive }) =>
                        `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                        />
                      </svg>
                      چت
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/discovering-contradiction"
                      className={({ isActive }) =>
                        `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      {t("Discovering a contradiction")}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/functions-history"
                      className={({ isActive }) =>
                        `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      تاریخچه کارکردها
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/resolutions-list"
                      className={({ isActive }) =>
                        `flex gap-1 items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                        />
                      </svg>
                      {t("List of resolutions")}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>
          )}
          {/* Main Content (Left) */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutMenu;
