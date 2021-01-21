import React from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainHeader = ( { style } ) => {
    return (
        <SafeAreaView style={style}>
            <View style={{ flexDirection: 'row', width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='truck-fast' size={42}/>
            </View>
            <View style={{ flexDirection: 'row', width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput 
                        style={{width: '100%', height: '90%', borderWidth: 3,borderRadius: 50, paddingLeft: 10, paddingRight: 10}}
                        placeholder={'검색어를 입력해주세요.'}/>
                <Icon name='magnify' size={20} style={{ position: 'absolute', right: 10 }}/>
            </View>
            <View style={{ flexDirection: 'row', width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='cart-outline' size={30}/>
                <View style={{ position: 'absolute', top: 0, right: 20, width: 18, height: 18, borderRadius: 9, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'white', fontSize: 10}}>10</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MainHeader;