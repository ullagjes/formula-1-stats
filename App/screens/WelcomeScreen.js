import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//COMPONENTS
import AppText from '../components/AppText';
import AppTitle from '../components//AppTitle';
import NavigateButton from '../components/NavigateButton';
import Screen from '../components/Screen';
import colors from '../config/colors';


function WelcomeScreen({ navigation }) {
    return (
        <Screen>
            <View style={styles.container}>
                <AppTitle>F1 stats</AppTitle>
                <MaterialCommunityIcons 
                    name="flag-checkered"
                    size={70}
                    style={styles.icon}
                />
                <AppText style={styles.text}>Get the latest stats on Formula 1 constructors and racers.</AppText>
                <NavigateButton title={'Racers'} onPress={() => navigation.navigate('Racers')}/>
                <NavigateButton title={'Constructors'} onPress={() => console.log('hallo')}/>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flex: 1,
        paddingTop: 50,
    },

    icon: {
        alignSelf: 'center',
    },

    text: {
        marginHorizontal: 15,
        fontWeight: 'bold',
        marginBottom: 50,
        fontSize: 25,
        alignSelf: 'center',
        textAlign: 'center',
        color: colors.medium,
    }
})

export default WelcomeScreen;