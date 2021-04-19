import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import defaultContainer from '../config/defaultContainer';
import AppText from './AppText';

//COMPONENT FOR LISTING CONSTRUCTOR DATA
function ConstructorListItem({ 
    name,
    nationality,
    position,
    points,
    wins, 
    onPress,
    renderRightActions  
}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onPress={onPress}>
                <View style={defaultContainer}>
                        <AppText style={styles.bold}>{name}</AppText>
                        <AppText>{nationality}</AppText>
                        <AppText>{position}</AppText>
                        <AppText>{wins}</AppText>
                        <AppText style={styles.bold}>{points}</AppText>
                </View>
            </TouchableOpacity>
        </Swipeable>
        
    );
};

const styles = StyleSheet.create({
    bold: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ConstructorListItem;