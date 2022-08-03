import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Colors } from "../config/theme";

const BottomTab = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("cat");

  const handelTabNavigation = (name) => {
    setCurrentTab(name);
    if (name === "shop") {
      navigation.navigate("Orders");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handelTabNavigation("cat")}
        activeOpacity={0.7}
        style={styles.tabContainter}
      >
        <MaterialCommunityIcons
          size={RFPercentage(3.2)}
          color={currentTab === "cat" ? Colors.primary : Colors.darkgrey}
          name="view-grid-plus"
        />
        <Text
          style={[
            styles.tabLabel,
            { color: currentTab === "cat" ? Colors.primary : Colors.darkgrey },
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handelTabNavigation("shop")}
        activeOpacity={0.7}
        style={styles.tabContainter}
      >
        <FontAwesome
          size={RFPercentage(3.2)}
          color={currentTab === "shop" ? Colors.primary : Colors.darkgrey}
          name="shopping-bag"
        />
        <Text
          style={[
            styles.tabLabel,
            { color: currentTab === "shop" ? Colors.primary : Colors.darkgrey },
          ]}
        >
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handelTabNavigation("report")}
        activeOpacity={0.7}
        style={styles.tabContainter}
      >
        <Fontisto
          size={RFPercentage(3.2)}
          color={currentTab === "report" ? Colors.primary : Colors.darkgrey}
          name="file-1"
        />
        <Text
          style={[
            styles.tabLabel,
            { color: currentTab === "" ? Colors.primary : Colors.darkgrey },
          ]}
        >
          Reports
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handelTabNavigation("setting")}
        activeOpacity={0.7}
        style={styles.tabContainter}
      >
        <AntDesign
          size={RFPercentage(3.2)}
          color={currentTab === "setting" ? Colors.primary : Colors.darkgrey}
          name="setting"
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color:
                currentTab === "setting" ? Colors.primary : Colors.darkgrey,
            },
          ]}
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 0.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.white,
  },

  tabContainter: {
    flexDirection: "column",
    alignItems: "center",
    margin: RFPercentage(1),
  },

  tabLabel: {
    marginTop: 5,
  },
});

export default BottomTab;
