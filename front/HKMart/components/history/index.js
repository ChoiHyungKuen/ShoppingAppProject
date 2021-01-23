import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native';
import { getWindowHeight, getWindowWidth } from '../common/CommonFunction';

const History = () => {
    const [hitoryList, setHitoryList] = useState([
        { name: 'test'},
        { name: 'test'},
        { name: 'test'},
        { name: 'test'},
        { name: 'test'},
        { name: 'test'},
    ]);
    return (
        <View>
            <Text>History</Text>
            <FlatList 
                data={hitoryList}
                renderItem={({item}) => (
                    <View style={{ flex: 1, height: getWindowHeight(20), borderWidth: 1}}><Text>{item.name}</Text></View>
                )}
                numColumns={3}/>
        </View>
    );
}

export default History; 
