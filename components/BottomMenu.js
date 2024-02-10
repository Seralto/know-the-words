import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const BottomMenu = ({ language, dictionaries, onPageChange }) => {
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity onPress={() => onPageChange("categories")}>
        <Text style={styles.optionText}>
          {dictionaries[language].pages.names.categories}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("flashcards")}>
        <Text style={styles.optionText}>
          {dictionaries[language].pages.names.flashcards}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("settings")}>
        <Text style={styles.optionText}>
          {dictionaries[language].pages.names.settings}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    backgroundColor: "#ececec",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default BottomMenu;
