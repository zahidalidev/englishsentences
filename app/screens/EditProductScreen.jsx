import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "react-native-styled-toast";

import { Colors, toastTheme } from "../config/theme";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import {
  addProduct,
  getAllCategory,
  getProductByCategory,
  updateProduct,
} from "../services/firebase";
import LoadingModal from "../components/common/LoadingModal";
import isConnected from "../utils/checkNetwork";

const EditProduct = (props) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [loading, showLoading] = useState(false);
  const [operation, setOperation] = useState("");
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});

  const [productFields, setProductFields] = useState([
    {
      id: 0,
      placeHolder: "Name",
      value: "",
    },
    {
      id: 1,
      placeHolder: "Description",
      value: "",
    },
  ]);

  const handleChange = (index, value) => {
    const tempFields = [...productFields];
    tempFields[index].value = value;
    setProductFields(tempFields);
  };

  useEffect(() => {
    setOperation(props.route.params.type);
    handleGetAllCategory();
    setSelectedCategory(props.route.params.category.id);
    if (props.route.params.type === "edit") {
      const prod = props.route.params.product;
      setCurrentProduct(prod);
      handleChange(0, prod.name);
      handleChange(1, prod.description);
    }
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

  const handleProduct = async () => {
    try {
      showLoading(true);
      const body = {
        name: productFields[0].value,
        description: productFields[1].value,
        catId: selectedCategory,
      };

      const conn = await isConnected();

      if (operation === "add") {
        if (productFields[0].value && productFields[1].value) {
          if (conn) {
            await addProduct(body);
          } else {
            addProduct(body);
          }
          toast({ message: "Product added" });
        } else {
          toast({ message: "Please fill all the fields!", ...toastTheme.warn });
        }
      } else {
        if (conn) {
          await updateProduct(body, currentProduct.id);
        } else {
          updateProduct(body, currentProduct.id);
        }
        toast({ message: "Product updated" });
      }
    } catch (error) {
      toast({ message: `Error: ${error}`, ...toastTheme.error });
    }
    showLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <MaterialCommunityIcons name="arrow-left" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.categHeading}>New Product</Text>
        </View>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickLabel}>CATEGORY</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
          >
            {categories.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      </View>
      {productFields.map((item) => (
        <Input
          key={item.id.toString()}
          placeHolder={item.placeHolder}
          value={item.value}
          style={{
            marginTop: RFPercentage(3),
            borderBottomColor: Colors.grey,
            borderBottomWidth: 0.5,
            paddingBottom: RFPercentage(1.5),
          }}
          handleChange={(text) => handleChange(item.id, text)}
        />
      ))}

      <View style={styles.btnwrapper}>
        <Button name="Save Changes" handleSubmit={handleProduct} width="90%" />
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
});

export default EditProduct;
