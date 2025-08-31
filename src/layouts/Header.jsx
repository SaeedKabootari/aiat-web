import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoActions } from "../shop/todoSlice";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { postActionAx } from "../api";
import useErrorHandler from "../hooks/useErrorHandler";

const Header = (props) => {
  const errorHandler = useErrorHandler();
  const windowWidth = useWindowDimensions().width;
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await postActionAx("/api/logout", {})
      .then((res) => {
        localStorage.removeItem("loggedIn");
        dispatch(todoActions.changeloggedInState(false));
        navigate("/");
      })
      .catch((err) => {
        // errorHandler(err);
      });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
  };

  return windowWidth > 1024 ? (
    <header className="bg-[#242752] shadow-sm  py-6 px-6 flex justify-between items-center">
      {/* title */}
      <span className="text-3xl text-white font-semibold">
        {t("Aiat system")}
      </span>
      <div className="flex gap-[2.5rem]">
        {/* toggle language button */}
        <button
          onClick={toggleLanguage}
          className={` bg-blue-500 text-white px-2 py-1 rounded shadow-md cursor-pointer ${
            i18n.language === "fa" ? "left-22" : "right-22"
          }`}
          title={t("toggle_language")}
        >
          {i18n.language === "en" ? "FA" : "EN"}
        </button>
        {/* logout button */}
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
      </div>
    </header>
  ) : (
    <header className="bg-[#242752] shadow-sm py-6 px-6 grid grid-cols-3 items-center relative">
      {/* Sidebar button */}
      <div className="flex justify-start">
        <button
          onClick={props.sidebarButtonClick}
          className=" text-white cursor-pointer"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Title in the center */}
      <div className="flex justify-center">
        <span className="text-3xl text-white font-semibold">
          {t("Aiat system")}
        </span>
      </div>

      {/* Right side buttons */}
      <div className="flex justify-end gap-[2.5rem]">
        {/* toggle language button */}
        <button
          onClick={toggleLanguage}
          className={`bg-blue-500 text-white px-2 py-1 rounded shadow-md cursor-pointer ${
            i18n.language === "fa" ? "left-22" : "right-22"
          }`}
          title={t("toggle_language")}
        >
          {i18n.language === "en" ? "FA" : "EN"}
        </button>
        {/* logout button */}
        <button onClick={logoutHandler} className="text-red-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
