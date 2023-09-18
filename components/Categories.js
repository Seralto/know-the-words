import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/FontAwesome5Free.json
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CategoriesPage = ({ language, categories, onCategoryChange }) => {
  const handleCategoryPress = (category) => {
    onCategoryChange(category);
  };

  const renderCategoryTiles = () => {
    return Object.keys(categories).map((category, index) => (
      <TouchableOpacity
        key={index}
        style={styles.categoryTile}
        onPress={() => handleCategoryPress(category)}
      >
        <FontAwesome5
          name={categories[category].icon}
          size={30}
          color="white"
          solid
        />

        <Text style={styles.categoryTitle}>{categories[category].name}</Text>
      </TouchableOpacity>
    ));
  };

  return <View style={styles.container}>{renderCategoryTiles()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryTile: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#6c5b7b",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CategoriesPage;
