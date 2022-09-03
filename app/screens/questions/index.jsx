import { useEffect, useState, useCallback } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'

import Button from '../../components/common/Button'
import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchQuestions } from '../../api/categories'

import styles from './styles'

const Questions = (props) => {
  const [questions, setQuestions] = useState([])
  const [loading, showLoading] = useState(false)
  const [currentSubCategory, setSubCurrentCategory] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    handleGetQuestions()
    if (props.route.params?.subCategory) {
      setSubCurrentCategory(props.route.params.subCategory)
      handleGetQuestions(props.route.params?.subCategory.quiz_id)
    }
  }, [props.route.params])

  const handleGetQuestions = async (id) => {
    try {
      showLoading(true)
      const { data } = await fetchQuestions(id || currentSubCategory.quiz_id)
      setQuestions(data)
    } catch (error) {
      console.log({ message: 'Sub categories not found' }, error)
    }
    showLoading(false)
  }

  const handleCategory = (item) => {
    // props.navigation.navigate('ProductList', {
    //   category: item,
    // })
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}>
        <View style={styles.pageNavigation}>
          <FontAwesome name='chevron-left' size={RFPercentage(2)} color={Colors.white} />
          <Text style={styles.heading}>{currentSubCategory.title}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressCount}>
            {[...Array(10).keys()].map((num) => (
              <View
                key={num.toString()}
                style={[styles.numContainer, { backgroundColor: Colors.green }]}
              >
                <Text>{num}</Text>
              </View>
            ))}
          </View>
          <ProgressBar progress={0.04} style={styles.progressBar} color={Colors.green} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeading}>Choose the correct answer</Text>
          <Text style={styles.questionDescription}>{questions[currentQuestion]?.question}</Text>
          <View style={styles.questionOption}>
            {questions[currentQuestion]?.sub_quiz_options.map((option) => (
              <Button
                name={option.option_value}
                color={Colors.primary}
                height={RFPercentage(6)}
                ButtonStyle={{ marginBottom: RFPercentage(2) }}
                fontSize={RFPercentage(2.7)}
                width='90%'
                backgroundColor={Colors.lightGrey}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.nextButton}>
        <Button name='NEXT' height={RFPercentage(6)} fontSize={RFPercentage(2.7)} />
      </View>
    </View>
  )
}

export default Questions
