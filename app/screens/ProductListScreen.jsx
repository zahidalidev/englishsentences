import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useToast } from "react-native-styled-toast";

import { Colors, toastTheme } from "../config/theme";
import ProductModal from "../components/ProductModal";
import {
  getProductByCategory,
  getVariantByProduct,
} from "../services/firebase";
import LoadingModal from "../components/common/LoadingModal";

const ProductList = (props) => {
  const [prodModal, setProdModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentCategory, setCurrentCategory] = useState({});
  const [loading, showLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  const [products, setProducts] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllCategoryProducts(props.route.params.category.id);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    setCurrentCategory(props.route.params.category);
    getAllCategoryProducts(props.route.params.category.id);
  }, [props.route.params]);

  const getAllCategoryProducts = async (id) => {
    try {
      showLoading(true);
      const products = await getProductByCategory(id);

      const tempProduct = [];
      products.forEach(async (item, index) => {
        products[index].price = await handleCurrentProductsVariants(item.id);
        tempProduct.push(products[index]);

        if (products.length == tempProduct.length) setProducts(tempProduct);
      });
    } catch (error) {
      toast({ message: "Products not found", ...toastTheme.error });
    }
    showLoading(false);
  };

  const handleCurrentProductsVariants = async (id) => {
    try {
      const data = await getVariantByProduct(id);
      return data[0].price;
    } catch (error) {}
  };

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
          <View style={{ width: "90%" }}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text numberOfLines={2} style={styles.productDescription}>
              {item.description}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            {item.price && <Text style={styles.price}>₱ {item.price}</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <ProductModal
        show={prodModal}
        currentProduct={currentProduct}
        currentCategory={currentCategory}
        onRefreshProductList={onRefresh}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
