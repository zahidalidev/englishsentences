import { StyleSheet, TextInput, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const Input = ({ placeHolder, handleChange, style }) => (
  <View style={styles.container}>
    <TextInput
      style={[styles.input, style]}
      placeholder={placeHolder}
      onChangeText={handleChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "90%",
    fontSize: RFPercentage(2.4),
  },
});

export default Input;
