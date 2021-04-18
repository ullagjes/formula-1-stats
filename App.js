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

const HomeStack = () => {
  return (
    <Stack.Navigator>
       
          <Stack.Screen 
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen 
            name="Racers" component={RacersScreen}
          />
          <Stack.Screen 
            name="Racer" component={RacerDetailsScreen}
          />
          <Stack.Screen name="MyRacers" component={MyRacersScreen} options={{title: 'My racers'}}/>
    </Stack.Navigator>
  )
}

const MyPage = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="MyRacers"
        component={MyRacersScreen}
        options={{title: "Favorites"}}/>
      <Stack.Screen
        name="Racer" component={RacerDetailsScreen}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Racers>
        
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
          ></Tab.Screen>
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{title: "My favorites"}}
          ></Tab.Screen>
        </Tab.Navigator>
      </Racers>
    </NavigationContainer>
  );
}

/**<Tab.Navigator>
          <Tab.Screen name="My racers" component={MyRacersScreen} />
        </Tab.Navigator> */