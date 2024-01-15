import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  AuthStack from './AuthStack';
import AppStack from './AppStack';


export default function App() {
  return (
      <NavigationContainer>
        <AuthStack/>
      </NavigationContainer>

  )
}
