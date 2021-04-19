import React from 'react';
import { StyleSheet } from 'react-native';

import AppTitle from '../components/AppTitle';
import colors from '../config/colors';
import NavigateButton from '../components/NavigateButton';
import Screen from '../components/Screen';

function MyFavorites({ navigation }) {
    return (
        <Screen>
            <AppTitle style={styles.title}>favorites</AppTitle>
            <NavigateButton 
                title={'Racers'} 
                style={styles.button}
                onPress={() => navigation.navigate('MyRacers')}
            />
            <NavigateButton 
                title={'Constructors'} 
                style={styles.button}
                onPress={() => navigation.navigate('MyConstructors')} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
    },
    title: {
        color: colors.secondary,
    }
})

export default MyFavorites;