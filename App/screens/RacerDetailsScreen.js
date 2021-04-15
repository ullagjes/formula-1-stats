import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

//COMPONENTS
import ListItem from '../components/ListItem';
import RacerCard from '../components/RacerCard';
import Screen from '../components/Screen';
import SkeletonComponent from '../components/SkeletonComponent';

//UTILS
import { getRacerResults } from '../utils/apiHelpers'

function RacerDetailsScreen({ route }) {

    const { racer } = route.params
    const [racerData, setRacerData] = useState([])

    useEffect(() => {
            getRacerData()
            console.log("ROUTE IS", racer, "Route finished")
            return console.log('Finished')
    }, [])

    async function getRacerData(){
        const result = await getRacerResults(racer)
        setRacerData(result.MRData.RaceTable)
        
    }

    function renderRacerDetails(){
        return(
            <>
            <RacerCard racerId={racer}/>
            <FlatList
                data={racerData.Races}
                keyExtractor={data => data.raceName}
                renderItem={({ item }) => (
                    <ListItem
                        race={item.raceName}
                        circuit={item.Circuit.circuitName}
                        location={item.Circuit.Location.locality}
                        country={item.Circuit.Location.country}
                        startingPos={item.Results[0].grid}
                        finishingPos={item.Results[0].position}
                        laps={item.Results[0].laps}
                        status={item.Results[0].status}
                        points={item.Results[0].points}
                    >

                    </ListItem>
                )}
                
            />
            </>
        )
    }


    return (
        <Screen>
            {racerData === null ? <SkeletonComponent /> : renderRacerDetails()}
        </Screen>
    );
}

export default RacerDetailsScreen;