import { AdEventType, BannerAd, BannerAdSize, InterstitialAd } from 'react-native-google-mobile-ads';
import { Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useEffect, useState } from 'react';

import Button from '../../components/common/Button'
import { Colors } from '../../config/theme'
import { duringQuizinterstitialId, questionBannerId } from "../../config/adIds";
import styles from './styles'


const interstitial = InterstitialAd.createForAdRequest(duringQuizinterstitialId, {
  requestNonPersonalizedAdsOnly: true,
})


const Result = ({ result, handleAgainTest, handleMoreExercises }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log('loading...')
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('loaded')
      setLoaded(true)
    })

    interstitial.load()

    return unsubscribe
  }, [])

  useEffect(() => {
    if(loaded) {
      interstitial.show()
    }
  }, [result, loaded])

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
      <BannerAd
        unitId={questionBannerId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        />
    </View>
  )
}

export default Result
