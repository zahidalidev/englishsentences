import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Colors } from '../../config/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'center',
    paddingTop: RFPercentage(3)
  },

  heading: {
    fontSize: RFPercentage(2.9),
    fontWeight: '500',
    color: Colors.green
  },

  resultPercent: {
    fontSize: RFPercentage(10),
    color: Colors.green,
    marginTop: RFPercentage(3)
  },

  resultCountContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: RFPercentage(3)
  },

  resultCorrect: {
    flexDirection: "row",
    alignItems: 'center'
  },

  resultIcons: {
    height: RFPercentage(3),
    width: RFPercentage(3),
    borderWidth: 2,
    borderColor: Colors.green,
    borderRadius: RFPercentage(4),
    justifyContent: 'center',
    alignItems: 'center'
  },

  correctCount: {
    fontSize: RFPercentage(3),
    color: Colors.green,
    marginLeft: RFPercentage(1)
  },

  incorrectCount: {
    color: Colors.danger
  },

  incorrectIcon: {
    borderColor: Colors.danger
  }
})

export default styles