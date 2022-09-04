import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'

import Button from '../../components/common/Button'
import { Colors } from '../../config/theme'
import styles from './styles'

const Result = ({ result, handleAgainTest, handleMoreExercises }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>RESULT</Text>
      <Text style={styles.resultPercent}>{result.correct * 10}%</Text>
      <View style={styles.resultCountContainer} >
        <View style={styles.resultCorrect} >
          <View style={styles.resultIcons} >
            <FontAwesome name='check' color={Colors.green} size={RFPercentage(1.8)} />
          </View>
          <Text style={styles.correctCount} >Correct: {result.correct}</Text>
        </View>
        <View style={styles.resultCorrect} >
          <View style={[styles.resultIcons, styles.incorrectIcon]} >
            <FontAwesome name='close' color={Colors.danger} size={RFPercentage(1.8)} />
          </View>
          <Text style={[styles.correctCount, styles.incorrectCount]} >Incorrect: {result.inCorrect}</Text>
        </View>
      </View>
      <Button
         handleSubmit={handleAgainTest}
         name='TAKE THE TEST AGAIN'
         color={Colors.white}
         height={RFPercentage(6)}
         ButtonStyle={{ marginBottom: RFPercentage(2), marginTop: RFPercentage(8) }}
         fontSize={RFPercentage(2.7)}
         width='90%'
         backgroundColor={Colors.green}
      />
      <Button
         handleSubmit={handleMoreExercises}
         name='MORE EXERCISES'
         color={Colors.white}
         height={RFPercentage(6)}
         ButtonStyle={{ marginBottom: RFPercentage(2) }}
         fontSize={RFPercentage(2.7)}
         width='90%'
         backgroundColor={Colors.green}
      />
    </View>
  )
}

export default Result
