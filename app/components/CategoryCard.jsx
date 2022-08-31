import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../config/theme'

const CategoryCard = ({ item, handleCategory, index }) => {
  const backColors = ['#2B4641', '#1A2A56', '#596174', '#3E8AA7', '#2C3A47', '#155BDC', '#E65257', '#82589F', '#3D3D3D', '#485460']
  return (
    <TouchableOpacity
      key={item.name}
      activeOpacity={0.6}
      onPress={() => handleCategory(item)}
      style={[styles.categContaienr, { backgroundColor: backColors[index % backColors.length] }]}
    >
      <Text style={styles.categName}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  categContaienr: {
    width: RFPercentage(22),
    height: RFPercentage(22),
    margin: RFPercentage(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    elevation: 10,
  },

  categName: {
    fontSize: RFPercentage(2.8),
    fontWeight: '500',
    color: Colors.white
  },
})

export default CategoryCard
