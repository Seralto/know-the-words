import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";

const OptionsModal = ({
  userLanguage,
  dictionaries,
  modalVisibility,
  onShowModal,
  onPageChange,
  screenWidth,
}) => {
  const fontSize = screenWidth < 400 ? 14 : 16;
  const margin = screenWidth < 400 ? 8 : 10;

  return (
    <Modal visible={modalVisibility} animationType="slide">
      <View style={styles.optionsModalContainer}>
        <TouchableOpacity onPress={() => onPageChange("settings")}>
          <Text
            style={[
              styles.menuButton,
              { fontSize: fontSize, marginVertical: margin },
            ]}
          >
            {dictionaries[userLanguage].pages.names.settings.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPageChange("about")}>
          <Text
            style={[
              styles.menuButton,
              { fontSize: fontSize, marginVertical: margin },
            ]}
          >
            {dictionaries[userLanguage].pages.menu.about.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onShowModal()}>
          <Text
            style={[
              styles.menuButton,
              { fontSize: fontSize, marginVertical: margin },
            ]}
          >
            {dictionaries[userLanguage].pages.menu.back.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.menuDebug,
            { fontSize: fontSize, marginVertical: margin },
          ]}
          onPress={() => onPageChange("debug")}
        >
          v 1.9.0
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionsModalContainer: {
    flex: 1,
    backgroundColor: "#334756",
    justifyContent: "center",
  },
  menuButton: {
    backgroundColor: "#0f6f89",
    textAlign: "center",
    color: "#fdfdfd",
    paddingVertical: 10,
    marginHorizontal: 50,
    borderRadius: 5,
    borderColor: "#d9d9d9",
    borderWidth: 2,
  },
  menuDebug: {
    textAlign: "center",
    color: "#fdfdfd",
    paddingVertical: 10,
    marginHorizontal: 50,
  },
});

export default OptionsModal;
