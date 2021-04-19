import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useConstructor } from '../context/RacerContext';
import { addToFirestore } from '../utils/firebaseHelpers';

import AppText from '../components/AppText';
import AppTitle from '../components/AppTitle';
import ConstructorListItem from '../components/ConstructorListItem';
import defaultContainer from '../config/defaultContainer';
import FavoriteConstructorAction from '../components/FavoriteConstructorAction';
import Screen from '../components/Screen';

function ConstructorsScreen({ navigation }) {
    const [data, setData] = useState(null);
    const constructorData = useConstructor()

    //UPDATES STATES WITH CONSTRUCTORDATA FROM CONTEXT
    useEffect(() => {
        console.log(constructorData)
        if(constructorData !== null){
            setData(constructorData.constructorData)
        }
        return console.log('cleaned up')
    }, [])

    //ADDS DATA TO FIRESTORE
    async function handleAddConstructor(constructorId, constructorName){
        await addToFirestore('SavedConstructors', constructorId, constructorName)
    }

    return (
        <Screen>
            <View style={defaultContainer}>
                <AppTitle style={styles.title}>Constructor stats</AppTitle>
                <AppText>//Press to see results for each race.</AppText>
                <AppText>//Swipe right to left to add constructor to watchlist.</AppText>
            </View>
            {data && 
            <FlatList 
                data={data}
                keyExtractor={data => data.position}
                renderItem={({ item }) => (
                    <ConstructorListItem 
                        name={item.Constructor.name}
                        nationality={`Nationality: ${item.Constructor.nationality}`}
                        wins={`Wins: ${item.wins}`}
                        points={`Points: ${item.points}`}
                        position={`Rank: ${item.position}`}
                        onPress={() => navigation.navigate('Constructor', {
                            constructor: item.Constructor.constructorId,
                            name: item.Constructor.name
                        })}
                        constructorId={item.Constructor.constructorId}
                        renderRightActions={() => (
                            <FavoriteConstructorAction
                                onPress={() => handleAddConstructor(item.Constructor.constructorId, item.Constructor.name)}
                                icon={'heart'}
                            />
                        )}
                    />
                )}
            />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginHorizontal: 15,
    },
    title: {
        fontSize: 27,
        alignSelf: 'center',
    },
})

export default ConstructorsScreen;
