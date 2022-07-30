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
import { useToast } from "react-native-styled-toast";
import { removeCategory } from "../services/firebase";

import { Colors, toastTheme } from "../config/theme";

const CategoryModal = ({
  show,
  setCatModal,
  currentCate,
  navigation,
  handleGetAllCategory,
}) => {
  const { toast } = useToast();
  const handleCategory = async (type) => {
    setCatModal(false);
    if (type === "edit") {
      navigation.navigate("EditCategory", {
        type: "edit",
        category: currentCate,
      });
    } else if (type === "add") {
      navigation.navigate("EditProduct");
    } else if (type === "remove") {
      try {
        await removeCategory(currentCate.id);
        toast({ message: "Category Deleted!" });
        await handleGetAllCategory();
        setCatModal(false);
      } catch (error) {
        toast({ message: `Deleting error: ${error}`, ...toastTheme.error });
      }
    }
  };

  return (
    <Modal transparent={true} visible={show}>
      <TouchableOpacity
        onPress={() => setCatModal(false)}
        activeOpacity={1}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.modalWrapper}
          activeOpacity={1}
          onPress={() => null}
        >
          <View style={styles.modalHeading}>
            <Text style={styles.modalCat}>CATEGORY</Text>
            <Text style={styles.modalName}>{currentCate.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCategory("view")}
            activeOpacity={0.6}
            style={styles.cateContentContainer}
          >
            <AntDesign
              name="infocirlce"
              color="#349b7c"
              size={RFPercentage(2.5)}
            />
            <Text style={styles.categHeading}>View category products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCategory("edit")}
            activeOpacity={0.6}
            style={styles.cateContentContainer}
          >
            <Feather name="edit" color="#349b7c" size={RFPercentage(2.5)} />
            <Text style={styles.categHeading}>Edit category details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCategory("add")}
            activeOpacity={0.6}
            style={styles.cateContentContainer}
          >
            <Ionicons
              name="add-circle"
              color="#349b7c"
              size={RFPercentage(3)}
            />
            <Text style={styles.categHeading}>Add category product</Text>
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
            <Text style={styles.categHeading}>Remove category</Text>
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
    height: "35%",
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
    fontWeight: "500",
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

export default CategoryModal;
