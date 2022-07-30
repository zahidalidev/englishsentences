import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useToast } from "react-native-styled-toast";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Colors, toastTheme } from "../config/theme";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { addCategory } from "../services/firebase";
import LoadingModal from "../components/common/LoadingModal";

const EditCategory = (props) => {
  const [categName, setCategName] = useState("");
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setOperation(props.route.params.type);
    console.log(props.route.params.type);
  }, [props.route.params]);

  const handleCategory = async () => {
    try {
      setLoading(true);
      if (operation === "add") {
        await addCategory({ name: categName });
        toast({ message: "Category added" });
      } else {
      }
    } catch (error) {
      toast({ message: "Error: Category not added!", ...toastTheme.error });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons name="arrow-left" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.categHeading}>New Category</Text>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Input
          placeHolder="Name"
          style={{ marginTop: RFPercentage(5) }}
          handleChange={(text) => setCategName(text)}
        />
      </View>
      <View style={styles.btnwrapper}>
        <Button handleSubmit={handleCategory} name="Save Changes" width="90%" />
      </View>
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

export default EditCategory;
