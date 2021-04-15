import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Racers } from './App/context/RacerContext';
import WelcomeScreen from './App/screens/WelcomeScreen';
import MyRacersScreen from './App/screens/MyRacersScreen'
import RacersScreen from './App/screens/RacersScreen';
import RacerDetailsScreen from './App/screens/RacerDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Racers>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={WelcomeScreen}
            //options={{title: 'Welcome'}}
          />

          <Stack.Screen 
            name="Racers" component={RacersScreen}
          />
          <Stack.Screen 
            name="Racer" component={RacerDetailsScreen}
          />
        </Stack.Navigator>
        
      </Racers>
    </NavigationContainer>
  );
}

/**<Tab.Navigator>
          <Tab.Screen name="My racers" component={MyRacersScreen} />
        </Tab.Navigator> */