import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RadioButton } from "react-native-paper";

import { Colors } from "../config/theme";
import Button from "../components/common/Button";

const Orders = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View style={styles.categHeadWrapper}>
        <View style={styles.categHead}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons name="arrow-left" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.categHeading}>My Orders</Text>
        </View>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioHeading}>AVAILABILITY</Text>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>Available</Text>
          <RadioButton
            value="first"
            status={"checked"}
            // onPress={() => setChecked("first")}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>Unavailable</Text>
          <RadioButton
            value="first"
            status={"checked"}
            // onPress={() => setChecked("first")}
          />
        </View>
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioHeading}>WEIGHED</Text>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>yes</Text>
          <RadioButton
            value="first"
            status={"checked"}
            // onPress={() => setChecked("first")}
          />
        </View>
        <View style={styles.radioWrapper}>
          <Text style={styles.radioLabel}>No</Text>
          <RadioButton
            value="first"
            status={"checked"}
            // onPress={() => setChecked("first")}
          />
        </View>
      </View>

      <View style={styles.btnwrapper}>
        <Button name="Save Changes" width="90%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
  },

  categHeadWrapper: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: RFPercentage(2),
    elevation: 2,
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
    width: "95%",
    marginTop: RFPercentage(4),
    padding: RFPercentage(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
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

export default Orders;
