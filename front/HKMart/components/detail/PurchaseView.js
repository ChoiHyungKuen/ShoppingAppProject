import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Alert, TouchableOpacity, Animated, PanResponder} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addCartDone } from '../../reducers/userSlice';
import { getWindowHeight } from '../common/CommonFunction';


const PurchaseView = ( { style, navigation, product } ) => {
    const dispatch = useDispatch();
    const { onAddCartDone } = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false);
    const [qty, setQty] = useState(1);
    const [totalPrice, setTotalPrice] = useState(product.price);
    const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                return  Animated.event([
                null,
                { dx: new Animated.Value(0), dy: pan.y._value < 0 ? new Animated.Value(0) : pan.y }         // dx, dy 리턴하면서 현재위치 갱신해주는듯.. 좌우 고정, 상하에서 위로 올렸을 때 안올라가게 변경
            ], { useNativeDriver: 0})(event, gestureState)
            },
            onPanResponderRelease: () => {  
                if(pan.y._value > getWindowHeight(18)) {    // 움직이는 위치에서 일정높이 이상으로 움직이면 메뉴 사라지게 변경 
                    setShowMenu(false);
                } else {
                    Animated.spring(pan, { toValue:  { x: 0, y: 0 }, useNativeDriver: false  }).start();
                }
            }
        })
      ).current;

    onAddQty = useCallback(() => {
        setQty(prevQty => prevQty + 1);        
        
    }, [qty]);

    onMinusQty = useCallback(() => {
        if(qty === 1) {
            Alert.alert('경고', '수량은 1개보다 작을 수 없습니다.');
            return ;
        }
        setQty(prevQty => prevQty - 1);  
    }, [qty]);

    const onAddCart = useCallback(() => {
        let purchaseInfo = { ...product, qty};
        dispatch(addCart(purchaseInfo));
    }, [qty, totalPrice, product]);


    useEffect(() => {
        setTotalPrice(product.price * qty);      
    }, [qty])

    useEffect(() => {
        if(onAddCartDone) {
            Alert.alert('알림', '상품이 카트에 추가되었습니다.');
            dispatch(addCartDone());
        }
    }, [onAddCartDone]);

    renderPurchaseMenu = () => {
        if(showMenu) {
            return (
                <Animated.View
                style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }], alignItems: 'center', width: '100%'}}
                {...panResponder.panHandlers}>
                    <View style={{ height: '7%', flexDirection: 'row' }}>
                        <View style={{ width: '40%', backgroundColor:'rgba(0,0,0,0)' }}/>
                            <TouchableOpacity
                            activeOpacity={1}
                            style={{ width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor:'#e9e9e9', borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
                            onPress={() => setShowMenu(prevState => setShowMenu(!prevState))}
                            >
                            <Text>∨</Text>
                            </TouchableOpacity>
                        <View style={{ width: '40%', backgroundColor:'rgba(0,0,0,0)' }}/>
                    </View>
                    <View style={{ height: '93%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:'#e9e9e9'}}>
                        <View style={{ height: '70%', width: '90%', backgroundColor: '#ffffff' }}>
                            <View style={{ height: '20%', justifyContent: 'center' }}>
                                <Text style={{ left: 5 }}>{product.title}</Text>
                            </View>
                            <View style={{ height: '40%', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#a9a9a9', margin: 5 }}>
                                <Text style={{ left: 5 }}>${totalPrice}</Text>
                                <Text style={{ left: 5 }}>delivery pay: $2500</Text>
                            </View>
                            <View style={{ height: '40%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ width: '40%', height: '40%', flexDirection: 'row', alignItems: 'center' }}>
                                </View>
                                <View style={{ width: '40%', height: '40%', flexDirection: 'row', borderWidth: 1, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ width: '30%', alignItems: 'center' }}
                                        onPress={onMinusQty}>
                                        <Text style={{fontSize: 20 }}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '40%', alignItems: 'center' }}><Text style={{fontSize: 20 }}>{qty}</Text></View>
                                    <TouchableOpacity style={{ width: '30%', alignItems: 'center' }}
                                        onPress={onAddQty}>
                                        <Text style={{fontSize: 20 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: '20%', width: '90%',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ height: '70%', width: '45%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ff0000',
                                borderRadius: 6, backgroundColor: '#ffffff' }}
                                onPress={onAddCart}>
                                <Text style={{ color: '#ff0000', fontSize: 15 }}>장바구니 담기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: '70%', width: '45%', justifyContent: 'center', alignItems: 'center',borderRadius: 6, backgroundColor: '#ff0000' }}>
                                <Text style={{ color: '#ffffff', fontSize: 15 }}>바로구매</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Animated.View >
            );
        } else {
            return (
                <>
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#e9e9e9'}}>
                        <TouchableOpacity style={{ height: '70%', width: '80%', justifyContent: 'center', alignItems: 'center',borderRadius: 6, backgroundColor: '#ff0000' }}
                            onPress={() => { Animated.spring(pan, { toValue:  { x: 0, y: 0 }, useNativeDriver: false  }).start();setShowMenu(true)}}>
                            <Text style={{ color: '#ffffff', fontSize: 15 }}>구매하기</Text>
                        </TouchableOpacity>
                    </View>
            </>
            )
        }   
    }
    return (
        <View style={{ height: showMenu ? getWindowHeight(35) : getWindowHeight(7), width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0}}>
            {renderPurchaseMenu()}
        </View>
    );
}

export default PurchaseView;