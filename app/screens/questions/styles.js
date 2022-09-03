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
    height: RFPercentage(14),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: RFPercentage(3)
  },

  pageNavigation: {
    width: "55%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFPercentage(2),
  },

  heading: {
    fontSize: RFPercentage(3.5),
    color: Colors.white
  },

  progressBarContainer: {
    marginTop: RFPercentage(3),
    width: '90%',
  },

  progressCount: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: -17
  },

  numContainer: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressBar: {
    height: 10,
    backgroundColor:'grey',
    borderRadius: 10
  },

  bodyContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'center',
  },
})

export default styles