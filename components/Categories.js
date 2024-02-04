import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

// https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/FontAwesome5Free.json
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CategoriesPage = ({
  language,
  dictionaries,
  categories,
  onCategoryChange,
}) => {
  const handleCategoryPress = (category) => {
    onCategoryChange(category);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[language].pages.names.categories}
      </Text>

      <ScrollView>
        <View style={styles.categoriesContainer}>
          {Object.keys(categories).map((category, index) => (
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

              <Text style={styles.categoryTitle}>
                {categories[category].name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 26,
    color: "#fefefe",
    marginTop: 40,
    marginBottom: 20,
  },
  categoriesContainer: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  categoryTile: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0f8987",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CategoriesPage;
