import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
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
  const scrollViewRef = useRef();
  const targetViewRef = useRef();

  useEffect(() => {
    scrollToElement();
  }, []);

  const scrollToElement = () => {
    if (targetViewRef.current) {
      targetViewRef.current.measure((_x, _y, _width, height, _pageX, pageY) => {
        const screenHeight = Dimensions.get("window").height;
        const scrollY = pageY + height / 2 - screenHeight / 2;

        scrollViewRef.current.scrollTo({
          y: Math.max(0, scrollY),
          animated: true,
        });
      });
    }
  };

  const handleCategoryPress = (category) => {
    onCategoryChange(category);
  };

  const sort = (categories) => {
    return Object.fromEntries(
      Object.entries(categories).sort(([_aKey, aValue], [_bKey, bValue]) =>
        aValue.name.localeCompare(bValue.name)
      )
    );
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>
        {dictionaries[userLanguage].pages.names.categories}
      </Text>

      <ScrollView ref={scrollViewRef}>
        <View style={styles.categoriesContainer}>
          {Object.keys(sort(categories)).map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={currentCategory === category ? targetViewRef : null}
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
    marginTop: 20,
    paddingBottom: 10,
  },
  categoriesContainer: {
    justifyContent: "space-around",
    flexWrap: "wrap",
    flexDirection: "row",
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
