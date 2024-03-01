import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";

const Settings = ({
  userLanguage,
  dictionaries,
  learnLanguages,
  onUserLanguageChange,
  onLearnLanguagesChange,
}) => {
  const languageOptions = dictionaries[userLanguage].languages;

  const handleLanguageChange = (language) => {
    onUserLanguageChange(language);
  };

  const handleLearnLanguagesChange = (language) => {
    const updatedLearnLanguages = learnLanguages.includes(language)
      ? learnLanguages.filter((item) => item !== language)
      : [...learnLanguages, language];
    onLearnLanguagesChange(updatedLearnLanguages);
  };

  const renderLanguageRadiobutton = (languageOption) => {
    return (
      <View key={languageOption} style={styles.option}>
        <RadioButton
          value={languageOption}
          status={userLanguage === languageOption ? "checked" : "unchecked"}
          onPress={() => handleLanguageChange(languageOption)}
          color={"#0f6f89"}
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
          onPress={() => handleLearnLanguagesChange(languageOption)}
          disabled={languageOption === userLanguage}
          color={"#0f6f89"}
        />
        <Text style={styles.optionText}>{languageOptions[languageOption]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[userLanguage].pages.settings.title}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {dictionaries[userLanguage].pages.settings.language}
        </Text>

        {Object.keys(languageOptions).map((languageOption) =>
          renderLanguageRadiobutton(languageOption)
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {dictionaries[userLanguage].pages.settings.learn}
        </Text>

        {Object.keys(languageOptions).map(
          (languageOption) =>
            languageOption !== userLanguage &&
            renderLanguageCheckbox(languageOption)
        )}

        {learnLanguages.length === 0 && (
          <Text style={styles.warning}>
            {dictionaries[userLanguage].pages.settings.warning}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    color: "#fefefe",
    marginTop: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#efefef",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
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
  warning: {
    marginTop: 8,
    fontSize: 16,
    color: "#f81717",
  },
});

export default Settings;
