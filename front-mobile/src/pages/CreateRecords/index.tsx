import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'



const CreateRecords = () => {
    return(
        <>
           <Header />
           <Text style={styles.text}>Hello</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#212121'
    },
      text: {
          color: '#fff'
      }
  })
  

export default CreateRecords