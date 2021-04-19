import 'react-native-gesture-handler';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import { Constructors, Racers } from './App/context/RacerContext';
import colors from './App/config/colors';
import HomeStack from './App/stacks/HomeStack';
import MyPage from './App/stacks/MyPage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Racers>
      <Constructors> 
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if(route.name === 'Home'){
                iconName = focused
                ? 'account-heart'
                : 'account-heart-outline'
              } else if(route.name === 'MyPage'){
                iconName = focused
                ? 'home-circle'
                : 'home-circle-outline'
              }
              return <MaterialCommunityIcons name={iconName} size={30} color={color} />
            },
          })}
          tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.secondary,
            inactiveBackgroundColor: colors.light,
            activeBackgroundColor: colors.primary,
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="MyPage" component={MyPage} options={{title: "My favorites"}} />
        </Tab.Navigator>
      </Constructors> 
      </Racers>
    </NavigationContainer>
  );
}