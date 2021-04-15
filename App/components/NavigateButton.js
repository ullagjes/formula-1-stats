import React from 'react';

import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText'

function NavigateButton({ title, onPress }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.textContainer}>
                <AppText style={styles.buttonText}>{title}</AppText>
            </View>
        </TouchableOpacity>
    );
}

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
})

export default NavigateButton;