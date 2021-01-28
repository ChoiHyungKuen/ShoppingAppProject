import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight } from '../common/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, removeCartDone } from '../../reducers/userSlice';
import CommonHeader from '../header/CommonHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const { cart, onRemoveCartDone } =  useSelector(state => state.user);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let sum = 0;
        cart.map(item => sum += item.price);
        setTotalPrice(sum);
    }, [cart])

    useEffect(() => {
        if(onRemoveCartDone) {
            alert('장바구니에서 삭제되었습니다.');
            dispatch(removeCartDone());
        }
    }, [onRemoveCartDone]);

    onClickRemoveBtn = useCallback((id) => () => {
        dispatch(removeCart(id));
    });

    const renderList = ({item, index}) => (
        <View style={{ flex: 1, height: getWindowHeight(20), borderBottomWidth: 1, backgroundColor: '#ffffff'}}>
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
                            style={{ width: '30%', height: '50%', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={onClickRemoveBtn(item.id)}>
                            <Text>삭제</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
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
            <View style={{ flex:.84 }}>
                <FlatList 
                    data={cart}
                    renderItem={renderList}
                    ListEmptyComponent={renderEmptyList}/>
            </View>
            <View style={{ flex: .1, backgroundColor: '#ffffff'}}>
                <View style={{ height: '60%', justifyContent: 'space-around' }}>
                    <View style={{ height: '50%', flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ width: '30%' }}></View>
                        <View style={{ width: '30%' }}>
                            <Text>총 상품 가격</Text>
                        </View>
                        <View style={{ width: '30%' }}>
                            
                        <Text>${totalPrice}</Text>
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
                <View style={{ height: '40%' }}></View>
            </View>
        </View>
    );
}

export default Cart;
