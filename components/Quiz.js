import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { Audio } from "expo-av";

const Quiz = ({
  userLanguage,
  currentCategory,
  dictionaries,
  learnLanguages,
  currentLearnLanguage,
  screenWidth,
  score,
  onCurrentLearnLanguageChange,
  onChangeScore,
  onNextCategory,
}) => {
  const NUM_OPTIONS = 4;

  const [allWords, setAllWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [randomWord, setRandomWord] = useState("");
  const [options, setOptions] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showNextButton, setshowNextButton] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sound, setSound] = useState(true);

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const currentCategoryFontSize = screenWidth < 400 ? 18 : 20;
  const fontSize = screenWidth < 400 ? 15 : 18;
  const arrowFontSize = screenWidth < 400 ? 20 : 24;
  const arrowHeight = screenWidth < 400 ? 28 : 32;
  const paddingVertical = screenWidth < 400 ? 16 : 20;

  const soundObject = new Audio.Sound();

  const playSound = async (result) => {
    if (!sound) {
      return;
    }

    if (result == "right") {
      await soundObject.loadAsync(require("../assets/right-answer.wav"));
    } else {
      await soundObject.loadAsync(require("../assets/wrong-answer.wav"));
    }

    try {
      await soundObject.playAsync();
    } catch (_error) {}
  };

  useEffect(() => {
    setAllWords(Object.keys(dictionaries[userLanguage][currentCategory]));
    setAvailableWords(Object.keys(dictionaries[userLanguage][currentCategory]));
    setStartNewGame(true);
  }, [currentCategory]);

  useEffect(() => {
    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  const handleNavCategory = (direction) => {
    onNextCategory(direction);
    nextQuestion();
  };

  const handleSound = () => {
    setSound(!sound);
  };

  const handleCurrentLearnLanguage = (language) => {
    onCurrentLearnLanguageChange(language);
  };

  const getRandomWord = (wordsList) => {
    return wordsList[Math.floor(Math.random() * wordsList.length)];
  };

  const shuffle = (options) => {
    return (options = options.sort(() => 0.5 - Math.random()));
  };

  const getOptionStyle = (key) => {
    if (key === randomWord && checkAnswer) {
      return [
        styles.rightOption,
        { fontSize: fontSize, paddingVertical: paddingVertical },
      ];
    } else if (key !== randomWord && key === userAnswer && checkAnswer) {
      return [
        styles.wrongOption,
        { fontSize: fontSize, paddingVertical: paddingVertical },
      ];
    }

    return [
      styles.option,
      { fontSize: fontSize, paddingVertical: paddingVertical },
    ];
  };

  const matchUserAnswer = (answer) => {
    if (optionsDisabled) {
      return;
    }

    setOptionsDisabled(true);
    setUserAnswer(answer);
    setCheckAnswer(true);

    if (answer === randomWord) {
      playSound("right");
      onChangeScore();

      setTimeout(() => {
        setCheckAnswer(false);
        setStartNewGame(true);
        setOptionsDisabled(false);
      }, 1200);
    } else {
      playSound("wrong");
      setshowNextButton(true);
    }
  };

  const nextQuestion = () => {
    setCheckAnswer(false);
    setStartNewGame(true);
    setOptionsDisabled(false);
  };

  const setDirections = () => {
    return Math.random() < 0.5;
  };

  const newWordsSet = () => {
    const newWord = getRandomWord(availableWords);
    setRandomWord(newWord);

    setAvailableWords(availableWords.filter((word) => word !== newWord));

    if (availableWords.length === 1) {
      setAvailableWords(allWords);
    }

    let newOptions = [newWord];
    while (newOptions.length < NUM_OPTIONS) {
      const option = getRandomWord(allWords);
      if (option !== newWord && !newOptions.includes(option)) {
        newOptions.push(option);
      }
    }

    setOptions(shuffle(newOptions));
    setReversed(setDirections());
  };

  if (startNewGame) {
    setshowNextButton(false);
    setStartNewGame(false);
    newWordsSet();
  }

  return (
    <View>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {dictionaries[userLanguage].pages.names.quiz}
      </Text>

      <View style={styles.quizContainer}>
        <View style={styles.headerControlsBox}>
          <Text
            style={[
              styles.currentCategory,
              { fontSize: currentCategoryFontSize },
            ]}
          >
            {dictionaries[userLanguage].categories[currentCategory].name}
          </Text>

          {/* Category navigation  */}
          <TouchableOpacity
            style={[styles.categoryNav, { height: arrowHeight }]}
            onPress={() => handleNavCategory("prev")}
          >
            <FontAwesome5
              style={[styles.categoryNavButton, { fontSize: arrowFontSize }]}
              name={"angle-left"}
              solid
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.categoryNav, { height: arrowHeight }]}
            onPress={() => handleNavCategory("next")}
          >
            <FontAwesome5
              style={[styles.categoryNavButton, { fontSize: arrowFontSize }]}
              name={"angle-right"}
              solid
            />
          </TouchableOpacity>

          {/* Sound  */}
          <TouchableOpacity
            style={[
              sound ? styles.soundOn : styles.soundOff,
              { height: arrowHeight },
            ]}
            onPress={handleSound}
          >
            <FontAwesome5
              style={[styles.categoryNavButton, { fontSize: arrowFontSize }]}
              name={sound ? "volume-up" : "volume-mute"}
              solid
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerControlsBox}>
          {/* Score */}
          <Text style={[styles.score, { fontSize: fontSize }]}>
            Score: {score}
          </Text>

          {/* Learn language selectors */}
          {learnLanguages.length > 1 && (
            <View style={styles.languagesHeaderBox}>
              {learnLanguages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={styles.languageHeader}
                  onPress={() => handleCurrentLearnLanguage(language)}
                >
                  <Text
                    style={[
                      currentLearnLanguage === language
                        ? styles.languageHeaderText
                        : styles.languageHeaderTextDisabled,
                      { fontSize: fontSize },
                    ]}
                  >
                    {dictionaries[userLanguage].languages[language]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Quiz */}
        <View>
          <Text style={[styles.randomWord, { fontSize: fontSize }]}>
            {reversed
              ? dictionaries[currentLearnLanguage][currentCategory][randomWord]
              : dictionaries[userLanguage][currentCategory][randomWord]}
          </Text>

          <View>
            {options.map((key) => (
              <TouchableOpacity onPress={() => matchUserAnswer(key)} key={key}>
                <Text style={getOptionStyle(key)}>
                  {reversed
                    ? dictionaries[userLanguage][currentCategory][key]
                    : dictionaries[currentLearnLanguage][currentCategory][key]}
                </Text>
              </TouchableOpacity>
            ))}

            {showNextButton && (
              <TouchableOpacity onPress={nextQuestion}>
                <Text style={[styles.nextButton, { fontSize: fontSize }]}>
                  {dictionaries[userLanguage].pages.quiz.next}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    padding: 15,
  },
  title: {
    color: "#fdfdfd",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  headerControlsBox: {
    flexDirection: "row",
    marginBottom: 15,
  },
  currentCategory: {
    marginRight: 20,
    color: "#fdfdfd",
    paddingVertical: 2,
  },
  categoryNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f8987",
    paddingHorizontal: 18,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryNavButton: {
    color: "#fdfdfd",
  },
  soundOn: {
    marginLeft: "auto",
    paddingVertical: 2,
  },
  soundOff: {
    marginLeft: "auto",
    paddingVertical: 2,
    marginRight: 3.5,
    opacity: 0.2,
  },
  languagesHeaderBox: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  languageHeader: {
    paddingLeft: 10,
    marginTop: 10,
  },
  languageHeaderText: {
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  languageHeaderTextDisabled: {
    color: "#fefefe",
    backgroundColor: "#0f6f89",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    opacity: 0.2,
  },
  score: {
    color: "#0f8987",
    backgroundColor: "#323545",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginRight: "auto",
    marginTop: 10,
  },
  randomWord: {
    color: "#323545",
    backgroundColor: "#ececec",
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#323545",
    color: "#ececec",
    borderColor: "#292b38",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  rightOption: {
    backgroundColor: "#023220",
    color: "#ececec",
    borderColor: "#006c00",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  wrongOption: {
    backgroundColor: "#560707",
    color: "#ececec",
    borderColor: "#8d0a0a",
    borderStyle: "solid",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: "#0f6f89",
    color: "#ececec",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default Quiz;
