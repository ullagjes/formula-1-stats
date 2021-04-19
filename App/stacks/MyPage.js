import 'react-native-gesture-handler';

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import ConstructorDetailsScreen from '../screens/ConstructorDetailsScreen';
import MyConstructorsScreen from '../screens/MyConstructorsScreen';
import MyFavorites from '../screens/MyFavorites';
import MyRacersScreen from '../screens/MyRacersScreen';
import RacerDetailsScreen from '../screens/RacerDetailsScreen';

const Stack = createStackNavigator();

const MyPage = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyFavorites" component={MyFavorites} />
            <Stack.Screen name="MyConstructors" component={MyConstructorsScreen} options={{title: "Favorite constructors"}}/>
            <Stack.Screen name="MyRacers" component={MyRacersScreen} options={{title: "Favorite racers"}}/>
            <Stack.Screen name="Racer" component={RacerDetailsScreen} />
            <Stack.Screen name="Constructor" component={ConstructorDetailsScreen} />
        </Stack.Navigator>
    );
}

export default MyPage;