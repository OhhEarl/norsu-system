import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import HomeScreen from './TabsPages/HomeScreen'
import ProfileScreen from './TabsPages/ProfileScreen'
import SearchScreen from './TabsPages/SearchScreen'
import JobPostScreen from './TabsPages/JobPostScreen'
import { AntDesign } from '@expo/vector-icons'
import { HandleLogout } from '../src/screens/HandleLogout'

const Tab = createBottomTabNavigator()

const Tabs = () => {
      const navigation = useNavigation(); // Use useNavigation hook to get access to navigation prop
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={25}
              color={focused ? 'blue' : 'black'}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={25}
              color={focused ? 'lightblue' : 'black'}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="JobPostScreen"
        component={JobPostScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="briefcase"
              size={25}
              color={focused ? 'lightblue' : 'black'}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: '#04a1cc',
          },
          headerRight: () => (
            <AntDesign name="logout" size={24} color="black" 
            onPress={() => HandleLogout(navigation)} 
            />
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={25}
              color={focused ? 'lightblue' : 'black'}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
