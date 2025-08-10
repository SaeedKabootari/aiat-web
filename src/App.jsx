import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./context/WebSocketContext";
import Home from "./pages/Home";
import SignIn from "./pages/Login";
import LayoutMenu from "./layouts/LayoutMenu";
import Test from "./pages/Test";
import { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ResolutionsList from "./pages/ResolutionsList";
import DiscoveringContradiction from "./pages/DiscoveringContradiction";
import { useSelector } from "react-redux";
import FunctionsHistory from "./pages/FunctionsHistory";
import Chat from "./pages/Chat";

// Translation resources
const resources = {
  en: {
    translation: {
      "Aiat system": "Diar system",
      home: "Home",
      test: "Test",
      login: "Login",
      language: "Language",
      english: "English",
      farsi: "Farsi",
      toggle_language: "Toggle Language",
      "Discovering a contradiction": "Discovering contradiction",
      "List of resolutions": "Resolutions list",
      login: 'login',
      welcome_to_diar: 'Welcome To Diar',
      username: 'Username',
      password :'Password',
      enter_your_username : 'Enter your username'
    },
  },
  fa: {
    translation: {
      "Aiat system": "سامانه دیار",
      home: "خانه",
      test: "تست",
      login: "ورود",
      language: "زبان",
      english: "انگلیسی",
      farsi: "فارسی",
      toggle_language: "تغییر زبان",
      "Discovering a contradiction": "کشف تناقض",
      "List of resolutions": "لیست مصوبه ها",
      login: 'ورود',
      welcome_to_diar : 'به سامانه دیار خوش آمدید',
      username: 'نام کاربری',
      password:'رمز عبور',
      enter_your_username : 'نام کاربری خود را وارد کنید'
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

function App() {
  
  const { t, i18n } = useTranslation();


  const loggedIn = useSelector((state) => state.todo.loggedIn);

  // Set document direction and language
  useEffect(() => {
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);
  };


  return (
    <div
      className={`min-h-screen w-full ${
        i18n.language === "fa" ? "text-right" : "text-left"
      }`}
    >
      <WebSocketProvider enabled={false}>
        <BrowserRouter>
          <div className="">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className={`fixed top-[26px] bg-blue-500 text-white px-2 py-1 rounded shadow-md cursor-pointer ${
                i18n.language === "fa" ? "left-22" : "right-22"
              }`}
              title={t("toggle_language")}
            >
              {i18n.language === "en" ? "FA" : "EN"}
            </button>
            <Routes>
              <Route path="/" element={<SignIn />} />
              {/* Protected Routes - ONLY show when logged in */}
              {loggedIn ? (
                <Route element={<LayoutMenu />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/test" element={<Test />} />
                  <Route
                    path="/discovering-contradiction"
                    element={<DiscoveringContradiction />}
                  />
                  <Route
                    path="/functions-history"
                    element={<FunctionsHistory />}
                  />
                  <Route
                    path="/chat"
                    element={<Chat />}
                  />
                  <Route
                    path="/resolutions-list"
                    element={<ResolutionsList />}
                  />
                  
                </Route>
                
              ) : (
                <Route path="*" element={<Navigate to="/" replace />} />
              )}
            </Routes>
          </div>
        </BrowserRouter>
      </WebSocketProvider>
    </div>
  );
}

export default App;
