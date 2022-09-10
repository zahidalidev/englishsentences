import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Colors } from '../../config/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '100%',
    marginBottom: RFPercentage(7)
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
  },

  heading: {
    fontSize: RFPercentage(3.5),
    fontWeight: '600',
    marginTop: RFPercentage(5),
    marginBottom: RFPercentage(1),
    alignSelf: 'flex-start',
    marginLeft: RFPercentage(4),
    color: Colors.primary
  },

  homeBanner: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default styles