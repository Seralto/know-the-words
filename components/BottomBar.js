import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const BottomBar = ({ language, dictionaries, onPageChange }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => onPageChange("categories")}
      >
        <Text style={styles.optionText}>
          {dictionaries[language].pages.bottomBar.categories}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => onPageChange("flashcards")}
      >
        <Text style={styles.optionText}>
          {dictionaries[language].pages.bottomBar.flashcards}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => onPageChange("settings")}
      >
        <Text style={styles.optionText}>
          {dictionaries[language].pages.bottomBar.settings}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#ececec",
    justifyContent: "space-around",
    alignItems: "center",
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default BottomBar;
