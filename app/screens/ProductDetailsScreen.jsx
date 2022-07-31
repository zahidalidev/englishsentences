import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/theme";
import VarientModal from "../components/VarientModal";
import { getVariantByProduct } from "../services/firebase";
import { useToast } from "react-native-styled-toast";
import LoadingModal from "../components/common/LoadingModal";

const ProductDetails = (props) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [prodModal, setProdModal] = useState(false);
  const [loading, showLoading] = useState(false);
  const { toast } = useToast();
  const [variants, setVariants] = useState([]);

  const handleCurrentProductsVariants = async (product) => {
    showLoading(true);
    setCurrentProduct(product);
    try {
      const data = await getVariantByProduct(product.id);
      setVariants(data);
    } catch (error) {
      toast({ message: "Products variants not found!", ...toastTheme.error });
    }
    showLoading(false);
  };

  useEffect(() => {
    handleCurrentProductsVariants(props.route.params.product);
  }, [props.route.params]);

  const handleProductVariants = (type) => {
    if (type === "add") {
      props.navigation.navigate("EditProductVariant", {
        type: "add",
        category: props.route.params.category,
        product: props.route.params.product,
      });
    }
  };

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <VarientModal
        show={prodModal}
        currentProduct={currentProduct}
        setProdModal={setProdModal}
        navigation={props.navigation}
      />
      <View style={styles.subContainer}>
        <Text style={styles.mainHeading}>{currentProduct.name}</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ProductList", {
              category: props.route.params.category,
            })
          }
        >
          <Ionicons name="close" size={RFPercentage(3.3)} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {currentProduct.description}
      </Text>

      <View style={styles.subContainer}>
        <Text style={styles.variationsHeading}>Variations</Text>
        <TouchableOpacity onPress={() => handleProductVariants("add")}>
          <Text style={styles.newVariant}>+ New Variant</Text>
        </TouchableOpacity>
      </View>

      {variants.map((variant) => (
        <TouchableOpacity
          key={variant.id}
          activeOpacity={0.6}
          onPress={() => setProdModal(true)}
          style={styles.subContainer}
        >
          <View style={styles.priceWrapper}>
            <MaterialCommunityIcons
              size={RFPercentage(2.5)}
              color={
                variant.availability === "available"
                  ? Colors.green
                  : Colors.danger
              }
              name={variant.availability === "available" ? "check" : "close"}
            />
            <Text style={styles.price}>{variant.name}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>₱ {variant.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={[styles.subContainer, styles.recentOrder]}>
        <Text style={styles.variationsHeading}>Recent Orders</Text>
        <Text style={styles.orderDescr}>
          No recent orders found for this project
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: "100%",
    alignItems: "center",
  },

  subContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: RFPercentage(4),
  },

  mainHeading: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
  },

  description: {
    width: "90%",
    color: Colors.grey,
    marginTop: RFPercentage(1.5),
    fontSize: RFPercentage(2),
  },

  variationsHeading: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },

  newVariant: {
    fontSize: RFPercentage(2.4),
    fontWeight: "bold",
    color: Colors.primary,
  },

  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontSize: RFPercentage(2.2),
    color: Colors.grey,
    marginLeft: 4,
  },

  orderDescr: {
    fontSize: RFPercentage(2.2),
    marginTop: RFPercentage(1.5),
  },

  recentOrder: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default ProductDetails;
