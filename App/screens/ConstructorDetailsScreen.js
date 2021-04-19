import React, {  useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { getConstructorResults } from '../utils/apiHelpers';

import AppTitle from '../components/AppTitle';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';

//RENDERS RESULTS FOR CHOSEN CONSTRUCTOR
function ConstructorDetailsScreen({ route }) {

    const { constructor, name } = route.params;
    const [constructorData, setConstructorData] = useState([]);

    //DATA IS RETREIVED 
    useEffect(() => {
        getConstructorData()
        return console.log('finished')
    }, []);

    //FUNCTION USES HELPER FUNCTION TO COLLECT DATA
    async function getConstructorData(){
        const result = await getConstructorResults(constructor)
        setConstructorData(result.MRData.RaceTable)
    }

    return (
        <Screen>
            <AppTitle>{name}</AppTitle>
            <FlatList
                data={constructorData.Races}
                keyExtractor={data => data.raceName}
                renderItem={({ item }) => (
                    <ListItem
                            race={item.raceName}
                            circuit={item.Circuit.circuitName}
                            location={item.Circuit.Location.locality}
                            country={item.Circuit.Location.country}
                            startingPos={`${item.Results[0].Driver.familyName}: ${item.Results[0].grid} // ${item.Results[1].Driver.familyName}: ${item.Results[1].grid}`}
                            finishingPos={`${item.Results[0].Driver.familyName}: ${item.Results[0].position} // ${item.Results[1].Driver.familyName}: ${item.Results[1].position}`}
                            laps={`${item.Results[0].laps} // ${item.Results[1].laps}`}
                            status={`${item.Results[0].status} // ${item.Results[1].status}`}
                            points={item.Results[0].points}
                    />
                )} 
            />
        </Screen>
    );
};

export default ConstructorDetailsScreen;