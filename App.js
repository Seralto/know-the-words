import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Speech from "expo-speech";

const en = require("./data/en.json");
const pt = require("./data/pt.json");
const es = require("./data/es.json");

// const dictionaries = {
//   en: require("./data/en.json"),
//   pt: require("./data/pt.json"),
//   en: require("./data/en.json"),
// };

export default function App() {
  useEffect(() => {
    console.log(pt["body"]["arm"]);
  }, []);

  const speak = (text, language) => {
    Speech.speak(text, {
      // language: 'en-US',
      // language: 'pt-BR',
      // language: "es-ES",
      language: language,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body</Text>
      <ScrollView>
        {Object.keys(en["body"]).map((key) => (
          <View style={styles.row} key={key}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => speak(pt["body"][key], "pt-BR")}
            >
              <Text style={styles.buttonText}>{pt["body"][key]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => speak(en["body"][key], "en-US")}
            >
              <Text style={styles.buttonText}>{en["body"][key]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => speak(es["body"][key], "es-ES")}
            >
              <Text style={styles.buttonText}>{es["body"][key]}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    color: "#c3c3c3",
    marginTop: 40,
    marginBottom: 20,
  },
  row: {
    backgroundColor: "#c3c3c3",
    padding: 10,
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#0f5389",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
