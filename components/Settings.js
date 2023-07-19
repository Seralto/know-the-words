import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";

const Settings = ({
  language,
  dictionaries,
  learnLanguages,
  onLanguageChange,
  onLearnLanguageChange,
}) => {
  const languageOptions = dictionaries[language].languages;

  const handleLanguageChange = (language) => {
    onLanguageChange(language);
  };

  const handleLearnLanguageChange = (language) => {
    const updatedLearnLanguages = learnLanguages.includes(language)
      ? learnLanguages.filter((item) => item !== language)
      : [...learnLanguages, language];
    onLearnLanguageChange(updatedLearnLanguages);
  };

  const renderLanguageRadiobutton = (languageOption) => {
    return (
      <View key={languageOption} style={styles.option}>
        <RadioButton
          value={languageOption}
          status={language === languageOption ? "checked" : "unchecked"}
          onPress={() => handleLanguageChange(languageOption)}
        />
        <Text style={styles.optionText}>{languageOptions[languageOption]}</Text>
      </View>
    );
  };

  const renderLanguageCheckbox = (languageOption) => {
    return (
      <View key={languageOption} style={styles.option}>
        <Checkbox
          status={
            learnLanguages.includes(languageOption) ? "checked" : "unchecked"
          }
          onPress={() => handleLearnLanguageChange(languageOption)}
          disabled={languageOption === language}
        />
        <Text style={styles.optionText}>{languageOptions[languageOption]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {dictionaries[language].pages.settings.title}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {dictionaries[language].pages.settings.language}
        </Text>

        {Object.keys(languageOptions).map((languageOption) =>
          renderLanguageRadiobutton(languageOption)
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {dictionaries[language].pages.settings.learn}
        </Text>

        {Object.keys(languageOptions).map(
          (languageOption) =>
            languageOption !== language &&
            renderLanguageCheckbox(languageOption)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#555",
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#efefef",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555555",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
  },
});

export default Settings;
