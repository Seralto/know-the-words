import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Speech from "expo-speech";

const Flashcards = ({ language, category, dictionaries, learnLanguages }) => {
  const [currentLearnLanguage, setCurrentLearnLanguage] = useState("");

  console.log(currentLearnLanguage);

  useEffect(() => {
    setCurrentLearnLanguage(learnLanguages[0]);
  }, []);

  const speak = (text, language) => {
    Speech.speak(text, {
      language: language,
    });
  };

  const sort = (obj) => {
    // Don't sort the calendar category, it's grouped by topic
    if (category === "calendar") {
      return obj;
    }

    const arr = Object.entries(obj);
    arr.sort((a, b) => a[1].localeCompare(b[1]));
    return arr.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const changeLearnLanguage = (language) => {
    setCurrentLearnLanguage(language);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[language].categories[category].name}
      </Text>

      <ScrollView>
        {learnLanguages.length > 1 && (
          <View style={styles.languagesHeaderBox}>
            {learnLanguages.includes("pt") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => changeLearnLanguage("pt")}
              >
                <Text
                  style={
                    currentLearnLanguage === "pt"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[language].languages.pt}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("en") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => changeLearnLanguage("en")}
              >
                <Text
                  style={
                    currentLearnLanguage === "en"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[language].languages.en}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("es") && (
              <TouchableOpacity
                style={styles.languageHeader}
                onPress={() => changeLearnLanguage("es")}
              >
                <Text
                  style={
                    currentLearnLanguage === "es"
                      ? styles.languageHeaderText
                      : styles.languageHeaderTextDisabled
                  }
                >
                  {dictionaries[language].languages.es}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {currentLearnLanguage && (
          <View style={styles.words}>
            {Object.keys(sort(dictionaries[language][category])).map((key) => (
              <View style={styles.row} key={key}>
                <Text style={styles.word}>
                  {dictionaries[language][category][key]}
                </Text>

                {currentLearnLanguage === "pt" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      speak(dictionaries.pt[category][key], "pt-BR")
                    }
                  >
                    <Text style={styles.buttonText}>
                      {dictionaries.pt[category][key]}
                    </Text>
                  </TouchableOpacity>
                )}

                {currentLearnLanguage === "en" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      speak(dictionaries.en[category][key], "en-US")
                    }
                  >
                    <Text style={styles.buttonText}>
                      {dictionaries.en[category][key]}
                    </Text>
                  </TouchableOpacity>
                )}

                {currentLearnLanguage === "es" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      speak(dictionaries.es[category][key], "es-ES")
                    }
                  >
                    <Text style={styles.buttonText}>
                      {dictionaries.es[category][key]}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 26,
    color: "#fefefe",
    marginTop: 40,
    paddingBottom: 10,
  },
  languagesHeaderBox: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  languageHeader: {
    paddingLeft: 10,
  },
  languageHeaderText: {
    fontSize: 16,
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  languageHeaderTextDisabled: {
    fontSize: 16,
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    opacity: 0.2,
  },
  words: {
    marginTop: 10,
  },
  row: {
    backgroundColor: "#ececec",
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  word: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#555555",
  },
  button: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    backgroundColor: "#0f6f89",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Flashcards;
