import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
//UTILS
//to do: make function for driverdata

//COMPONENTS
import AppTitle from '../components/AppTitle'
import RacerListItem from '../components/RacerListItem'
import Screen from '../components/Screen';
import colors from '../config/colors';

const racers = [
    'vettel', 'hamilton', 'bottas'
]

function MyRacersScreen(props) {

    const [myRacerData, setMyRacerData] = useState([])

    useEffect(() => {
        getMyRacerData()
        return console.log('finished')
        //fetch(`http://ergast.com/api/f1/drivers/vettel.json`)
        //.then((response) => response.json())
        //.then((json) => setMyRacerData(json))
        //setMyRacerData(result)
    }, [])

    async function getData() {
        return Promise.all(
            racers.map( async (i) => {
                return fetch(`http://ergast.com/api/f1/drivers/${i}.json`).then((res) => res.json())
            })
        )
    }

    async function getMyRacerData(){
        const result = await getData()
        setMyRacerData(result)
        
    }

    return (
        <Screen>
            <AppTitle style={styles.title}>Your favorite racers</AppTitle>
            <MaterialCommunityIcons
                name="heart"
                size={50}
                style={styles.icon}
                color={colors.danger}
            />
            {myRacerData.map((i, index) => {
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

/**return Promise.all(
            racers.map( async (i) => {
                return fetch(`http://ergast.com/api/f1/drivers/${i}.json`).then((res) => res.json())
            })
        ) */