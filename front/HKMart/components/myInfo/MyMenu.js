import React from 'react'
import { View, Text } from 'react-native';
import { getWindowHeight } from '../common/CommonFunction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyMenu = ({ title, component }) => {
    return (
        <View style={{ height: getWindowHeight(7), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
            backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e8e8e8'}}>
            <Text style={{ fontSize: 18, left: 15 }}>{title}</Text>
            <Icon name='chevron-right' size={40} style={{ right: 5 }}/>
        </View>
    );
}

export default MyMenu;
