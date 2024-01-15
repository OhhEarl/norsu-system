import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import COLORS from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import styles from './screenStyles/LoginSignup'
import CustomTextInput from '../../components/customTextInput/CustomTextInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '@env'
import * as Device from 'expo-device'
import { CommonActions } from '@react-navigation/native'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [user, setUser] = useState({})

  function login() {
    if (!email || !password) {
      setErrorMessage('Please enter all the required fields.')
      return
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    axios
      .post(`${BASE_URL}/login`, {
        email: email,
        password: password,
        device_name: Device.modelName,
      })
      .then((response) => {
        if (response.data.status == 422) {
          setErrorMessage('Invalid Email or Password. Please Try Again.')
        }
        if (response.data.status == 200) {
          const userData = response.data.user
          setUser(userData)
          const token = response.data.user_token
          console.log(token)
          saveToken(token)
          setEmail('')
          setPassword('')
          setErrorMessage('')
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(`Login failed: ${error.response.data.message}`)
        } else if (error.request) {
          setErrorMessage(
            'No response received from the server. Please try again.'
          )
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      })
  }
  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token)
      console.log('Token saved successfully:', token)
    } catch (error) {
      console.error('Error saving token:', error)
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken')
        if (authToken) {
          console.log(authToken)
          navigation.navigate('Home')
        } else {
          await AsyncStorage.clear()
          navigation.navigate('Login')
        }
      } catch (error) {
        console.error('Error checking token:', error)
      }
    }
    checkToken()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrapper}>
        <View style={{ marginVertical: 22 }}>
          <Text style={styles.loginHeaderText}>Hi Welcome Back ! 👋</Text>
          <Text style={styles.textField}>
            Hello again you have been missed!
          </Text>
        </View>

        {/*  Email Address*/}
        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldLabel}>Email Address</Text>
          <CustomTextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldLabel}>Password</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Enter your password"
              autoCapitalize="none"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown == false ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>

        <Button
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={login}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}
        >
          <Text style={styles.textField}>Don't have an account ? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login
