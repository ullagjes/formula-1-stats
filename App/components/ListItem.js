import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

function ListItem({
    race, 
    circuit, 
    location,
    country, 
    startingPos, 
    finishingPos, 
    laps, 
    status, 
    points
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{race}</Text>
            <AppText>Circuit: {circuit}</AppText>
            <AppText>Location: {location}, {country}</AppText>
            <AppText>Starting position: {startingPos}</AppText>
            <AppText>Finishing position: {finishingPos}</AppText>
            <AppText>Laps: {laps}</AppText>
            <AppText>Race status: {status}</AppText>
            <AppText style={styles.points}>Points earned: {points}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        margin: 10,
        backgroundColor: colors.light,
        borderRadius: 15,
    },
    title: {
        fontSize: 20,
        paddingVertical: 10,
    },
    points: {
        fontWeight: 'bold',
    },
})

export default ListItem;