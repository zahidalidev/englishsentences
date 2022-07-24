import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../config/theme";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const EditProduct = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState();
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
            <Picker.Item def label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>
      {productFields.map((item) => (
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

      <View style={styles.btnwrapper}>
        <Button name="Save Changes" width="90%" />
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
