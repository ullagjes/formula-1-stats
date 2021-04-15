import React from 'react';

import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../config/colors';

function AddRacerToFavorites({ onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons
                    name="heart-outline"
                    size={40}
                    style={styles.icon}
                />
            </TouchableOpacity>
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

export default AddRacerToFavorites;