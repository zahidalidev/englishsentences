import { BannerAd } from 'react-native-google-mobile-ads';
import { useEffect, useState} from 'react'
import { Text, View, StatusBar, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'

import Button from '../../components/common/Button'
import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchQuestions } from '../../api/categories'
import { questionBannerId } from "../../config/adIds";

import styles from './styles'
import Result from '../result'

const Questions = (props) => {
  const [questions, setQuestions] = useState([])
  const [loading, showLoading] = useState(false)
  const [currentSubCategory, setSubCurrentCategory] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({
    correct: 0,
    inCorrect: 0,
  })

  useEffect(() => {
    if (props.route.params?.subCategory) {
      setSubCurrentCategory(props.route.params.subCategory)
      handleGetQuestions(props.route.params.subCategory.id)
    }

    return(() => {
      setCurrentQuestion(0)
      setShowResult(false)
    })
  }, [props.route.params])

  const handleGetQuestions = async (id) => {
    try {
      showLoading(true)
      const { data } = await fetchQuestions(id)
      setQuestions(data)
    } catch (error) {
      console.log({ message: 'Sub categories not found' }, error)
    }
    showLoading(false)
  }

  const handleCheckAnser = (answerIndex) => {
    const tempQuestion = [...questions]
    tempQuestion[currentQuestion].sub_quiz_options[answerIndex].currentAnswer =
      tempQuestion[currentQuestion].sub_quiz_options[answerIndex].is_correct === 1 ? 'yes' : 'no'
    tempQuestion[currentQuestion].optionDisable = true
    tempQuestion[currentQuestion].guess = tempQuestion[currentQuestion].sub_quiz_options[answerIndex].currentAnswer
    setQuestions(tempQuestion)
    setShowNextButton(true)
  }

  const handleNext = () =>  {
    if(currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
      setShowNextButton(false)
    } else {
      makeResult()
    }
  }

  const makeResult = () => {
    setShowResult(true)

    const resultCounts = {
      correct: 0,
      inCorrect: 0,
    }

    questions.forEach(item => {
      if(item.guess === 'yes') {
        resultCounts.correct += 1
      }else if (item.guess === 'no') {
        resultCounts.inCorrect += 1
      }
    })

    setResult(resultCounts)
  }

  const handleAgainTest = () => {
    setCurrentQuestion(0)
    setShowResult(false)
    handleGetQuestions(props.route.params?.subCategory.id)
  }

  const bannerError = (error) => {
    console.log("Banner ad error: ", error);
    return;
}

  const QuestionComponent = () => <>
     <View style={styles.bodyContainer}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressCount}>
            {[...Array(10).keys()].map((num) => (
              <View
                key={num.toString()}
                style={[styles.numContainer, { backgroundColor: questions[num]?.guess === 'yes' ? Colors.green : (questions[num]?.guess === 'no' ? Colors.danger : Colors.lightGrey) }]}
              >
                <Text>{num + 1}</Text>
              </View>
            ))}
          </View>
          <ProgressBar progress={(currentQuestion * 0.10) + 0.04} style={styles.progressBar} color={Colors.green} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeading}>Choose the correct answer</Text>
          <Text style={styles.questionDescription}>{questions[currentQuestion]?.question}</Text>
          <View style={styles.questionOption}>
            {questions[currentQuestion]?.sub_quiz_options.map((option, index) => (
              <Button
                key={option.option_value}
                handleSubmit={() => handleCheckAnser(index)}
                name={`${option.option_value}${(option.is_correct === 1 && questions[currentQuestion]?.optionDisable) ? ' (correct)' : ''}`}
                color={Colors.primary}
                height={RFPercentage(6)}
                ButtonStyle={{ marginBottom: RFPercentage(2) }}
                fontSize={RFPercentage(2.7)}
                width='90%'
                disable={questions[currentQuestion]?.optionDisable}
                backgroundColor={(option.currentAnswer === 'yes' || (option.is_correct === 1 && questions[currentQuestion]?.optionDisable)) ? Colors.green : (option.currentAnswer === 'no' ? Colors.danger : Colors.lightGrey)}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.nextButton}>
        {showNextButton && <Button name='NEXT' handleSubmit={handleNext} height={RFPercentage(6)} fontSize={RFPercentage(2.7)} />}
        <View style={{ marginTop: RFPercentage(1), width: "100%", justifyContent: "center", alignItems: "center" }} >
        </View>
      </View>
        <BannerAd
          unitId={'ca-app-pub-3940256099942544/6300978111'}
          // requestOptions={{
          //   requestNonPersonalizedAdsOnly: true,
          // }}
        />
        {/* <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          onAdFailedToLoad={error => console.error(error)}
        /> */}
  </>

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}>
        <View style={styles.pageNavigation}>
          <TouchableOpacity style={styles.backIcon} onPress={() => props.navigation.navigate('SubCategories')}>
            <FontAwesome name='chevron-left' size={RFPercentage(2)} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.heading}>{currentSubCategory.title}</Text>
        </View>
      </View>
      {!showResult ? <QuestionComponent /> : <Result result={result} handleAgainTest={handleAgainTest} handleMoreExercises={() => props.navigation.navigate('SubCategories')} />}
    </View>
  )
}

export default Questions
