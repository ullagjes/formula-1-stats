import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../config/colors';

function RacerListItem({ 
    givenName, 
    familyName, 
    permanentNumber,
    nationality, 
    onPress,
    style,
    renderRightActions  
}) {
    
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.itemContainer, style]}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.number}>{permanentNumber}</Text>
                    </View>
                    <Text style={styles.names}>{givenName} {familyName}</Text>
                    
                </View>
            </TouchableOpacity>
        </Swipeable>
        
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    names: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    
    },
    numberContainer: {
        backgroundColor: colors.danger,
        width: 40,
        height: 40,
        marginRight: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },

})

export default RacerListItem;