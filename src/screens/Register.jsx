import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Button from '../../components/Button'
import COLORS from '../../constants/colors'
import styles from './screenStyles/LoginSignup'
import CustomTextInput from '../../components/customTextInput/CustomTextInput'
import { BASE_URL } from '@env'
import * as Device from 'expo-device'
import axios from 'axios'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const register = () => {
    if (password != confirmPassword) {
      setErrorMessage('Password do not much.')
      return
    }
    if (!email || !password || !name) {
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
      .post(`${BASE_URL}/register`, {
        name: name,
        email: email,
        password: password,
        deviceName: Device.modelName,
      })
      .then((response) => {
        console.log(response)
        if (response.status == 200) {
          navigation.navigate('Login')
        } else {
          const errorMessage =
            response.data.message && response.data.message.email
              ? response.data.message.email[0]
              : 'An unexpected error occurred. Please try again.'
          setErrorMessage(errorMessage)
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.response) {
          setErrorMessage(`Registration failed: ${error.response.data.message}`)
        } else if (error.request) {
          alert(
            'No response received from the server. Please try again.'
          )
        } else {
          alert('An unexpected error occurred. Please try again.')
        }
      })
  }
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.containerWrapper}>
        <View style={{ marginVertical: 22 }}>
          <Text style={styles.createAccount}>Create Account</Text>
          <Text style={[styles.textField, (style = { textAlign: 'center' })]}>
            Create an account so you can explore different kind of works!
          </Text>
        </View>

        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldLabel}>Full Name</Text>
          <CustomTextInput
            placeholder="Enter your full name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldLabel}>Email Address</Text>
          <CustomTextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
        </View>

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
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.inputFieldLabel}>Confirm Password</Text>

          <View style={styles.inputField}>
            <TextInput
              placeholder="Confirm your password"
              autoCapitalize="none"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{
                width: '100%',
              }}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
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

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}
        >
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>


        <Button
          title="Sign Up"
          onPress={register}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account
          </Text>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register
