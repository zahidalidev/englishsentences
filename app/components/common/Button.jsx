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
  color = Colors.white,
  disable = false
}) => (
  <TouchableOpacity
    disabled={disable}
    activeOpacity={0.5}
    onPress={handleSubmit}
    style={[
      styles.buttonContainer,
      { width, height, backgroundColor },
      ButtonStyle,
    ]}
  >
    <Text style={{ fontSize, color, }}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 2,
  },
});

export default Button;
