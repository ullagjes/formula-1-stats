import 'react-native-gesture-handler';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Constructors, Racers } from './App/context/RacerContext';
import HomeStack from './App/stacks/HomeStack';
import MyPage from './App/stacks/MyPage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Racers>
      <Constructors> 
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="MyPage" component={MyPage} options={{title: "My favorites"}} />
        </Tab.Navigator>
      </Constructors> 
      </Racers>
    </NavigationContainer>
  );
}