import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { getRacerResults } from '../utils/apiHelpers';

import ListItem from '../components/ListItem';
import RacerCard from '../components/RacerCard';
import SkeletonComponent from '../components/SkeletonComponent';

function RacerDetailsScreen({ route }) {
    const { racer } = route.params
    const [racerData, setRacerData] = useState([])

    useEffect(() => {
            getRacerData()
            return console.log('Finished')
    }, [])

    async function getRacerData(){
        const result = await getRacerResults(racer)
        setRacerData(result.MRData.RaceTable)
    }

    function renderRacerDetails(){
        return(
            <>
                <RacerCard racerId={racer} icon={"head-flash"}/>
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
        <>
            {racerData === null ? <SkeletonComponent /> : renderRacerDetails()}
        </>
       
    );
}

export default RacerDetailsScreen;