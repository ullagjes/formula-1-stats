import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getRacerStandings } from '../utils/apiHelpers';

import AppText from './AppText';
import colors from '../config/colors';

//CREATES A COMPONENT WITH API DATA RELEVANT TO SELECTED RACER
function RacerCard({ racerId, icon, style }) {
    
    const [racerData, setRacerData] = useState(null)

    //FETCHES API DATA WHEN SCREEN IS LOADED
    useEffect(() => {
        getRacerInfo()
    }, [])

    //USES HELPER FUNCTION TO RETREIVE DATA
    async function getRacerInfo(){
        const result = await getRacerStandings(racerId)
        setRacerData(result.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    }

    return (
        <View style={[styles.card, style]}>
           <View style={styles.profile}>
               {racerData !== null 
                    ? <View style={styles.textContainer}>
                        <AppText style={styles.title}>{racerData[0].Driver.givenName} {racerData[0].Driver.familyName}</AppText>
                        <AppText>Nationality: {racerData[0].Driver.nationality}</AppText>
                        <AppText>Number: {racerData[0].Driver.permanentNumber}</AppText>
                        <AppText>Current rank: {racerData[0].position}</AppText>
                        <AppText>Current points: {racerData[0].points}</AppText>
                    </View>
                    : <Text>Loading data...</Text>
               }
                <MaterialCommunityIcons
                    name={icon}
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
        padding: 15,
        marginBottom: 10,
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