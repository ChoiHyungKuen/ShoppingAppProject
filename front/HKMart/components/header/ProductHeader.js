import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductHeader = ( { style, navigation } ) => {
    
    const onClickBackBtn = useCallback(() => {
        navigation.goBack();
    });

    return (
        <SafeAreaView style={style}>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity 
                    style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={onClickBackBtn}>
                    <Icon name='arrow-left' size={30}/>
                </TouchableOpacity>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='home-outline' size={30}/>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '40%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>상품정보</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='share-variant' size={30}/>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='cart-outline' size={30} />
                    <View style={{ position: 'absolute', top: -5, right: 6, width: 18, height: 18, borderRadius: 9, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ color: 'white', fontSize: 10}}>10</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ProductHeader;