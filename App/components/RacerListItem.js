import React from 'react';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';
import defaultContainer from '../config/defaultContainer';

//REUSABLE COMPONENT FOR RENDERING API-DATA
function RacerListItem({ 
    children,
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
                <View style={[defaultContainer, style]}>
                    <View style={styles.mainInformation}>
                        {permanentNumber && 
                            <View style={styles.numberContainer}>
                                <Text style={styles.number}>{permanentNumber}</Text>
                            </View>
                        }
                    <Text style={styles.names}>{givenName} {familyName}</Text>
                    </View>
                    {children && <View>{children}</View>}
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    
    mainInformation: {
        flexDirection: 'row',
        marginBottom: 5,
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
        alignSelf: 'baseline',
    },

});

export default RacerListItem;