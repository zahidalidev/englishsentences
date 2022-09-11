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

  pageNavigation: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'flex-start',

  },

  paginationHeading: {
    paddingLeft: RFPercentage(3.2),
    paddingTop: RFPercentage(3),
    paddingBottom: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
    width: '57%',
    justifyContent: 'space-between'
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
  },

  backIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  homeBanner: {
    backgroundColor: Colors.white,
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default styles