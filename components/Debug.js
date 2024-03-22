import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import * as Speech from "expo-speech";

const Debug = () => {
  const speak = (text, language) => {
    Speech.speak(text, {
      language: language,
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello, World! I am speaking in English. Think twice.
        </Text>
        <Button
          title="English"
          onPress={() =>
            speak(
              "Hello, World! I am speaking in English. Think twice.",
              "en-US"
            )
          }
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>
          Olá Mundo!, Estou falando em Português. Arroz com feijão.
        </Text>
        <Button
          title="Portuguese"
          onPress={() =>
            speak(
              "Olá Mundo!, Estou falando em Português. Arroz com feijão.",
              "pt-BR"
            )
          }
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>
          ¡Hola Mundo! Estoy hablando en Espanhol. Llamar de nuevo.
        </Text>
        <Button
          title="Spanish"
          onPress={() =>
            speak(
              "¡Hola Mundo! Estoy hablando en Espanhol. Llamar de nuevo.",
              "es-ES"
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#fdfdfd",
  },
});

export default Debug;
