import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
//CONTEXT
import { useRacer } from '../context/RacerContext';
//COMPONENTS
import AddRacerToFavorites from '../components/AddRacerToFavorites';
import ListItemSeparator from '../components/ListItemSeparator'
import Screen from '../components/Screen';
import RacerListItem from '../components/RacerListItem'


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
                        renderRightActions={() => <AddRacerToFavorites onPress={() => console.log(item.driverId)}/>}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </Screen>
    );
}

export default RacersScreen;