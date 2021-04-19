import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import firebaseInstance from '../utils/firebaseInstance';
import { getRacerStandings } from '../utils/apiHelpers';
import { deleteFromFirestore } from '../utils/firebaseHelpers';

import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import defaultContainer from '../config/defaultContainer';
import FavoriteRacerAction from '../components/FavoriteRacerAction';
import RacerListItem from '../components/RacerListItem';
import Screen from '../components/Screen';

function MyRacersScreen({ navigation }) {
    
    const [theData, setTheData] = useState([])
    const [myRacerData, setMyRacerData] = useState(null)

    //REALTIME DATA FROM FIRESTORE
    useEffect(() => { 
        let ref = firebaseInstance
        .firestore()
        .collection('SavedRacers')
        ref.onSnapshot((snapshot) => {
            let data = []
            snapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setTheData(data)
        })
    }, []);

    //FETCH DATA FROM API
    useEffect(() => {
        getMyRacerData()
    }, [theData])

    //RETURNS DETAILS FOR ALL SELECTED RACERS IN FIRESTORE DATA
    async function getData() {
        return Promise.all(
            theData.map( async (i) => {
                return getRacerStandings(i.racerId)
            })
        )
    }

    //ADDS RACER DETAILS TO STATE
    async function getMyRacerData(){
        const result = await getData()
        setMyRacerData(result) 
    }

    //FILTERS DATA FOR DRIVERID. USED AS PARAMETER IN DELETE FUNCTION
    function filterData(driverId){
        return theData.filter((i) => i.racerId === driverId)
    }

    //DELETES DRIVER FROM FIRESTORE COLLECTION
    async function handleDeleteRacer(driverId){
        let driver = filterData(driverId)
        return deleteFromFirestore(driver.id, 'SavedRacers', driverId)   
    }

    return (
        <Screen>
            <View style={defaultContainer}>
                <AppTitle style={styles.title}>Your favorites</AppTitle>
                <AppText>//Press to see results from each race // Swipe right to left to delete racer from favorites.</AppText>   
            </View>
            {myRacerData === null 
                ? <AppText>No favorites added.</AppText> 
                : <FlatList
                    data={myRacerData}
                    keyExtractor={(data, index)=> index.toString()}
                    renderItem={({ item }) => (
                        <RacerListItem
                            givenName={item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName}
                            familyName={item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName}
                            onPress={() => navigation.navigate('Racer', {
                                racer: item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId
                            })}
                            renderRightActions={() => (
                                <FavoriteRacerAction 
                                    onPress={() => handleDeleteRacer(item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId)}
                                    icon={"trash-can-outline"}
                                />
                            )}
                        >
                            <View>
                                <AppText>Current rank: {item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position}</AppText>
                                <AppText>Wins 2020: {item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins}</AppText>
                                <AppText>Current points: {item.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points}</AppText>
                            </View>
                        </RacerListItem>
                    )}
                />
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        paddingTop: 20,
    },
})

export default MyRacersScreen;
