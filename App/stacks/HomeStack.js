import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ConstructorDetailsScreen from '../screens/ConstructorDetailsScreen';
import ConstructorsScreen from '../screens/ConstructorsScreen';
import MyRacersScreen from '../screens/MyRacersScreen';
import RacerDetailsScreen from '../screens/RacerDetailsScreen';
import RacersScreen from '../screens/RacersScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Racers" component={RacersScreen} />
          <Stack.Screen name="Constructors" component={ConstructorsScreen} />
          <Stack.Screen name="Constructor" component={ConstructorDetailsScreen} />
          <Stack.Screen name="Racer" component={RacerDetailsScreen} />
          <Stack.Screen name="MyRacers" component={MyRacersScreen} options={{title: 'My racers'}}/>
        </Stack.Navigator>
    );
}

export default HomeStack;