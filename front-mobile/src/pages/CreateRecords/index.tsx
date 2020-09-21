import React, { useState, useEffect } from 'react'
import { Text, TextInput, StyleSheet, View, Platform, Alert } from 'react-native'
import Header from '../../components/Header'
import PlatformCard from './PlatformCard'
import { FontAwesome5 } from '@expo/vector-icons'
import { Game, GamePlatform } from './types'
import RNPickerSelect from 'react-native-picker-select'
import { Value } from 'react-native-reanimated'
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import Axios from 'axios'
import { RectButton } from 'react-native-gesture-handler'



const CreateRecords = () => {

    const BASE_URL = null //'http>//192.168..21:8080  heroku

    const mapSelectValue = (games: Game[] =>{
      return games.map(game => ({
        ...games,
        label: game.title,
        value: game.id
      }))
    })

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [platform, setPlatform] = useState<GamePlatform>()
    const [selectedGame, setSelectedGame] = useState('')
    const [allGames, setAllGames] = useState<Game[]>([])
    const [filteredGame, setFilteredGame] = useState<Game[]>([])

    const handleChangePlatform = (selectedPlatform: GamePlatform) => {
      setPlatform(selectedPlatform)
      const gamesByPlatform = allGames.filter(
        game => game.platform === selectedPlatform
      )
      setFilteredGame(gamesByPlatform)
    } 

    const handleSubmit = () => {
      const payload = {name, age, gameId: selectedGame}

      Axios.post(`${BASE_URL}/records`,payload)
      .then(() => {
        Alert.alert('All saves')
        setName('')
        setAge('')
        setSelectedGame('')
        setPlatform(undefined)
      })
    }

    useEffect(() => {
      Axios.get(`${BASE_URL}/games`)
      .then(response => {
        const selectedValue = mapSelectValues(response.data)
        console.log(selectedValue)
        setAllGames(selectedValue)
      })
      .catch(()=> Alert.alert('Error tolist games'))
    }, [])

    const placeholder = {
      label: 'Select game',
      value: null
    }

    return(
        <>
        <Header />
        <View style={styles.container}>
            <TextInput placeholder="Your name" style={styles.inputText} onChangeText={text => setName(text)}/>
            <TextInput placeholder="Your age"  style={styles.inputText} keyboardType="numeric" 
            maxLength={3} placeholderTextColor="#000" onChangeText={text => setAge(text)}/>
        </View>
        <View style={styles.container}>
            <PlatformCard 
              platform="PC" 
              icon="laptop" 
              onChange={handleChangePlatform}
              activePlatform={platform}
            />
            <PlatformCard 
            platform="XBOX"
            icon="xbox" 
            onChange={handleChangePlatform}
            activePlatform={platform} 
            />

            <PlatformCard 
            platform="PLAYSTATION" 
            icon="playstation" 
            onChange={handleChangePlatform}
            activePlatform={platform}
            />
        </View>
        <View>
          <RNPickerSelect 
          onValueChange={value => {
            setSelectedGame(value)
          }}
          placeholder={placeholder}
          value= {selectedGame}
          items = {filteredGame}
        style={pickerSelected}
        Icon={() => {
          return(
            <Icon name="chevron-drown" color='#32f' size={25}/>
          )
        }}
        />
         <View style={styles.footer}  >
            <RectButton 
              style={styles.button}
              onPress={handleSubmit}
            >
                <Text style={styles.buttonText}> Save </Text>
                <Icon name="save" color="#fff" size={55}  />
            </RectButton>
        </View>
        </View>
        </>
)}

const pickerSelected = StyleSheet.create(
  {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    placeholder: {
      color: '#9E9E9E',
      fontSize: 16,
      fontFamily: "Play_700Bold",
    },
    iconContainer: {
      top: 10,
      right: 12,
    }
  }
)
    
const styles = StyleSheet.create(
    {
        container: {
          marginTop: '15%',
          paddingRight: '5%',
          paddingLeft: '5%',
          paddingBottom: 50
        },
        inputText: {
          height: 50,
          backgroundColor: '#FFF',
          borderRadius: 10,
          color: '#ED7947',
          fontFamily: "Play_700Bold",
          fontSize: 16,
          paddingLeft: 20,
          marginBottom: 21
        },
        platformContainer: {
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        footer: {
          marginTop: '15%',
          alignItems: 'center',
        },
        button: {
          backgroundColor: '#00D4FF',
          flexDirection: 'row',
          borderRadius: 10,
          height: 60,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonText: {
          fontFamily: "Play_700Bold",
          fontWeight: 'bold',
          fontSize: 18,
          color: '#0B1F34',
        }
      }
)
  
  export default CreateRecords
  