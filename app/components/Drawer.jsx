import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Drawer = (props) => (
    <>
      <View style={styles.container}>
        <View style={styles.routeBtnWrapper}>
        <TouchableOpacity
           onPress={() => Linking.openURL('https://englishspeaking.in/')}
          activeOpacity={0.7}
          style={styles.routeBtn}
        >
          <MaterialCommunityIcons name='web' size={RFPercentage(3)} />
          <Text style={styles.routeName}>Visit Website</Text>
        </TouchableOpacity>
        </View>
      </View>
    </>
  )


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  routeBtnWrapper: {
    width: '100%',
    justifyContent: 'center',
    marginTop: RFPercentage(3)
  },

  routeBtn: {
    margin: RFPercentage(2),
    flexDirection: 'row',
    alignItems: 'center'
  },

  routeName: {
    fontSize: RFPercentage(2.5),
    fontWeight: '400',
    marginLeft: RFPercentage(3)
  }
})

export default Drawer