import React, {useCallback, useEffect, useState} from 'react';
import { Button, ScrollView, Text, View, Dimensions, Image, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addCartDone } from '../../reducers/userSlice';
import ProductHeader from '../header/ProductHeader';

const windowSize = Dimensions.get('window');
const getWidth = (width) => {
    return windowSize.width * (width / 100); 
}

const getHeight = (height) => {
    return windowSize.height * (height / 100); 
}
const ProductDetail = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { onAddCartDone } = useSelector(state => state.user);
    const { product } = route.params;
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        if(onAddCartDone) {
            alert('상품이 카트에 추가되었습니다.');
            dispatch(addCartDone());
        }
    }, [onAddCartDone]);

    const onAddCart = useCallback(() => {
        dispatch(addCart(product));
    }, [])
    return (
        <View style={{ flex:1 }}>
            <ProductHeader style={{ flex: getHeight(6), flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation}/>
            <ScrollView style={{ height: showMenu ? getHeight(30) : getHeight(80), backgroundColor: ('#ffffff')}}>
                <View style={{ height: getHeight(30), backgroundColor: 'white' }}>
                    <Image
                        style={{ width: '100%',height:'90%'}}
                        source={{
                            uri: product.image,
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ height: getHeight(10), backgroundColor: '#ffffff', paddingLeft: 10 }}>
                    <View style={{ flex: .6, justifyContent: 'center' }}> 
                        <Text>{product.title}</Text>
                    </View>
                    <View style={{ flex: .4 }}>
                        <Text>${product.price}</Text>
                    </View>
                </View>
                <View style={{ height: getHeight(0.5) }}/>

                <View style={{ height: getHeight(500), backgroundColor: '#ffffff', paddingLeft: 10 }}>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.description}</Text>
                </View>
            </ScrollView>
            <View style={{ flex: showMenu ? getHeight(64) : getHeight(14), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: '10%', flexDirection: 'row' }}>
                    <View style={{ width: '45%', backgroundColor:'rgba(0,0,0,0)' }}></View>
                    <View style={{ width: '10%', backgroundColor:'rgba(0,0,0,0)' }}></View>
                    <View style={{ width: '45%', backgroundColor:'rgba(0,0,0,0)' }}></View>
                </View>
                <View style={{ height: '90%', flexDirection: 'row' }}>
                    <Button title="구매하기" onPress={() => setShowMenu(prevState => setShowMenu(!prevState))}></Button>
                    <Button title="카트추가" onPress={onAddCart}></Button>
                </View>
            </View>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={showMenu}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}>
                <View style={{ height: '20%', backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'flex-end' }}>
                    <View style={{ width: '100%', height: '20%',  flexDirection: 'row' }}>
                    <View style={{ width: '40%', height: '100%', backgroundColor:'rgba(0,0,0,0)' }}></View>
                    <View style={{ width: '20%', height: '100%', backgroundColor:'black' }}></View>
                    <View style={{ width: '40%', height: '100%', backgroundColor:'rgba(0,0,0,0)' }}></View>
                    </View>
                </View>
            </Modal> */}
        </View>
    );
}

export default ProductDetail;
