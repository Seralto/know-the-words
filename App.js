import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Categories from "./components/Categories";
import BottomMenu from "./components/BottomMenu";
import Flashcards from "./components/Flashcards";
import Settings from "./components/Settings";

const SETTINGS_PAGE = "settings";
const FLASHCARDS_PAGE = "flashcards";
const DEFAULT_PAGE = "categories";
const DEFAULT_CATEGORY = "adjectives";
const DEFAULT_LANGUAGE = "en";

const dictionaries = {
  en: require("./data/en.json"),
  pt: require("./data/pt.json"),
  es: require("./data/es.json"),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [userLanguage, setUserLanguage] = useState(DEFAULT_LANGUAGE);
  const [learnLanguages, setLearnLanguages] = useState([]);
  const [currentLearnLanguage, setCurrentLearnLanguage] = useState("");

  const loadDefaultData = () => {
    setUserLanguage(DEFAULT_LANGUAGE);
    setLearnLanguages(["pt", "es"]);
    setCurrentLearnLanguage("pt");
  };

  const fetchData = async () => {
    try {
      const keys = [
        "@KnowTheWords:userLanguage",
        "@KnowTheWords:learnLanguages",
        "@KnowTheWords:currentLearnLanguage",
      ];

      const dataPromises = keys.map((key) => AsyncStorage.getItem(key));
      const results = await Promise.all(dataPromises);

      const userLanguage = results[0];
      const learnLanguages = results[1];
      const currentLearnLanguage = results[2];

      setUserLanguage(userLanguage || DEFAULT_LANGUAGE);

      if (learnLanguages === null) {
        setCurrentPage(SETTINGS_PAGE);
      } else {
        setLearnLanguages(learnLanguages.split(","));
      }

      if (currentLearnLanguage === null && learnLanguages !== null) {
        setCurrentLearnLanguage(learnLanguages.split(",")[0]);
      } else {
        setCurrentLearnLanguage(currentLearnLanguage);
      }
    } catch (error) {
      loadDefaultData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  const resetLearningLanguages = () => {
    AsyncStorage.setItem("@KnowTheWords:learnLanguages", "");
    AsyncStorage.setItem("@KnowTheWords:currentLearnLanguage", "");
    setLearnLanguages([]);
    setCurrentLearnLanguage("");
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

  const handleUserLanguageChange = (language) => {
    AsyncStorage.setItem("@KnowTheWords:userLanguage", language);
    setUserLanguage(language);
    resetLearningLanguages();
  };

  const handleLearnLanguagesChange = (learnLanguages) => {
    AsyncStorage.setItem(
      "@KnowTheWords:learnLanguages",
      learnLanguages.toString()
    );
    setLearnLanguages(learnLanguages);

    // Note: If the user removed the current learn language from the list,
    //       set the other as current language
    if (!learnLanguages.includes(currentLearnLanguage)) {
      setCurrentLearnLanguage(learnLanguages[0]);
    }
  };

  const handleCurrentLearnLanguageChange = (currentLearnLanguage) => {
    AsyncStorage.setItem(
      "@KnowTheWords:currentLearnLanguage",
      currentLearnLanguage
    );
    setCurrentLearnLanguage(currentLearnLanguage);
  };

  return (
    <View style={styles.app}>
      <View style={styles.pages}>
        {currentPage === "categories" && (
          <Categories
            userLanguage={userLanguage}
            categories={dictionaries[userLanguage]["categories"]}
            dictionaries={dictionaries}
            onCategoryChange={handleCategoryChange}
            currentCategory={category}
          />
        )}

        {currentPage === "flashcards" && (
          <Flashcards
            userLanguage={userLanguage}
            category={category}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            currentLearnLanguage={currentLearnLanguage}
            onCurrentLearnLanguageChange={handleCurrentLearnLanguageChange}
          />
        )}

        {currentPage === "settings" && (
          <Settings
            userLanguage={userLanguage}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            onUserLanguageChange={handleUserLanguageChange}
            onLearnLanguagesChange={handleLearnLanguagesChange}
          />
        )}
      </View>

      <BottomMenu
        userLanguage={userLanguage}
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
