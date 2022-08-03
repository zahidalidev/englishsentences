import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useToast } from "react-native-styled-toast";

import { Colors, toastTheme } from "../config/theme";
import BottomTab from "../components/BottomTab";
import CategoryModal from "../components/CategoryModal";
import { getAllCategory, getProductByCategory } from "../services/firebase";
import LoadingModal from "../components/common/LoadingModal";

const HomeScreen = (props) => {
  const [catModal, setCatModal] = useState(false);
  const [currentCate, setCurrentcat] = useState({});
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, showLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleGetAllCategory();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    handleGetAllCategory();
  }, [props.route.params]);

  const handleGetAllCategory = async () => {
    try {
      showLoading(true);
      const data = await getAllCategory();
      const prodCar = [];
      data.forEach(async (item, index) => {
        const prod = await getProductByCategory(item.id);
        data[index].items = prod.length;
        prodCar.push(data[index]);
        if (data.length == prodCar.length) setCategories(prodCar);
      });
    } catch (error) {
      toast({ message: "Categories not found", ...toastTheme.error });
    }
    showLoading(false);
  };

  const handleCtegoryModel = (index) => {
    setCatModal(true);
    setCurrentcat(categories[index]);
  };

  const handleCategory = (item) => {
    props.navigation.navigate("ProductList", {
      category: item,
    });
  };

  const categoryComp = (item, index) => (
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
        handleGetAllCategory={handleGetAllCategory}
      />
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style="light" />
      <View style={styles.headingContainer}>
        <Text style={styles.headingName}>Categories</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("EditCategory", { type: "add" })
          }
        >
          <Text style={styles.newCategory}>+ New Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(8) }}
        data={categories}
        renderItem={({ item, index }) => categoryComp(item, index)}
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
