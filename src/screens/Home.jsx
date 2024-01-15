import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../../constants/colors'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '@env'

const Home = ({ navigation }) => {
  const [hasToken, setHasToken] = useState(false);

  const handleLogout = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
  
      if (!authToken) {
        navigation.navigate('Login');
        return;
      }
  
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'X-CSRF-TOKEN': authToken,
          },
        }
      );
  
      if (response.status === 200) {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('Login');
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized request. Please log in again.');
        const authToken = await AsyncStorage.removeItem('authToken');
        navigation.navigate('Login');
      } else {
        console.error('An unexpected error occurred during logout.');
      }
    }
  };
  
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
     


        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Started
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Explore all the existing work based on your interest
            </Text>
          </View>

          <Button
            title="Logout"
            onPress={handleLogout}
            style={{
              marginTop: 22,
              width: '100%',
            }}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

export default Home
