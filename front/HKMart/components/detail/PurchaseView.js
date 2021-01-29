import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Animated, PanResponder} from 'react-native';
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
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gestureState) => {
              return  Animated.event([
                null,
                { dx: pan.x, dy: pan.y},
              ])(event, gestureState)
          },
          onPanResponderRelease: () => {
            Animated.spring(pan, { toValue:  { x: 0, y: 0 }  }).start();
          }
        })
      ).current;


    onAddQty = useCallback(() => {
        setQty(prevQty => prevQty + 1);        
        
    }, [qty]);

    onMinusQty = useCallback(() => {
        if(qty === 1) {
            alert('수량은 1개보다 작을 수 없습니다.');
            return ;
        }
        setQty(prevQty => prevQty - 1);  
    }, [qty]);

    const onAddCart = useCallback(() => {
        let purchaseInfo = { ...product, qty};
        dispatch(addCart(purchaseInfo));
    }, [qty, totalPrice]);


    useEffect(() => {
        setTotalPrice(product.price * qty);      
    }, [qty])

    useEffect(() => {
        if(onAddCartDone) {
            alert('상품이 카트에 추가되었습니다.');
            dispatch(addCartDone());
        }
    }, [onAddCartDone]);

    renderPurchaseMenu = () => {
        if(showMenu) {
            return (
                <>
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
                </>
            );
        } else {
            return (
                <>
                    <View style={{ height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#e9e9e9'}}>

                        <TouchableOpacity style={{ height: '70%', width: '80%', justifyContent: 'center', alignItems: 'center',borderRadius: 6, backgroundColor: '#ff0000' }}
                            onPress={() => setShowMenu(true)}>
                            <Text style={{ color: '#ffffff', fontSize: 15 }}>구매하기</Text>
                        </TouchableOpacity>
                    </View>
            </>
            )
        }   
    }
    return (
        <Animated.View
            style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }],height: showMenu ? getWindowHeight(35) : getWindowHeight(7), width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0}}
            
            {...panResponder.panHandlers}>
            {renderPurchaseMenu()}
        </Animated.View >
    );
}

export default PurchaseView;