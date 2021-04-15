import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

function AppTitle({ children, style }) {
    return (
        <Text style={[styles.title, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginBottom: 20,
        color: colors.danger,
    }
})


export default AppTitle;