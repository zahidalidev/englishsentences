import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Colors } from '../config/theme'

const CategoryCard = ({ item, handleCategory, index }) => {
  const backColors = [
    '#6ED5C5',
    '#F0A68B',
    '#9BBEF4',
    '#9BBEF4',
    '#F4D0E6',
    '#BCA1F3',
    '#8EC7D3',
    '#FFFFFF',
    '#F3E169',
  ]
  return (
    <TouchableOpacity
      key={item.name}
      activeOpacity={0.6}
      onPress={() => handleCategory(item)}
      style={[styles.categContaienr, { borderColor: backColors[index % backColors.length] }]}
    >
      <Text style={styles.categName}>{item.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  categContaienr: {
    width: RFPercentage(21),
    height: RFPercentage(12),
    margin: RFPercentage(1.3),
    marginTop: RFPercentage(0),
    marginBottom: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },

  categName: {
    fontSize: RFPercentage(2.8),
    fontWeight: '500',
    color: Colors.primary,
  },
})

export default CategoryCard
