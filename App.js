import React, { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppNavigator from './components/AppNavigator'
import NetInfo from '@react-native-community/netinfo';
import { View, Text  } from 'react-native';
import LottieView from 'lottie-react-native'; 
import Button from './components/Button';



export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(true)
  const isMounted = useRef(true);

  useEffect(() => {
    checkFirstTimeOpening()
    checkInternetConnection()
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })
    return () => {
      unsubscribe()
      isMounted.current = false;
    }
  }, [])

  const checkFirstTimeOpening = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken')
      console.log('authToken:', authToken)
      setIsFirstTime(authToken === null || authToken === '')
    } catch (error) {
      console.error('Error checking first time opening:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);
    if (!isConnected && isMounted.current) {
      setTimeout(checkInternetConnection, 5000); 
    }
  };


  const handleRetry = () => {
    checkInternetConnection()
  }

  if (isLoading) {
    return null
  }

 

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <AppNavigator isFirstTime={isFirstTime} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={require('./assets/Animation - 1702277407197.json')}
            autoPlay
            style={{ width: 400, height: 400 }}
          />
          <Text>No Internet Connection</Text>
          <Text>Please check your internet connection and try again.</Text>
          <Button
              title="Try Again"
              onPress={handleRetry}
              style={{
                marginTop: 22,
                width: '60%',
              }}
            />
        </View>
      )}
    </View>
  );
}
