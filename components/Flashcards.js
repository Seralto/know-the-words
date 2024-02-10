import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import * as Speech from "expo-speech";

const Flashcards = ({ language, category, dictionaries, learnLanguages }) => {
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

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[language].categories[category].name}
      </Text>

      <ScrollView>
        <View style={styles.languagesHeaderBox}>
          <Text style={styles.word}>&nbsp;</Text>

          {learnLanguages.includes("pt") && (
            <Text style={styles.languageHeader}>
              {dictionaries[language].languages.pt}
            </Text>
          )}

          {learnLanguages.includes("en") && (
            <Text style={styles.languageHeader}>
              {dictionaries[language].languages.en}
            </Text>
          )}

          {learnLanguages.includes("es") && (
            <Text style={styles.languageHeader}>
              {dictionaries[language].languages.es}
            </Text>
          )}
        </View>
        {Object.keys(sort(dictionaries[language][category])).map((key) => (
          <View style={styles.row} key={key}>
            <Text style={styles.word}>
              {dictionaries[language][category][key]}
            </Text>

            {learnLanguages.includes("pt") && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => speak(dictionaries.pt[category][key], "pt-BR")}
              >
                <Text style={styles.buttonText}>
                  {dictionaries.pt[category][key]}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("en") && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => speak(dictionaries.en[category][key], "en-US")}
              >
                <Text style={styles.buttonText}>
                  {dictionaries.en[category][key]}
                </Text>
              </TouchableOpacity>
            )}

            {learnLanguages.includes("es") && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => speak(dictionaries.es[category][key], "es-ES")}
              >
                <Text style={styles.buttonText}>
                  {dictionaries.es[category][key]}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
  },
  languagesHeaderBox: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  languageHeader: {
    flex: 1,
    fontSize: 18,
    color: "#fefefe",
    textAlign: "center",
  },
  row: {
    flex: 1,
    backgroundColor: "#ececec",
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  word: {
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#555555",
    width: 110,
    flexShrink: 0,
    flexGrow: 0,
  },
  button: {
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
