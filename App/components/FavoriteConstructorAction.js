import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

//RENDERS ICON WHEN CONSTRUCTORLISTITEM IS SWIPED RIGHT TO LEFT
function FavoriteConstructorAction({ onPress, icon }) {
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
};

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
});

export default FavoriteConstructorAction;