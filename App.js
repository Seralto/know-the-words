import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Categories from "./components/Categories";
import BottomMenu from "./components/BottomMenu";
import Flashcards from "./components/Flashcards";
import Settings from "./components/Settings";

const SETTINGS_PAGE = "settings";
const FLASHCARDS_PAGE = "flashcards";
const DEFAULT_PAGE = "categories";
const DEFAULT_CATEGORY = "body";
const DEFAULT_LANGUAGE = "en";

const dictionaries = {
  en: require("./data/en.json"),
  pt: require("./data/pt.json"),
  es: require("./data/es.json"),
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [learnLanguages, setLearnLanguages] = useState([]);
  const [currentLearnLanguage, setCurrentLearnLanguage] = useState("");

  useEffect(() => {
    getDefaultLanguage();
    getLearnLanguages();
    getCurrentLearnLanguage();
  }, []);

  const getDefaultLanguage = () => {
    AsyncStorage.getItem("defaultLanguage").then((language) => {
      setLanguage(language || DEFAULT_LANGUAGE);
    });
  };

  const getLearnLanguages = () => {
    AsyncStorage.getItem("learnLanguages").then((storedLanguages) => {
      const langList =
        storedLanguages !== null ? storedLanguages.split(",") : [];
      setLearnLanguages(langList);
      getStartPage(langList);
    });
  };

  const getCurrentLearnLanguage = () => {
    AsyncStorage.getItem("currentLearnLanguage").then((language) => {
      if (language) {
        setCurrentLearnLanguage(language || DEFAULT_CURRENT_LEARN_LANGUAGE);
      } else {
        setCurrentPage(SETTINGS_PAGE);
      }
    });
  };

  const getStartPage = (langList) => {
    const page = langList.length === 0 ? SETTINGS_PAGE : DEFAULT_PAGE;
    setCurrentPage(page);
  };

  const handlePageChange = (page) => {
    if (learnLanguages.length === 0) {
      setCurrentPage(SETTINGS_PAGE);
    } else {
      setCurrentPage(page);
    }
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(FLASHCARDS_PAGE);
  };

  const handleLanguageChange = (language) => {
    AsyncStorage.setItem("defaultLanguage", language);
    setLanguage(language);
    setLearnLanguages([]);
  };

  const handleLearnLanguagesChange = (learnLanguages) => {
    AsyncStorage.setItem("learnLanguages", learnLanguages.toString());
    setLearnLanguages(learnLanguages);

    // Note: If the user removed the current learn language from the list, set the other as current language
    if (!learnLanguages.includes(currentLearnLanguage)) {
      setCurrentLearnLanguage(learnLanguages[0]);
    }
  };

  const handleCurrentLearnLanguageChange = (currentLearnLanguage) => {
    AsyncStorage.setItem(
      "currentLearnLanguage",
      currentLearnLanguage.toString()
    );
    setCurrentLearnLanguage(currentLearnLanguage);
  };

  return (
    <View style={styles.app}>
      <View style={styles.pages}>
        {currentPage === "categories" && (
          <Categories
            language={language}
            categories={dictionaries[language]["categories"]}
            dictionaries={dictionaries}
            onCategoryChange={handleCategoryChange}
            currentCategory={category}
          />
        )}

        {currentPage === "flashcards" && (
          <Flashcards
            language={language}
            category={category}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            currentLearnLanguage={currentLearnLanguage}
            onCurrentLearnLanguageChange={handleCurrentLearnLanguageChange}
          />
        )}

        {currentPage === "settings" && (
          <Settings
            language={language}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            onLanguageChange={handleLanguageChange}
            onLearnLanguagesChange={handleLearnLanguagesChange}
          />
        )}
      </View>

      <BottomMenu
        language={language}
        dictionaries={dictionaries}
        onPageChange={handlePageChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#334756",
  },
  pages: {
    flex: 1,
    marginTop: 20,
    marginBottom: 76,
  },
});
