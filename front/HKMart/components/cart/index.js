import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight, getWindowWidth } from '../common/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartSuccess, removeSelectedCartItem, toggleAllCheckCartItem } from '../../reducers/userSlice';
import CommonHeader from '../header/CommonHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from './CartItem';
import CheckBox from '@react-native-community/checkbox';

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const { cart, removeCartDone } =  useSelector(state => state.user);
    const [totalPrice, setTotalPrice] = useState(0);
    const [allChecked, setAllchecked] = useState(false);
    // const [arr, setArr] = useState(Array.from({ length: 10 }, (_, i) => (i+1)+""));
    useEffect(() => {
        let sum = 0;
        cart.map(item => sum += item.price);
        setTotalPrice(sum);
    }, [cart])

    useEffect(() => {
        if(removeCartDone) {
            Alert.alert('알림','장바구니에서 삭제되었습니다.');
            dispatch(removeCartSuccess());
        }
    }, [removeCartDone]);


    const onToggleAllCheckBox = useCallback((checked) => {
        dispatch(toggleAllCheckCartItem(checked))
        setAllchecked(checked)
    }, [allChecked]); 


    const onClickSelectedItemRemoveBtn = useCallback(() => {
        let checkedCart = [];
        cart.map(item => {
            if(item.checked)
                checkedCart.push(item.cartId);
        });
        if(checkedCart.length == 0) {
            Alert.alert('경고', '1개 이상의 상품을 선택해주세요.');
        } else {
            dispatch(removeSelectedCartItem({ checkedCart }));
        }
    }, [cart]);

    const renderList = ({item, index}) => (
        <CartItem cart={item} index={index} navigation={navigation}/>
    );

    const renderEmptyList = () => (
        <View style={{ flex: 1, height: getWindowHeight(50), justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='cart-outline' size={60} />
            <Text style={{ fontSize: 25 }}>{'\n'}장바구니에</Text>
            <Text style={{ fontSize: 25 }}>담긴 상품이 없습니다.</Text>
        </View>
    );
    
    return ( 
        <View style={{ flex: 1 }}>
            <CommonHeader title={'장바구니'} navigation={navigation}/>
            {
                cart.length > 0 && 
                <View style={{ flex: .05, flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e5e5e5', paddingLeft: 10 }}>
                    <View style={{ width: '70%', flexDirection: 'row' }}>
                        <CheckBox
                                style={{ width: 20, height: 20 }}
                                value={cart.length > 0 && cart.length === cart.filter(item => item.checked === true).length}
                                boxType='square'
                                onValueChange={onToggleAllCheckBox}/>
                        <Text style={{ left: 5, fontSize: 18 }}>전체선택</Text>
                    </View>
                    <TouchableOpacity 
                        style={{ width: '25%', height: '80%', borderWidth: 1, borderColor: '#e5e5e5', justifyContent: 'center', alignItems: 'center' }}
                        onPress={onClickSelectedItemRemoveBtn}>
                        <Text>삭제</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={{ flex: .75 }}>
                <FlatList 
                    data={cart}
                    renderItem={renderList}
                    keyExtractor={(item, index) => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                    ListEmptyComponent={renderEmptyList}/>
            </View>
            {
                cart.length > 0 &&

                <View style={{ flex: .14, justifyContent: 'flex-end'}}>
                <View style={{ height: '50%', backgroundColor: '#ffffff' }}>
                    <View style={{ height: '50%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '30%' }}></View>
                        <View style={{ width: '30%' }}>
                            <Text>총 상품 가격</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            
                        <Text>{totalPrice}원</Text>
                        </View>
                    </View>
                    <View style={{ height: '50%', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '30%' }}></View>
                        <View style={{ width: '30%' }}>
                            <Text>총 배송비</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            <Text>$500</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ height: '45%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000ff' }}>
                    <Text style={{ color: '#ffffff', fontSize: 18 }}>구매하기()</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}

export default Cart;
