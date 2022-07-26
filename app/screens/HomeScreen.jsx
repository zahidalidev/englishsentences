import { useState } from "react";
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/theme";
import BottomTab from "../components/BottomTab";
import CategoryModal from "../components/CategoryModal";

const HomeScreen = (props) => {
  const [catModal, setCatModal] = useState(false);
  const [currentCate, setCurrentcat] = useState({});
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "Appetizers",
      items: 4,
    },
    {
      id: 1,
      name: "Appetizers",
      items: 4,
    },
    {
      id: 2,
      name: "Appetizers",
      items: 4,
    },
    {
      id: 3,
      name: "Appetizers",
      items: 4,
    },
    {
      id: 4,
      name: "Appetizers",
      items: 4,
    },
  ]);

  const handleCtegoryModel = (index) => {
    setCatModal(true);
    setCurrentcat(categories[index]);
  };

  const handleCategory = (item) => {
    props.navigation.navigate("ProductList", { category: item });
  };

  const categoryComp = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => handleCategory(item)}
      style={styles.categContaienr}
    >
      <View style={styles.categWrapper}>
        <View style={styles.gridIconWrap}>
          <MaterialCommunityIcons
            size={RFPercentage(3)}
            color={Colors.white}
            name="view-grid-outline"
          />
        </View>
        <View style={styles.categoryContent}>
          <View>
            <Text style={styles.categName}>{item.name}</Text>
            <Text style={styles.categItem}>{item.items} item/s</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCtegoryModel(index)}
            activeOpacity={0.6}
          >
            <MaterialCommunityIcons
              size={RFPercentage(3)}
              name="square-edit-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CategoryModal
        show={catModal}
        currentCate={currentCate}
        setCatModal={setCatModal}
        navigation={props.navigation}
      />
      <StatusBar backgroundColor={Colors.primary} style="light" />
      <View style={styles.headingContainer}>
        <Text style={styles.headingName}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.newCategory}>+ New Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: RFPercentage(2) }}
        data={categories}
        renderItem={(item) => categoryComp(item)}
      />
      <BottomTab navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    width: "100%",
  },

  headingContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFPercentage(2),
  },

  headingName: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
  },

  newCategory: {
    fontSize: RFPercentage(2.4),
    fontWeight: "600",
    color: Colors.primary,
  },

  categContaienr: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0.5,
    paddingBottom: RFPercentage(2),
  },

  categWrapper: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  gridIconWrap: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: RFPercentage(10),
    justifyContent: "center",
    alignItems: "center",
  },

  categoryContent: {
    width: "90%",
    marginLeft: RFPercentage(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categName: {
    fontSize: RFPercentage(2.8),
    fontWeight: "500",
  },

  categItem: {
    color: Colors.grey,
  },
});

export default HomeScreen;
