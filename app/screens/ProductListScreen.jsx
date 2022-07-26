import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/theme";
import ProductModal from "../components/ProductModal";

const ProductList = (props) => {
  const [prodModal, setProdModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentCategory, setCurrentCategory] = useState({});
  const [products, setProducts] = useState([
    {
      id: 0,
      name: "Fish Lumpia",
      price: 159,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 1,
      name: "Fish Lumpia",
      price: 159,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      name: "Fish Lumpia",
      price: 159,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      name: "Fish Lumpia",
      price: 159,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 4,
      name: "Fish Lumpia",
      price: 159,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ]);

  useEffect(() => {
    setCurrentCategory(props.route.params.category);
  }, [props.route.params]);

  const handleProductModel = (index) => {
    setProdModal(true);
    setCurrentProduct(products[index]);
  };

  const productComp = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => handleProductModel(index)}
      style={styles.categContaienr}
    >
      <View style={styles.productWrapper}>
        <View style={styles.productContent}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>
              {item.description}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <MaterialCommunityIcons
              size={RFPercentage(2)}
              color={Colors.primary}
              name="currency-php"
            />
            <Text style={styles.price}>{item.price}.00</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ProductModal
        show={prodModal}
        currentProduct={currentProduct}
        setProdModal={setProdModal}
        navigation={props.navigation}
      />
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <MaterialCommunityIcons name="arrow-left" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.categHeading}>{currentCategory.name}</Text>
        </View>
      </View>
      <FlatList
        style={{ marginTop: RFPercentage(2) }}
        data={products}
        renderItem={(item) => productComp(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  categHeadWrapper: {
    width: "100%",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0.6,
    padding: RFPercentage(2),
  },

  categHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "61%",
  },

  categHeading: {
    fontSize: RFPercentage(2.8),
    fontWeight: "bold",
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

  productWrapper: {
    flexDirection: "row",
    width: "100%",
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

  productContent: {
    width: "90%",
    marginLeft: RFPercentage(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  productName: {
    fontSize: RFPercentage(2.5),
    fontWeight: "500",
  },

  productDescription: {
    color: Colors.grey,
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
    maxWidth: "95%",
  },

  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -RFPercentage(4),
  },

  price: {
    fontSize: RFPercentage(2.2),
    marginLeft: 4,
    color: Colors.primary,
  },
});

export default ProductList;
