import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useState } from "react";

import { Colors } from "../config/theme";

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([
    {
      items: [
        {
          name: "Pizza",
          price: "4.99",
        },
        {
          name: "Grill",
          price: "4.99",
        },
        {
          name: "Pasta",
          price: "4.99",
        },
      ],
      status: "On the way",
    },
    {
      items: [
        {
          name: "Pizza One",
          price: "4.99",
        },
        {
          name: "Pizza Mozzarella",
          price: "4.99",
        },
        {
          name: "Pizza Gorgonozola",
          price: "4.99",
        },
        {
          name: "Pizza Funghi",
          price: "4.99",
        },
      ],
      status: "Pending delivery",
    },
  ]);

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

      {orders.map((order, index) => (
        <View key={index.toString()} style={styles.orderContainer}>
          <View style={[styles.cardTop, styles.cardTopContaienr]}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTopHeadingLeft}>Order #11</Text>
              <Text style={styles.cardTopHeadingRight}>$ 19.97</Text>
            </View>
            <View style={styles.cardTop}>
              <Text style={styles.cardTopSubHeadingLeft}>22 July, 2019</Text>
              <Text style={styles.cardTopSubHeadingRight}>3 items</Text>
            </View>
          </View>
          {order.items.map((item, index) => (
            <View key={index.toString()} style={styles.cardTop}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
            </View>
          ))}
          <View style={styles.cardTop}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.itemName}>status</Text>
              <Text
                style={{
                  color:
                    order.status === "On the way"
                      ? Colors.danger
                      : Colors.green,
                }}
              >
                {order.status}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  order.status === "On the way" ? "#4f86f740" : "#349b7c40",
                width: RFPercentage(12),
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                marginTop: RFPercentage(2),
                borderRadius: 5,
              }}
            >
              <Text
                style={[
                  styles.itemPrice,
                  {
                    color:
                      order.status === "On the way" ? "#4f86f7" : "#349b7c",
                  },
                ]}
              >
                Track
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
    width: "63%",
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

  orderContainer: {
    width: "95%",
    marginTop: RFPercentage(1),
    padding: RFPercentage(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 5,
  },

  orderItems: {
    fontSize: RFPercentage(2),
    color: Colors.grey,
    fontWeight: "400",
    alignSelf: "flex-start",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },

  cardTopContaienr: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.grey,
    paddingBottom: RFPercentage(1.5),
  },

  cardTopHeadingLeft: {
    fontSize: RFPercentage(2.4),
    fontWeight: "bold",
    color: Colors.primary,
  },

  cardTopHeadingRight: {
    fontSize: RFPercentage(2.4),
    fontWeight: "400",
  },

  cardTopSubHeadingLeft: {
    fontSize: RFPercentage(1.9),
    color: Colors.grey,
  },

  cardTopSubHeadingRight: {
    fontSize: RFPercentage(1.9),
    color: Colors.grey,
  },

  itemName: {
    fontSize: RFPercentage(2),
    color: Colors.grey,
    marginTop: RFPercentage(3),
  },

  itemPrice: {
    fontSize: RFPercentage(2),
    color: Colors.grey,
  },
});

export default Orders;
