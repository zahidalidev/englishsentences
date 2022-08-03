import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import { Colors, toastTheme } from "../config/theme";
import { removeVariant } from "../services/firebase";
import { useToast } from "react-native-styled-toast";
import isConnected from "../utils/checkNetwork";

const VarientModal = ({
  show,
  setProdModal,
  currentvariant,
  currentProduct,
  currentCategory,
  navigation,
}) => {
  const { toast } = useToast();

  const handleCategory = async (type, params) => {
    if (type === "edit") {
      setProdModal(false);
      navigation.navigate("EditProductVariant", {
        type: "edit",
        category: currentCategory,
        product: currentProduct,
        currentvariant: currentvariant,
      });
    } else if (type === "remove") {
      try {
        const conn = await isConnected();
        if (conn) {
          await removeVariant(currentvariant.id);
        } else {
          removeVariant(currentvariant.id);
        }
        toast({ message: "Variant removed" });
        setProdModal(false);
        navigation.navigate("ProductDetails", {
          category: currentCategory,
          product: currentProduct,
        });
      } catch (error) {
        toast({ message: "Variant not removed!", ...toastTheme.error });
      }
    }
    setProdModal(false);
  };

  return (
    <Modal transparent={true} visible={show}>
      <TouchableOpacity
        onPress={() => setProdModal(false)}
        activeOpacity={1}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.modalWrapper}
          activeOpacity={1}
          onPress={() => null}
        >
          <View style={styles.modalHeading}>
            <Text style={styles.modalCat}>Variant</Text>
            <Text style={styles.modalName}>₱159.00</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCategory("edit", currentProduct)}
            activeOpacity={0.6}
            style={styles.cateContentContainer}
          >
            <Feather
              name="edit"
              color={Colors.green}
              size={RFPercentage(2.5)}
            />
            <Text style={styles.categHeading}>Update variant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCategory("remove")}
            activeOpacity={0.6}
            style={styles.cateContentContainer}
          >
            <MaterialIcons
              name="cancel"
              color={Colors.danger}
              size={RFPercentage(3)}
            />
            <Text style={styles.categHeading}>Remove variant</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },

  modalWrapper: {
    height: "22%",
    width: "100%",
    backgroundColor: Colors.white,
    elevation: 3,
    borderTopRightRadius: RFPercentage(3.5),
    borderTopLeftRadius: RFPercentage(3.5),
    alignItems: "center",
  },

  modalHeading: {
    margin: RFPercentage(3),
    width: "90%",
  },

  modalCat: {
    color: Colors.darkgrey,
  },

  modalName: {
    fontSize: RFPercentage(2.4),
  },

  cateContentContainer: {
    flexDirection: "row",
    width: "90%",
    marginBottom: RFPercentage(3),
    alignItems: "center",
  },

  categHeading: {
    marginLeft: RFPercentage(4),
    fontSize: RFPercentage(2.4),
  },
});

export default VarientModal;
