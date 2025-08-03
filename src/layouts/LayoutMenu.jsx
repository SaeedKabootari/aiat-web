import { useTranslation } from "react-i18next";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../shop/todoSlice";

const LayoutMenu = (props) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   const token = localStorage.getItem("token");

  //   if (!isLoggedIn || !token) {
  //     // If not logged in or no token, redirect to '/'
  //     navigate("/");
  //   }
  // }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("loggedIn");
    dispatch(todoActions.changeloggedInState(false));
    navigate("/");
  };

  return (
    <>
      <div className={`flex flex-col h-[100vh] bg-gray-100 `}>
        {/* Header (Full width) */}
        <header className="bg-[#242752] shadow-sm  py-6 px-6 flex justify-between items-center">
          <span className="text-3xl text-white font-semibold">
            {t("Aiat system")}
          </span>
          {/* <button
            onClick={logoutHandler}
            className="bg-red-500 rounded p-1 text-white"
          >
            logout
          </button> */}
          <button
            onClick={logoutHandler}
            className=" text-red-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={"w-6 h-6"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
        </header>
        {/* Main Content Area with Sidebar */}
        <div
          className={`flex flex-1 overflow-hidden ${
            i18n.language === "fa" ? "rtl" : "ltr"
          }`}
        >
          {/* Sidebar (Right) */}
          <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/discovering-contradiction"
                    className={({ isActive }) =>
                      `flex items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {t("Discovering a contradiction")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/resolutions-list"
                    className={({ isActive }) =>
                      `flex items-center py-2 text-gray-600 hover:bg-gray-100 rounded transition ${
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {t("List of resolutions")}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
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
