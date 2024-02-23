import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const BottomMenu = ({
  userLanguage,
  dictionaries,
  onPageChange,
  currentPage,
}) => {
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity onPress={() => onPageChange("categories")}>
        <Text
          style={
            currentPage === "categories"
              ? styles.currentOptionText
              : styles.optionText
          }
        >
          {dictionaries[userLanguage].pages.names.categories}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("flashcards")}>
        <Text
          style={
            currentPage === "flashcards"
              ? styles.currentOptionText
              : styles.optionText
          }
        >
          {dictionaries[userLanguage].pages.names.flashcards}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("settings")}>
        <Text
          style={
            currentPage === "settings"
              ? styles.currentOptionText
              : styles.optionText
          }
        >
          {dictionaries[userLanguage].pages.names.settings}
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
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  currentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f6f89",
  },
});

export default BottomMenu;
