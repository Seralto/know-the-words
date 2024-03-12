import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";

const About = ({ userLanguage, dictionaries, screenWidth }) => {
  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 15 : 18;
  const iconSize = screenWidth < 400 ? 60 : 75;

  return (
    <View style={styles.about}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {dictionaries[userLanguage].pages.aboutMe.title}
      </Text>
      <Text style={[styles.content, { fontSize: fontSize }]}>
        {dictionaries[userLanguage].pages.aboutMe.content}
      </Text>

      <Text
        style={[styles.link, { fontSize: fontSize }]}
        onPress={() => {
          Linking.openURL(dictionaries[userLanguage].pages.aboutMe.linkedinUrl);
        }}
      >
        {dictionaries[userLanguage].pages.aboutMe.linkedin}
      </Text>

      <Text
        style={[styles.link, { fontSize: fontSize }]}
        onPress={() => {
          Linking.openURL(dictionaries[userLanguage].pages.aboutMe.githubUrl);
        }}
      >
        {dictionaries[userLanguage].pages.aboutMe.github}
      </Text>

      <Text
        style={[styles.link, { fontSize: fontSize }]}
        onPress={() => {
          Linking.openURL(dictionaries[userLanguage].pages.aboutMe.youtubeUrl);
        }}
      >
        {dictionaries[userLanguage].pages.aboutMe.youtube}
      </Text>

      <View style={styles.infoBox}>
        <Text
          style={[styles.info, { fontSize: fontSize }]}
          onPress={() => {
            Linking.openURL(dictionaries[userLanguage].pages.aboutMe.siteUrl);
          }}
        >
          {dictionaries[userLanguage].pages.aboutMe.site}
        </Text>

        <Text style={[styles.info, { fontSize: fontSize }]}>
          {dictionaries[userLanguage].pages.aboutMe.email}
        </Text>
      </View>

      <Text style={[styles.myApps, { fontSize: fontSize }]}>
        {dictionaries[userLanguage].pages.aboutMe.myApps}
      </Text>

      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            dictionaries[userLanguage].pages.aboutMe.playStoreUrl
          );
        }}
      >
        <Image
          source={require("../assets/play-store-icon.png")}
          style={[styles.playStoreImage, { width: iconSize, height: iconSize }]}
          alt="Play Store"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  about: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#fdfdfd",
    marginTop: 15,
    textAlign: "center",
  },
  content: {
    color: "#fdfdfd",
    marginTop: 20,
    marginBottom: 40,
  },
  link: {
    color: "#2196f3",
    marginBottom: 10,
  },
  infoBox: {
    marginVertical: 20,
  },
  info: {
    textAlign: "center",
    color: "#fdfdfd",
    marginBottom: 10,
  },
  myApps: {
    color: "#fdfdfd",
    marginBottom: 20,
    textAlign: "center",
  },
  playStoreImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export default About;
