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
    paddingLeft: RFPercentage(3),
  },

  pageNavigation: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFPercentage(2),
  },

  heading: {
    fontSize: RFPercentage(3.5),
    color: Colors.white,
  },

  progressBarContainer: {
    marginTop: RFPercentage(5),
    width: '90%',
  },

  progressCount: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: -16,
  },

  numContainer: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressBar: {
    height: 8,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
  },

  bodyContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'center',
  },

  questionContainer: {
    width: '90%',
    flexDirection: 'column',
    marginTop: RFPercentage(7),
  },

  questionHeading: {
    fontSize: RFPercentage(2.7),
    fontWeight: '500',
  },

  questionDescription: {
    marginTop: RFPercentage(2),
    fontSize: RFPercentage(2.5),
  },

  questionOption: {
    marginTop: RFPercentage(5),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextButton: {
    position: 'absolute',
    bottom: RFPercentage(13),
    left: '6%',
    right: '6%',
  },

  bannerAdBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(5),
  },

  backIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    justifyContent: 'center',
    alignItems: 'center',
  },

  rectangleAd: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFPercentage(15),
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
