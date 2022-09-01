import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Colors } from '../../config/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: Colors.primary,
    height: RFPercentage(11),
  },

  bodyContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'center',
  },

  pageNavigation: {
    width: "88%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFPercentage(5),
  },

  heading: {
    fontSize: RFPercentage(3.5),
    fontWeight: '600',
    color: Colors.primary
  },

  pageNumber: {
    fontSize: RFPercentage(2.2),
    fontWeight: '600',
    color: Colors.primary
  },

  navigation: {
    flexDirection: 'row',
    width: RFPercentage(15),
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }

})

export default styles