import React from 'react';

import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import colors from '../config/colors';

function FavoriteRacerAction({ onPress, icon, toggle }) {
    
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={onPress} activeOpacity={0.2} underlayColor={colors.danger}>
                <MaterialCommunityIcons
                    name={icon}
                    size={40}
                    color={toggle ? 'red' : 'white'}
                    style={styles.icon}
                />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: colors.danger,
    },
    icon:{
        alignSelf: 'center',
    },
})

export default FavoriteRacerAction;