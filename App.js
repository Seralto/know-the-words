import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Categories from "./components/Categories";
import BottomBar from "./components/BottomBar";
import Flashcards from "./components/Flashcards";
import Settings from "./components/Settings";

const DEFAULT_PAGE = "settings";
const DEFAULT_CATEGORY = "body";
const DEFAULT_LANGUAGE = "en";

const dictionaries = {
  en: require("./data/en.json"),
  pt: require("./data/pt.json"),
  es: require("./data/es.json"),
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [category, setCurrentCategory] = useState(DEFAULT_CATEGORY);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [selectedLearnLanguages, setSelectedLearnLanguages] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage("flashcards");
  };

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setSelectedLearnLanguages([]);
  };

  const handleLearnLanguageChange = (languages) => {
    setSelectedLearnLanguages(languages);
  };

  return (
    <View style={styles.app}>
      <View style={styles.pages}>
        {currentPage === "categories" && (
          <Categories
            language={language}
            categories={dictionaries[language]["categories"]}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {currentPage === "flashcards" && (
          <Flashcards
            language={language}
            category={category}
            dictionaries={dictionaries}
            selectedLearnLanguages={selectedLearnLanguages}
          />
        )}

        {currentPage === "settings" && (
          <Settings
            language={language}
            dictionaries={dictionaries}
            selectedLearnLanguages={selectedLearnLanguages}
            onLanguageChange={handleLanguageChange}
            onLearnLanguageChange={handleLearnLanguageChange}
          />
        )}
      </View>

      <BottomBar
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
    backgroundColor: "#f7ead2",
  },
  pages: {
    flex: 1,
    marginTop: 20,
    marginBottom: 100,
  },
});
