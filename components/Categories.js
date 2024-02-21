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
  userLanguage,
  dictionaries,
  categories,
  currentCategory,
  onCategoryChange,
}) => {
  const handleCategoryPress = (category) => {
    onCategoryChange(category);
  };

  const sort = (categories) => {
    return Object.fromEntries(
      Object.entries(categories).sort(([aKey, aValue], [bKey, bValue]) =>
        aValue.name.localeCompare(bValue.name)
      )
    );
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[userLanguage].pages.names.categories}
      </Text>

      <ScrollView>
        <View style={styles.categoriesContainer}>
          {Object.keys(sort(categories)).map((category, index) => (
            <TouchableOpacity
              key={index}
              style={
                currentCategory === category
                  ? styles.currentCategoryTile
                  : styles.categoryTile
              }
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
    fontSize: 24,
    color: "#fefefe",
    marginTop: 40,
    paddingBottom: 10,
  },
  categoriesContainer: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 30,
  },
  categoryTile: {
    width: 110,
    height: 120,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0f8987",
  },
  currentCategoryTile: {
    width: 110,
    height: 120,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#16bebb",
    borderColor: "#fff",
    borderWidth: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CategoriesPage;
