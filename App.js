import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Categories from "./components/Categories";
import BottomMenu from "./components/BottomMenu";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";
import Settings from "./components/Settings";
import OptionsModal from "./components/OptionsModal";
import About from "./components/About";
import Debug from "./components/Debug";

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
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentCategory, setCurrentCategory] = useState(DEFAULT_CATEGORY);
  const [userLanguage, setUserLanguage] = useState(DEFAULT_LANGUAGE);
  const [learnLanguages, setLearnLanguages] = useState([]);
  const [currentLearnLanguage, setCurrentLearnLanguage] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  const screenWidth = Dimensions.get("window").width;

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
        "@KnowTheWords:score",
      ];

      const dataPromises = keys.map((key) => AsyncStorage.getItem(key));
      const results = await Promise.all(dataPromises);

      const userLanguage = results[0];
      const learnLanguages = results[1];
      const currentLearnLanguage = results[2];
      const currentCategory = results[3];
      const score = results[4];

      // User language
      setUserLanguage(userLanguage || DEFAULT_LANGUAGE);

      // Learn languages
      if (learnLanguages === null) {
        setCurrentPage(SETTINGS_PAGE);
      } else {
        setLearnLanguages(learnLanguages.split(","));
      }

      // Current learn language
      if (currentLearnLanguage === null && learnLanguages !== null) {
        setCurrentLearnLanguage(learnLanguages.split(",")[0]);
      } else {
        setCurrentLearnLanguage(currentLearnLanguage);
      }

      // Current category
      setCurrentCategory(currentCategory || DEFAULT_CATEGORY);

      // Score
      setScore(parseInt(score) || 0);
    } catch (error) {
      loadDefaultData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
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
    setModalVisibility(false);

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

  const handleShowModal = () => {
    setModalVisibility(!modalVisibility);
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
      ([_keyA, { name: nameA }], [_keyB, { name: nameB }]) =>
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

  const handleChangeScore = () => {
    const newScore = parseInt(score) + 10;
    setScore(newScore);
    AsyncStorage.setItem("@KnowTheWords:score", newScore.toString());
  };

  return (
    <View style={styles.app}>
      <View style={styles.pages}>
        {currentPage === "categories" && (
          <Categories
            userLanguage={userLanguage}
            categories={dictionaries[userLanguage]["categories"]}
            dictionaries={dictionaries}
            currentCategory={currentCategory}
            screenWidth={screenWidth}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {currentPage === "flashcards" && (
          <Flashcards
            userLanguage={userLanguage}
            currentCategory={currentCategory}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            currentLearnLanguage={currentLearnLanguage}
            screenWidth={screenWidth}
            onCurrentLearnLanguageChange={handleCurrentLearnLanguageChange}
            onNextCategory={(direction) => handleNavCategory(direction)}
          />
        )}

        {currentPage === "quiz" && (
          <Quiz
            userLanguage={userLanguage}
            currentCategory={currentCategory}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            currentLearnLanguage={currentLearnLanguage}
            screenWidth={screenWidth}
            score={score}
            onChangeScore={handleChangeScore}
            onCurrentLearnLanguageChange={handleCurrentLearnLanguageChange}
            onNextCategory={(direction) => handleNavCategory(direction)}
          />
        )}

        {currentPage === "settings" && (
          <Settings
            userLanguage={userLanguage}
            dictionaries={dictionaries}
            learnLanguages={learnLanguages}
            screenWidth={screenWidth}
            onUserLanguageChange={handleUserLanguageChange}
            onLearnLanguagesChange={handleLearnLanguagesChange}
          />
        )}

        {currentPage === "about" && (
          <About
            userLanguage={userLanguage}
            dictionaries={dictionaries}
            screenWidth={screenWidth}
          />
        )}

        {currentPage === "debug" && <Debug />}
      </View>

      <OptionsModal
        userLanguage={userLanguage}
        dictionaries={dictionaries}
        modalVisibility={modalVisibility}
        screenWidth={screenWidth}
        onShowModal={handleShowModal}
        onPageChange={handlePageChange}
      />

      <BottomMenu
        userLanguage={userLanguage}
        dictionaries={dictionaries}
        currentPage={currentPage}
        screenWidth={screenWidth}
        onPageChange={handlePageChange}
        onShowModal={handleShowModal}
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
    marginBottom: 40,
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
