import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import { deleteFromFirestore } from '../utils/firebaseHelpers';
import firebaseInstance from '../utils/firebaseInstance';
import { getConstructorDetails } from '../utils/apiHelpers'

import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import ConstructorListItem from '../components/ConstructorListItem';
import FavoriteRacerAction from '../components/FavoriteRacerAction';
import defaultContainer from '../config/defaultContainer';
import Screen from '../components/Screen';

//COMPONENT USES STORED DATA FROM FIRESTORE TO RETREIVE RELEVANT DATA
function MyConstructorsScreen({ navigation }) {
    const [constructorData, setConstructorData] = useState([])
    const [myConstructorData, setMyConstructorData] = useState(null)

    //REALTIME DATA FROM FIRESTORE
    useEffect(() => { 
        let newRef = firebaseInstance
        .firestore()
        .collection('SavedConstructors')
        return newRef.onSnapshot((snapshot) => {
            let newData = []
            snapshot.forEach((doc) => {
                newData.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setConstructorData(newData)
        })
        
    }, []);

    useEffect(() => {
        getMyConstructorData()
    }, [constructorData])

    //RETURNS DETAILS FOR ALL SELECTED CONSTRUCTORS IN FIRESTORE DATA
    async function getConstructorData(){
        return Promise.all(
            constructorData.map( async (i) => {
                return getConstructorDetails(i.racerId)
            })
        )
    }

    //ADDS CONSTRUCTOR DETAILS TO STATE
    async function getMyConstructorData(){
        const result = await getConstructorData()
        setMyConstructorData(result)
    }

    //FILTERS DATA FOR DELETE FUNCTION
    function filterConstructorData(constructorId){
        return constructorData.filter((i) => i.racerId === constructorId)
    }

    //DELETES CONSTRUCTOR FROM FIRESTORE COLLECTION
    async function handleDeleteConstructor(constructorId){
        let constructor = filterConstructorData(constructorId)
        return deleteFromFirestore(constructor[0].id, 'SavedConstructors', constructorId)
    }

    return (
        <Screen>
            <View style={defaultContainer}>
                <AppTitle style={styles.title}>Your favorites</AppTitle>
                <AppText>//Press to see results from each race // Swipe right to left to delete racer from favorites.</AppText>
            </View>
            {myConstructorData === null 
            ? <Text>Loading data...</Text> 
            : <FlatList 
                data={myConstructorData}
                keyExtractor={(data, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <ConstructorListItem 
                            name={item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.name}
                            nationality={item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.nationality}
                            position={`Rank: ${item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].position}`}
                            points={`Points earned: ${item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].points}`}
                            wins={`Wins: ${item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].position}`}
                            onPress={() => navigation.navigate('Constructor', {
                                constructor: item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.constructorId,
                                name: item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.name
                            })}
                            renderRightActions={() => (
                                <FavoriteRacerAction 
                                onPress={() => handleDeleteConstructor(item.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.constructorId)}
                                icon={"trash-can-outline"}
                                />
                            )}
                        />
                    </View>
                )}
            />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        paddingTop: 20,
    },
})

export default MyConstructorsScreen;