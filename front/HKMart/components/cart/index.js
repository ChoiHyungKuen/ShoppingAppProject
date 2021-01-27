import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight } from '../common/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, removeCartDone } from '../../reducers/userSlice';
import CommonHeader from '../header/CommonHeader';

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const { cart, onRemoveCartDone } =  useSelector(state => state.user);
    
    useEffect(() => {
        if(onRemoveCartDone) {
            alert('장바구니에서 삭제되었습니다.');
            dispatch(removeCartDone());
        }
    }, [onRemoveCartDone]);

    onClickRemoveBtn = useCallback((id) => () => {
        dispatch(removeCart(id));
    });

    return ( 
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <CommonHeader title={'장바구니'} navigation={navigation}/>
            <View style={{ flex:.94 }}>
                <FlatList 
                    data={cart}
                    renderItem={({item, index}) => (
                        <View style={{ flex: 1, height: getWindowHeight(25), borderWidth: 1}}>
                            <View style={{ height: '25%', justifyContent: 'center' }}>

                                <Text style={{ left: 10 }}>{item.title}</Text>
                            </View>
                            <View style={{ height: '75%', flexDirection: 'row', justifyContent: 'center' }}>
                                <Image
                                    style={{ width: '40%',height: '90%'}}
                                    source={{
                                        uri: item.image,
                                    }}
                                    resizeMode="contain"
                                />
                                <View style={{ width: '60%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: '90%', height: '60%', justifyContent: 'center' }}>
                                        <Text>${item.price}</Text>
                                    </View>

                                    <View style={{ width: '90%', height: '40%'}}>
                                        <TouchableOpacity 
                                            style={{ width: '30%', height: '40%', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={onClickRemoveBtn(item.id)}>
                                            <Text>삭제</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    numColumns={3}/>
            </View>
        </View>
    );
}

export default Cart;
