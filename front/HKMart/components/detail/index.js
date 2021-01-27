import React, {useCallback, useEffect} from 'react';
import { Button, ScrollView, Text, View, Dimensions, Image } from 'react-native';
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
            <ProductHeader style={{ flex: .06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation}/>
            <ScrollView style={{ flex:.84 }}>
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
            <View style={{ flex:.1, flexDirection: 'row', borderWidth:1, justifyContent: 'center' }}>

                <Button title="구매하기"></Button>
                <Button title="카트추가" onPress={onAddCart}></Button>
            </View>
        </View>
    );
}

export default ProductDetail;
