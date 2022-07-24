import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../../config/theme";

const Button = ({
  name,
  width,
  handleSubmit,
  height = RFPercentage(5.3),
  backgroundColor = Colors.primary,
  fontSize = RFPercentage(2.3),
  ButtonStyle,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={handleSubmit}
    style={[
      styles.buttonContainer,
      { width, height, backgroundColor },
      ButtonStyle,
    ]}
  >
    <Text style={[styles.buttonName, { fontSize }]}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 2,
  },

  buttonName: {
    color: Colors.white,
  },
});

export default Button;
