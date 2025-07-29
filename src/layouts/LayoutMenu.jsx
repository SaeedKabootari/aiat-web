import { useTranslation } from "react-i18next";
import { Outlet, NavLink } from "react-router-dom";

const LayoutMenu = (props) => {
  const { i18n, t } = useTranslation();
  console.log(i18n.language);
  return (
    <>
      {/* <div>layout menu:</div>
      <Outlet /> */}

      <div className={`flex flex-col h-screen bg-gray-100 `}>
        {/* Header (Full width) */}
        <header className="bg-white shadow-sm py-4 px-6"></header>

        {/* Main Content Area with Sidebar */}
        <div
          className={`flex flex-1 overflow-hidden ${
            i18n.language === "fa" ? "rtl" : "ltr"
          }`}
        >
          {/* Sidebar (Right) */}
          <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">Menu</h2> */}
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
