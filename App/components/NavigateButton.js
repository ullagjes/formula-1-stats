import React from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';

import AppText from './AppText'
import colors from '../config/colors';

//UNIVERSAL APP BUTTON FOR NAVIGATION BETWEEN SCREENS
function NavigateButton({ title, onPress, style }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.container, style]}
        >
            <View style={styles.textContainer}>
                <AppText style={styles.buttonText}>{title}</AppText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 25,
        textTransform: 'uppercase',
    },
    container: {
        padding: 20,
        backgroundColor: colors.primary,
        margin: 15,
        borderRadius: 15,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NavigateButton;