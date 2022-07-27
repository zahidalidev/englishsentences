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

import { Colors } from "../config/theme";

const VarientModal = ({ show, setProdModal, currentProduct, navigation }) => {
  const handleCategory = (type, params) => {
    setProdModal(false);
    if (type === "edit") {
      navigation.navigate("EditCategory");
    } else if (type === "remove") {
      navigation.navigate("EditProduct");
    }
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
            onPress={() => handleCategory("view", currentProduct)}
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
