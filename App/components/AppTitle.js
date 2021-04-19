import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../config/colors';

//COMPONENT FOR STANDARD TITLE STYLE IN APP
function AppTitle({ children, style }) {
    return (
        <Text style={[styles.title, style]}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginBottom: 20,
        color: colors.danger,
        marginHorizontal: 10,
    }
});


export default AppTitle;