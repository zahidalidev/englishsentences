import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { addUser, getAllUsers } from "./app/services/user";

export default function App() {
  const handleUser = async () => {
    try {
      const data = await addUser({
        name: "zahid2",
      });

      console.log("add: ", data);
    } catch (error) {
      console.log("errro: ", error);
    }
  };
  const handleUserAll = async () => {
    try {
      const data = await getAllUsers();

      console.log("all: ", data);
    } catch (error) {
      console.log("errro: ", error);
    }
  };
  // handleUser();
  handleUserAll();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleUser}>
        <Text>Add User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
