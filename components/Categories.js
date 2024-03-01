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
  screenWidth,
}) => {
  const scrollViewRef = useRef();
  const targetViewRef = useRef();

  const titleFontSize = screenWidth < 400 ? 20 : 24;
  const fontSize = screenWidth < 400 ? 14 : 16;
  const tileWidth = screenWidth < 400 ? 98 : 110;

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
      <Text style={[styles.title, { fontSize: titleFontSize }]}>
        {dictionaries[userLanguage].pages.names.categories}
      </Text>

      <ScrollView ref={scrollViewRef}>
        <View style={styles.categoriesContainer}>
          {Object.keys(sort(categories)).map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={currentCategory === category ? targetViewRef : null}
              style={[
                currentCategory === category
                  ? styles.currentCategoryTile
                  : styles.categoryTile,
                { width: tileWidth },
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <FontAwesome5
                name={categories[category].icon}
                size={30}
                color="white"
                solid
              />

              <Text style={[styles.categoryTitle, { fontSize: fontSize }]}>
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
  title: {
    color: "#fefefe",
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 20,
  },
  categoryTile: {
    height: 105,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0f8987",
  },
  currentCategoryTile: {
    height: 105,
    borderRadius: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#16bebb",
    borderColor: "#fff",
    borderWidth: 2,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default CategoriesPage;
