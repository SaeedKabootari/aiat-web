import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoActions } from "../shop/todoSlice";

const Header = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("loggedIn");
    dispatch(todoActions.changeloggedInState(false));
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
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
  );
};

export default Header;
