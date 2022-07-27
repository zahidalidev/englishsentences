import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../config/theme";
import VarientModal from "../components/VarientModal";

const ProductDetails = (props) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [prodModal, setProdModal] = useState(false);

  const getCurrentProductsVariants = (product) => {
    setCurrentProduct(product);
  };

  useEffect(() => {
    getCurrentProductsVariants(props.route.params);
  }, [props.route.params]);

  return (
    <View style={styles.container}>
      <VarientModal
        show={prodModal}
        currentProduct={currentProduct}
        setProdModal={setProdModal}
        navigation={props.navigation}
      />
      <View style={styles.subContainer}>
        <Text style={styles.mainHeading}>{currentProduct.name}</Text>
        <TouchableOpacity>
          <Ionicons name="close" size={RFPercentage(3.3)} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {currentProduct.description}
      </Text>

      <View style={styles.subContainer}>
        <Text style={styles.variationsHeading}>Variations</Text>
        <TouchableOpacity>
          <Text style={styles.newVariant}>+ New Variant</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setProdModal(true)}
        style={styles.subContainer}
      >
        <View style={styles.priceWrapper}>
          <MaterialCommunityIcons
            size={RFPercentage(2.5)}
            color={Colors.green}
            name="check"
          />
          <Text style={styles.price}>Unammed</Text>
        </View>
        <View style={styles.priceWrapper}>
          <MaterialCommunityIcons
            size={RFPercentage(2)}
            color={Colors.grey}
            name="currency-php"
          />
          <Text style={styles.price}>158.00</Text>
        </View>
      </TouchableOpacity>

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
