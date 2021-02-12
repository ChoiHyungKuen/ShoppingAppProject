import React, { useState, useEffect, useCallback, memo } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { getWindowHeight, getWindowWidth } from '../common/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, changeCartQty, toggleCheckCartItem } from '../../reducers/userSlice';
import CustomPicker from '../common/CustomPicker';
import CheckBox from '@react-native-community/checkbox';

const CartItem = memo(({ cart, index, navigation }) => {


    // cartCheckedBox 로 따로 나눠서 관리해볼까?? 이미지 깜빡임 없애고 싶음
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(cart.qty < 10);  // 한번더 갱신됨 머가문제인지 모름..
    const [qtyState, setQtyState] = useState(String(cart.qty));

    const [qtyList, setQtyList] = useState([
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},
        {label: '4', value: 4},
        {label: '5', value: 5},
        {label: '6', value: 6},
        {label: '7', value: 7},
        {label: '8', value: 8},
        {label: '9', value: 9},
        {label: '10+', value: 10},
    ]);

    const onChangeQtyState = useCallback((value) => {
        if(parseInt(value) > 10) {
            Alert.alert('경고', '수량이 10보다 클 수는 없습니다.');
            return ;
        }

        setQtyState(value);
        dispatch(changeCartQty({ id: cart.id, qty: value}));
    }, [qtyState]);

    const onChangeQtyInput = useCallback((value) => {
        setShowPicker(true);
    }, []);

    const onClickRemoveBtn = useCallback((id) => () => {
        dispatch(removeCart(id));
    }, []);

    const onChanePickerValue = useCallback((id) => (itemValue) => {
        if(itemValue >= 10) {
            setShowPicker(false);
            setQtyState(String(itemValue));
        }
        dispatch(changeCartQty({ id, qty: itemValue}));
    }, [showPicker, cart.qty])

    const onToggleCheckBox = useCallback((checked) => {
        dispatch(toggleCheckCartItem({ id: cart.id, checked }))
    }, [cart.checked]); 

    const onGoProductDetail = useCallback(() => {
        navigation.push('ProductDetail', { product: { id: cart.id}});
    }, []); 

    return (
        <View style={{ flex: 1, height: getWindowHeight(20), borderBottomWidth: 1, borderBottomColor: '#e5e5e5', backgroundColor: '#ffffff'}}>
            <View style={{ height: '25%', flexDirection: 'row', alignItems: 'center', marginTop: 5, left: 10 }}>
                <CheckBox
                    style={{ width: 18, height: 18}}
                    value={cart.checked}
                    boxType='square'
                    onValueChange={onToggleCheckBox}/>
                <TouchableOpacity onPress={onGoProductDetail}><Text style={{ left: 10 }}>{cart.name}</Text></TouchableOpacity>
            </View>
            <View style={{ height: '75%', flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    style={{ width: '30%',height: '90%'}}
                    source={{
                        uri: cart.mainImageSrc,
                    }}
                    resizeMode="contain"
                />
                <View style={{ width: '60%', height: '90%', justifyContent: 'center', alignItems: 'center', paddingLeft: 20 }}>
                    <View style={{ width: '90%', height: '30%' }}>
                        <Text style={{ fontSize: 15 }}>${cart.price * cart.qty}</Text>
                    </View>

                    <View style={{ width: '90%', height: '35%'}}>
                        <TouchableOpacity 
                            style={{ width: '40%', height: '80%', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={onClickRemoveBtn(cart.id)}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 하나의 뷰로 만들면 어떨까????? 각각의 state로 관리하게 => 2wins도 이렇게 하면 어땠는지 한번 봐볼까>???*/}
                    <View style={{ width: '90%', height: '35%', flexDirection: 'row'}}>
                        {
                            showPicker
                            ? 
                            <CustomPicker
                                style={{ width: '40%', height: '80%' }}
                                key={cart.value}
                                value={cart.qty}
                                modalStyle
                                items={qtyList}
                                onValueChange={onChanePickerValue(cart.id)}/>
                            :
                            <>
                                <TextInput 
                                    style={{ width: '40%', height: '80%', justifyContent: 'center', alignItems: 'center', borderWidth: 1 }} 
                                    onChangeText={onChangeQtyState}
                                    textAlign={'center'}
                                    value={qtyState}
                                    />
                                <TouchableOpacity 
                                    style={{ width: '40%', height: '80%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, left: 10 }}
                                    onPress={onChangeQtyInput}>
                                    <Text>수량변경</Text>
                                </TouchableOpacity>
                            </>
                        }
                        
                    </View>
                </View>
            </View>
        </View>
    );
})

export default CartItem;
