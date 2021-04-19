import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { addToFirestore } from '../utils/firebaseHelpers';
import { useRacer } from '../context/RacerContext';

import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import defaultContainer from '../config/defaultContainer';
import FavoriteRacerAction from '../components/FavoriteRacerAction';
import RacerListItem from '../components/RacerListItem';
import Screen from '../components/Screen';

function RacersScreen({ navigation }) {
    const [data, setData] = useState(null);
    const driverData = useRacer()

    //UPDATES STATES WITH DRIVERDATA FROM CONTEXT
    useEffect(() => {
        if(driverData.racerData !== null){
            setData(driverData.racerData.Drivers)
        }
        return console.log('driverdata', data)
    }, [])

    //ALLOWS USER TO ADD RACER TO FAVORITES
    //STORES DATA IN FIRESTORE
    async function handleAdd(racerId, racerName) {
        await addToFirestore('SavedRacers', racerId, racerName)
    } 

    return (
        <>
            <View style={defaultContainer}>
                <AppTitle style={styles.title}>Racer stats</AppTitle>
                <AppText>//Press to see results for each race.</AppText>
                <AppText>//Swipe right to left to add constructor to watchlist.</AppText>
            </View>
            {data && 
                <FlatList 
                    style={styles.container}
                    data={data}
                    keyExtractor={data => data.driverId}
                    renderItem={({ item }) => (
                        <RacerListItem
                            givenName={item.givenName}
                            familyName={item.familyName}
                            permanentNumber={item.permanentNumber}
                            onPress={() => navigation.navigate('Racer', {
                                racer: item.driverId
                            })}
                            renderRightActions={() => (
                                <FavoriteRacerAction 
                                    onPress={() => handleAdd(item.driverId, item.familyName)} 
                                    icon={"heart"}
                                />
                            )}
                        />
                    )}
                />}
        </>
    );    
}
const styles = StyleSheet.create({
    container: {
        overflow: 'scroll',
        marginVertical: 10,
    }
})

export default RacersScreen;