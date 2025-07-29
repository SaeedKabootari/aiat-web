
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

// Translation resources
const resources = {
  en: {
    translation: {
      "Aiat system": "AiAt system",
      "home": "Home",
      "test": "Test",
      "login": "Login",
      "language": "Language",
      "english": "English",
      "farsi": "Farsi",
      "toggle_language": "Toggle Language",
      "Discovering a contradiction": "Discovering contradiction",
      "List of resolutions": "Resolutions list",
    }
  },
  fa: {
    translation: {
      "Aiat system": "سامانه آیت",
      "home": "خانه",
      "test": "تست",
      "login": "ورود",
      "language": "زبان",
      "english": "انگلیسی",
      "farsi": "فارسی",
      "toggle_language": "تغییر زبان",
      "Discovering a contradiction": "کشف تناقض",
      "List of resolutions": "لیست مصوبه ها",
    }
  }
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
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

function App() {
  const { t, i18n } = useTranslation();

  // Set document direction and language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={`min-h-screen w-full ${i18n.language === 'fa' ? 'font-vazir text-right' : 'text-left'}`}>
      <BrowserRouter>
        <div className="">
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            className={`fixed top-4  bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md ${i18n.language === 'fa' ? 'left-4' : 'right-4'}`}
            title={t('toggle_language')}
          >
            {i18n.language === 'en' ? 'FA' : 'EN'}
          </button>

          {/* <h1 className="text-4xl font-bold mb-6">{t('Aiat system')}</h1> */}
          
          <Routes>
            <Route path="/" element={<SignIn />} />
            {/* <Route element={false? <LayoutMenu /> : <Navigate to='dsds' />}> */}

            <Route element={<LayoutMenu />}>
              <Route path="/home" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/resolutions-list" element={<ResolutionsList />} />
              <Route path="/discovering-contradiction" element={<DiscoveringContradiction />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;






