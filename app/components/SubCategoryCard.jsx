import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { Colors } from '../config/theme'

const windowWidth = Dimensions.get('window').width

const SubCategoryCard = ({ item, handleCategory }) => (
  <TouchableOpacity
    key={item.name}
    activeOpacity={0.6}
    onPress={() => handleCategory(item)}
    style={styles.categContaienr}
  >
    <Text style={styles.categName}>{item.title}</Text>
    <FontAwesome name='chevron-right' size={RFPercentage(2)} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  categContaienr: {
    flex: 1,
    width: windowWidth - RFPercentage(6),
    height: RFPercentage(9),
    marginBottom: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: RFPercentage(2),
    backgroundColor: Colors.lightGrey,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    flexDirection: 'row',
  },

  categName: {
    fontSize: RFPercentage(2.8),
    color: Colors.primary,
  },
})

export default SubCategoryCard
