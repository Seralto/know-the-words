import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const BottomMenu = ({
  userLanguage,
  dictionaries,
  onPageChange,
  currentPage,
  screenWidth,
  onShowModal,
}) => {
  const fontSize = screenWidth < 400 ? 14 : 16;
  const padding = screenWidth < 400 ? 5 : 10;

  const MENU_OPTIONS = ["settings", "about", "my_apps"];

  return (
    <View style={[styles.bottomMenu, { paddingVertical: padding }]}>
      <TouchableOpacity onPress={() => onPageChange("categories")}>
        <Text
          style={[
            currentPage === "categories"
              ? styles.currentOptionText
              : styles.optionText,
            { fontSize: fontSize },
          ]}
        >
          {dictionaries[userLanguage].pages.names.categories}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("flashcards")}>
        <Text
          style={[
            currentPage === "flashcards"
              ? styles.currentOptionText
              : styles.optionText,
            { fontSize: fontSize },
          ]}
        >
          {dictionaries[userLanguage].pages.names.flashcards}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPageChange("quiz")}>
        <Text
          style={[
            currentPage === "quiz"
              ? styles.currentOptionText
              : styles.optionText,
            { fontSize: fontSize },
          ]}
        >
          {dictionaries[userLanguage].pages.names.quiz}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onShowModal()}>
        <Text
          style={[
            [
              MENU_OPTIONS.includes(currentPage)
                ? styles.currentOptionText
                : styles.optionText,
              { fontSize: fontSize },
            ],
            { fontSize: fontSize },
          ]}
        >
          {dictionaries[userLanguage].pages.names.menu}
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
  },
  optionText: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontWeight: "bold",
    color: "#333333",
  },
  currentOptionText: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontWeight: "bold",
    color: "#efefef",
    backgroundColor: "#425c70",
    borderRadius: 10,
  },
});

export default BottomMenu;
