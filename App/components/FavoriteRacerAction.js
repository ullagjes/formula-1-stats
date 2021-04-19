import React from 'react';

import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

import colors from '../config/colors';

//RENDERS ICON WHEN RACERLISTITEM IS SWIPED RIGHT TO LEFT
function FavoriteRacerAction({ onPress, icon }) {
    return (
        <View style={styles.container}>
            <TouchableHighlight 
                onPress={onPress} 
                activeOpacity={0.2} 
                underlayColor={colors.danger}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={40}
                    color={'white'}
                    style={styles.icon}
                />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: '100%',
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.danger,
    },
    icon:{
        alignSelf: 'center',
    },
})

export default FavoriteRacerAction;