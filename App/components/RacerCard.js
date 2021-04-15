import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors';

import { getRacerDetails } from '../utils/apiHelpers';

import AppText from './AppText';

function RacerCard({ racerId }) {
    
    const [racerData, setRacerData] = useState(null)

    useEffect(() => {
        getRacerInfo()
    }, [])

    async function getRacerInfo(){
        const result = await getRacerDetails(racerId)
        setRacerData(result.MRData.DriverTable.Drivers)
    }

    return (
        <View style={styles.card}>
           <View style={styles.profile}>
               {racerData !== null 
                    ? <View style={styles.textContainer}>
                        <AppText style={styles.title}>{racerData[0].givenName} {racerData[0].familyName}</AppText>
                        <AppText>Nationality: {racerData[0].nationality}</AppText>
                        <AppText>Number: {racerData[0].permanentNumber}</AppText>
                    </View>
                    : <Text>No data</Text>
               }
                <MaterialCommunityIcons
                    name="head-flash"
                    size={70}
                    style={styles.icon}
                />
           </View>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons 
                    name="heart-outline"
                    size={35}
                />
                <MaterialCommunityIcons 
                    name="arrow-right-bold-outline"
                    size={35}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: colors.primary,
        padding: 30,
        margin: 10,
        borderRadius: 15,
    },

    textContainer: {
        
        
    },

    icon: {
        backgroundColor: colors.light,
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center',
    },

    iconContainer: {
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        marginTop: 20,
    },

    profile: {
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingBottom: 20,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})

export default RacerCard;