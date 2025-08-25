import { useState } from "react";
import loginBg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";
import { postActionAx } from "../api";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { todoActions } from "../shop/todoSlice";
import useErrorHandler from "../hooks/useErrorHandler";
import { AnimatedBackground } from "animated-backgrounds";

const Login = () => {
  const errorHandler = useErrorHandler();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { connect } = useWebSocket();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    await postActionAx("/api/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        dispatch(todoActions.changeloggedInState(true));
        localStorage.setItem("loggedIn", true);

        connect();

        navigate("/discovering-contradiction");
      })
      .catch((err) => {
        errorHandler(err);
      });
  };

  return (
    <>
      <AnimatedBackground
        animationName="particleNetwork"
        interactive={true}
        interactionConfig={{
          effect: "attract", // 'attract', 'repel', 'follow', 'burst'
          strength: 0.8, // 0-1
          radius: 150, // pixels
          continuous: true, // keep effect after mouse leaves
        }}
      />
      <div
        className="flex justify-center items-center h-screen"
        // style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="w-full max-w-md p-8  rounded-lg shadow-lg border border-[#A0A0A0] mx-4 backdrop-blur-lg bg-white/20">
          <form className="space-y-6" onSubmit={loginHandler}>
            <div className="flex justify-between">
              <h1 className="text-3xl text-[#fff]">{t("welcome_to_diar")}</h1>
              <button
                type="button"
                onClick={toggleLanguage}
                className={`bg-white text-[#242752] px-2 py-1 rounded shadow-md cursor-pointer ${
                  i18n.language === "fa" ? "left-22" : "right-22"
                }`}
                title={t("toggle_language")}
              >
                {i18n.language === "en" ? "FA" : "EN"}
              </button>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#E0E0E0] mb-1"
              >
                {t("username")}
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-[#fff]"
                // placeholder={t("enter_your_username")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#fff] mb-1"
              >
                {t("password")}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-[#fff]"
                // placeholder="••••••••"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-medium rounded-lg transition-all duration-300
            bg-[#242752] hover:bg-[#303874] 
            focus:outline-none focus:ring-2 focus:ring-[#3e4a8a] focus:ring-offset-2
            shadow-md hover:shadow-lg active:scale-[0.98]
            relative overflow-hidden group cursor-pointer"
              >
                {t("login")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
