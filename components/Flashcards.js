import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Speech from "expo-speech";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Flashcards = ({
  userLanguage,
  currentCategory,
  dictionaries,
  learnLanguages,
  currentLearnLanguage,
  onCurrentLearnLanguageChange,
  onNextCategory,
  screenWidth,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 14 : 16;
  const arrowFontSize = screenWidth < 400 ? 20 : 24;
  const arrowHeight = screenWidth < 400 ? 28 : 32;
  const rowMarginBottom = screenWidth < 400 ? 12 : 14;

  const UNSORTED_CATEGORIES = ["calendar", "pronouns", "numbers"];

  const speak = (text, userLanguage) => {
    if (!isButtonDisabled) {
      Speech.speak(text, {
        language: userLanguage,
      });

      setIsButtonDisabled(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 800);
    }
  };

  const sort = (obj) => {
    if (UNSORTED_CATEGORIES.includes(currentCategory)) {
      return obj;
    }

    const arr = Object.entries(obj);
    arr.sort((a, b) => a[1].localeCompare(b[1]));
    return arr.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const handleCurrentLearnLanguage = (language) => {
    onCurrentLearnLanguageChange(language);
  };

  const handleNavCategory = (direction) => {
    onNextCategory(direction);
  };

  const LANGUAGE_MAP = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
  };

  return (
    <View style={styles.page}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {dictionaries[userLanguage].categories[currentCategory].name}
      </Text>

      <View style={styles.headerControlsBox}>
        <TouchableOpacity
          style={[styles.categoryNav, { height: arrowHeight }]}
          onPress={() => handleNavCategory("prev")}
        >
          <FontAwesome5
            style={[styles.categoryNavButton, { fontSize: arrowFontSize }]}
            name={"angle-left"}
            solid
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryNav, { height: arrowHeight }]}
          onPress={() => handleNavCategory("next")}
        >
          <FontAwesome5
            style={[styles.categoryNavButton, { fontSize: arrowFontSize }]}
            name={"angle-right"}
            solid
          />
        </TouchableOpacity>

        {learnLanguages.length > 1 && (
          <View style={styles.languagesHeaderBox}>
            {learnLanguages.map((language) => (
              <TouchableOpacity
                key={language}
                style={styles.languageHeader}
                onPress={() => handleCurrentLearnLanguage(language)}
              >
                <Text
                  style={[
                    currentLearnLanguage === language
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled,
                    { fontSize: fontSize },
                  ]}
                >
                  {dictionaries[userLanguage].languages[language]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView>
        <View style={styles.flashcardsContainer}>
          {currentLearnLanguage &&
            Object.keys(sort(dictionaries[userLanguage][currentCategory])).map(
              (key) => (
                <View
                  style={[styles.row, { marginBottom: rowMarginBottom }]}
                  key={key}
                >
                  <Text style={[styles.word, { fontSize: fontSize }]}>
                    {dictionaries[userLanguage][currentCategory][key]}
                  </Text>

                  <TouchableOpacity
                    style={styles.button}
                    disabled={isButtonDisabled}
                    onPress={() =>
                      speak(
                        dictionaries[currentLearnLanguage][currentCategory][
                          key
                        ],
                        LANGUAGE_MAP[currentLearnLanguage]
                      )
                    }
                  >
                    <Text style={[styles.buttonText, { fontSize: fontSize }]}>
                      {dictionaries[currentLearnLanguage][currentCategory][key]}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 15,
  },
  title: {
    color: "#fefefe",
    marginTop: 10,
    paddingBottom: 10,
  },
  flashcardsContainer: {
    paddingBottom: 60,
  },
  headerControlsBox: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  languagesHeaderBox: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  categoryNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f8987",
    paddingHorizontal: 18,
    borderRadius: 5,
    marginRight: 8,
    height: 32,
  },
  categoryNavButton: {
    color: "#fefefe",
  },
  languageHeader: {
    paddingLeft: 10,
  },
  languageHeaderText: {
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  languageHeaderTextDisabled: {
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    opacity: 0.2,
  },
  row: {
    backgroundColor: "#ececec",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 2,
    color: "#555555",
  },
  button: {
    flexGrow: 1,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#0f6f89",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Flashcards;
