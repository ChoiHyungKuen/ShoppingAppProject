import React, { useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const ProductHeader = ( { style, navigation } ) => {
    
    const { cart } = useSelector(state => state.user)
    const onClickBackBtn = useCallback(() => {
        navigation.goBack();
    });

    const onClickCartBtn = useCallback(() => {
        navigation.navigate('Cart');
    }, []);

    return (
        <SafeAreaView style={[{flex: .06, flexDirection: 'row', backgroundColor: '#ffffff'}, style]}>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center' }}>
                <TouchableOpacity 
                    style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                    onPress={onClickBackBtn}>
                    <Icon name='arrow-left' size={30}/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '40%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>상품정보</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='share-variant' size={30}/>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='cart-outline' size={30} onPress={onClickCartBtn}/>
                    <View style={{ position: 'absolute', top: -10, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold'}}>{cart.length}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ProductHeader;