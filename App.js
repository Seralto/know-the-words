import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
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
  const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY);
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
        "@KnowTheWords:currentCategory",
      ];

      const dataPromises = keys.map((key) => AsyncStorage.getItem(key));
      const results = await Promise.all(dataPromises);

      const userLanguage = results[0];
      const learnLanguages = results[1];
      const currentLearnLanguage = results[2];
      const currentCategory = results[3];

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

      setCurrentCategory(currentCategory || DEFAULT_CATEGORY);
    } catch (error) {
      loadDefaultData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <Image
          source={require("./assets/splash.png")}
          style={styles.splashImage}
        />
      </View>
    );
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
    AsyncStorage.setItem("@KnowTheWords:currentCategory", category);
    setCurrentCategory(category);
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

  const sortedCategories = Object.fromEntries(
    Object.entries(dictionaries[userLanguage]["categories"]).sort(
      ([keyA, { name: nameA }], [keyB, { name: nameB }]) =>
        nameA.localeCompare(nameB)
    )
  );

  const handleNavCategory = (direction) => {
    const categories = Object.keys(sortedCategories);
    const currentIndex = categories.indexOf(currentCategory);

    let nextIndex;
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (direction === "prev") {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    }

    const nextCategory = categories[nextIndex];

    AsyncStorage.setItem("@KnowTheWords:currentCategory", nextCategory);
    setCurrentCategory(nextCategory);
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
            currentCategory={currentCategory}
          />
        )}

        {currentPage === "flashcards" && (
          <Flashcards
            userLanguage={userLanguage}
            currentCategory={currentCategory}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            currentLearnLanguage={currentLearnLanguage}
            onCurrentLearnLanguageChange={handleCurrentLearnLanguageChange}
            onNextCategory={(direction) => handleNavCategory(direction)}
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
        currentPage={currentPage}
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
    marginBottom: 70,
  },
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#334756",
  },
  splashImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
