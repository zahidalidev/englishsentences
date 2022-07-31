import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";

import { Colors, toastTheme } from "../config/theme";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useToast } from "react-native-styled-toast";
import LoadingModal from "../components/common/LoadingModal";
import { addVariant, getProductByCategory } from "../services/firebase";

const EditProductVariant = (props) => {
  const { toast } = useToast();
  const [loading, showLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [operation, setOperation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const [availability, setAvailability] = useState("available");
  const [weighed, setWeighed] = useState("yes");

  const [variantFields, setVariantFields] = useState([
    {
      id: 0,
      placeHolder: "Name (optional)",
      value: "",
    },
    {
      id: 1,
      placeHolder: "Price",
      value: "",
    },
  ]);

  useEffect(() => {
    setOperation(props.route.params.type);
    getAllCategoryProducts(props.route.params.category.id);
    setSelectedProduct(props.route.params.product.id);
  }, [props.route.params]);

  const getAllCategoryProducts = async (id) => {
    try {
      showLoading(true);
      const products = await getProductByCategory(id);
      setProducts(products);
    } catch (error) {
      toast({ message: "Products not found", ...toastTheme.error });
    }
    showLoading(false);
  };

  const handleChange = (index, value) => {
    const tempFields = [...variantFields];
    tempFields[index].value = value;
  };

  const handleVariant = async () => {
    showLoading(true);
    if (operation === "add") {
      const body = {
        prodId: selectedProduct,
        name: variantFields[0].value || "Unammed",
        price: parseFloat(variantFields[1].value),
        availability,
        weighed,
      };
      try {
        await addVariant(body);
        toast({ message: "Variant added" });
      } catch (error) {
        toast({ message: "Variant not added!", ...toastTheme.error });
      }
    }
    showLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("ProductDetails", {
                category: props.route.params.category,
                product: props.route.params.product,
              })
            }
          >
            <MaterialCommunityIcons name="arrow-left" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.categHeading}>New Variant</Text>
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickLabel}>PRODUCT</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            mode="dropdown"
            selectedValue={selectedProduct}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedProduct(itemValue)
            }
          >
            {products.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      </View>
      {variantFields.map((item) => (
        <Input
          key={item.id.toString()}
          placeHolder={item.placeHolder}
          style={{
            marginTop: RFPercentage(3),
            borderBottomColor: Colors.grey,
            borderBottomWidth: 0.5,
            paddingBottom: RFPercentage(1.5),
          }}
          handleChange={(text) => handleChange(item.id, text)}
        />
      ))}

      <View style={styles.radioContainer}>
        <Text style={styles.radioHeading}>AVAILABILITY</Text>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>Available</Text>
          <RadioButton
            status={availability === "available" ? "checked" : "unchecked"}
            onPress={() => setAvailability("available")}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>Unavailable</Text>
          <RadioButton
            status={availability === "unavailable" ? "checked" : "unchecked"}
            onPress={() => setAvailability("unavailable")}
          />
        </View>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioHeading}>WEIGHED</Text>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>yes</Text>
          <RadioButton
            status={weighed === "yes" ? "checked" : "unchecked"}
            onPress={() => setWeighed("yes")}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>No</Text>
          <RadioButton
            status={weighed === "no" ? "checked" : "unchecked"}
            onPress={() => setWeighed("no")}
          />
        </View>
      </View>

      <View style={styles.btnwrapper}>
        <Button name="Save Changes" handleSubmit={handleVariant} width="90%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },

  categHeadWrapper: {
    width: "100%",
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 0.6,
    padding: RFPercentage(2),
  },

  pickerContainer: {
    width: "90%",
    marginTop: RFPercentage(4),
  },

  pickLabel: {
    color: Colors.grey,
  },

  pickerWrapper: {
    width: "100%",
    borderWidth: 0.2,
    borderColor: Colors.grey,
    borderRadius: 4,
    marginTop: 8,
  },

  categHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "67%",
  },

  categHeading: {
    fontSize: RFPercentage(2.8),
    fontWeight: "bold",
  },

  btnwrapper: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: RFPercentage(3),
  },

  radioContainer: {
    width: "90%",
    marginTop: RFPercentage(4),
    justifyContent: "center",
    alignItems: "center",
  },

  radioHeading: {
    fontSize: RFPercentage(2),
    color: Colors.grey,
    fontWeight: "500",
    alignSelf: "flex-start",
  },

  radioWrapper: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFPercentage(1),
  },

  radioLabel: {
    fontSize: RFPercentage(2.5),
    fontWeight: "500",
  },
});

export default EditProductVariant;
