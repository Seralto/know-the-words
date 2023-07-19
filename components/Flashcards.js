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
        {dictionaries[language].categories[category]}
      </Text>

      <ScrollView>
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
    color: "#555555",
    marginTop: 40,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    backgroundColor: "#c3c3c3",
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 5,
  },
  word: {
    padding: 10,
    fontSize: 15,
    color: "#555555",
    width: 110,
    flexShrink: 0,
    flexGrow: 0,
  },
  button: {
    flex: 1,
    backgroundColor: "#0f5389",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});

export default Flashcards;
