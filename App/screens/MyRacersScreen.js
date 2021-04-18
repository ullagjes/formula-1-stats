import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//UTILS
import firebaseInstance from '../utils/firebaseInstance';
import { getRacerDetails } from '../utils/apiHelpers';
import { deleteFromFirestore } from '../utils/firebaseHelpers';
//COMPONENTS
import AppTitle from '../components/AppTitle';
import RacerListItem from '../components/RacerListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';
import FavoriteRacerAction from '../components/FavoriteRacerAction';

function MyRacersScreen({ navigation }) {
    
    const [theData, setTheData] = useState([])
    const [myRacerData, setMyRacerData] = useState(null)

    //REALTIME DATA FROM FIRESTORE
    useEffect(() => { 
        let ref = firebaseInstance
        .firestore()
        .collection('SavedRacers')
        return ref.onSnapshot((snapshot) => {
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
                return getRacerDetails(i.racerId)
            })
        )
    }

    //ADDS DETAILS TO STATE
    async function getMyRacerData(){
        const result = await getData()
        setMyRacerData(result) 
    }

    //FILTERS DATA FOR DRIVERID. USED AS PARAMETER IN DELETE FUNCTION
    function filterData(driverId){
        return theData.filter((i) => i.racerId === driverId)
    }

    //DELETES DRIVER FROM FIRESTORE COLLECTION
    async function handleDelete(driverId){
        let driver = filterData(driverId)
        return deleteFromFirestore(driver[0].id, 'SavedRacers', driverId)   
    }

    return (
        <Screen>
            <AppTitle style={styles.title}>Your favorite racers</AppTitle>
            {myRacerData === null ? <Text>Loading data...</Text> : myRacerData.map((i, index) => {
                return(
                    <View key={index}>
                        <FlatList
                            data={i.MRData.DriverTable.Drivers}
                            keyExtractor={data => data.driverId}
                            renderItem={({ item }) => (
                                <RacerListItem
                                    givenName={item.givenName}
                                    familyName={item.familyName}
                                    permanentNumber={item.permanentNumber}
                                    style={styles.listItem}
                                    onPress={() => navigation.navigate('Racer', {
                                        racer: item.driverId
                                    })}
                                    renderRightActions={() => <FavoriteRacerAction 
                                        onPress={() => handleDelete(item.driverId)}
                                        icon={"trash-can-outline"}
                                    />}
                                />
                            )}
                        />
                    </View>
                )
            })}
        </Screen>
    );
}

const styles = StyleSheet.create({
    icon : {
        alignSelf: 'center',
        marginVertical: 15,
    },
    listItem: {
        backgroundColor: colors.light,
        paddingVertical: 15,
    },
    title: {
        fontSize: 30,
        paddingTop: 20,
    },
})

export default MyRacersScreen;

/*
//return fetch(`http://ergast.com/api/f1/drivers/${i.racerId}.json`).then((res) => res.json())
        
        /*const collection = firebaseInstance
        .firestore()
        .collection('SavedRacers')

        const document = await collection.doc(driver[0].id).delete()
        .then(() => {
            console.log('Deleted!')
        }).catch((error) => {
            console.error('error', error)
        })

async function getPreviousData(collectionName) {
        const collection = firebaseInstance.firestore().collection(collectionName)
        const readCollection = await collection.get()

        const returnedArray = []
        
        readCollection.forEach(item => {
            returnedArray.push({
                id: item.id,
                ...item.data()
            })
        })

        return setTheData(returnedArray)
    }

*return Promise.all(
            racers.map( async (i) => {
                return fetch(`http://ergast.com/api/f1/drivers/${i}.json`).then((res) => res.json())
            })
        ) */