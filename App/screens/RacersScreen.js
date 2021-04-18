import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
//CONTEXT
import { useRacer } from '../context/RacerContext';
//COMPONENTS
import FavoriteRacerAction from '../components/FavoriteRacerAction';
import ListItemSeparator from '../components/ListItemSeparator'
import Screen from '../components/Screen';
import RacerListItem from '../components/RacerListItem'
import firebaseInstance from '../utils/firebaseInstance'

function RacersScreen({ navigation }) {

    const [data, setData] = useState(null);
    const driverData = useRacer()

    useEffect(() => {
        if(driverData.racerData !== null){
            console.log('Data loaded:', driverData.racerData.Drivers, 'Data finished')
            setData(driverData.racerData.Drivers)
        }

        return console.log('cleaned up')
    }, [])


    async function handleAdd(racerId, racerName) {
        //toggleHeart(racerId);
        const collection = firebaseInstance.firestore().collection('SavedRacers');
        const document = collection.doc(racerId)
        await document.get()
        .then((doc)=> {
            if(doc.exists){
                Alert.alert(racerName + ' is already added to your favorites!')
            } else {
                collection.doc(racerId).set({
                    racerId: racerId
                })
                return Alert.alert(racerName + ' is now added to your favorites!')
            }
        }).catch((error) => {
            console.error("Error adding document", error)
        })
    } 

    const [isPressed, setIsPressed] = useState(true)
    
    /*function toggleHeart(racerId){
        const bool = true
        /*let updatedData = data.map((i) => {
            if(i.driverId === racerId) {
                return {...i, bool}
            }
        })

        const dataCopy = [...data]
        const updatedData = data.findIndex(i => 
            i.driverId == racerId
        )
        dataCopy[updatedData] = {...dataCopy[updatedData], bool}
        
        console.log(dataCopy)
    }*/

    return (
        <Screen>
            <FlatList 
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
                                //toggle={item.bool}
                                />
                        )}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </Screen>
    );

    
}

const styles = StyleSheet.create({
    
})
export default RacersScreen;

/*/*await collection.doc(racerId).set({
            racerId: racerId
        })
        .then((i) => {console.log('Document written: ', i.id);
        })
        .catch((error) => {
            console.error("Error adding document", error)
        })*/