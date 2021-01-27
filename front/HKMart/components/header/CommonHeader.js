import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommonHeader = ( { style, navigation, title} ) => {
    
    const onClickBackBtn = useCallback(() => {
        navigation.goBack();
    });

    return (
        <SafeAreaView style={[{ flex:.06, flexDirection: 'row', backgroundColor: '#ffffff'}, style]}>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={onClickBackBtn}>
                    <Icon name='arrow-left' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '40%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            </View>
        </SafeAreaView>
    );
}

export default CommonHeader;