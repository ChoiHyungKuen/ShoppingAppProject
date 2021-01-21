import React from 'react';
import { Button, ScrollView, Text, View, Dimensions, Image } from 'react-native';
import ProductHeader from '../header/ProductHeader';

const windowSize = Dimensions.get('window');
const getWidth = (width) => {
    return windowSize.width * (width / 100); 
}

const getHeight = (height) => {
    return windowSize.height * (height / 100); 
}
const ProductDetail = ({ route, navigation }) => {

    const { product } = route.params;
    
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
            <View style={{ flex:.1, borderWidth:1, justifyContent: 'center' }}>

                <Button title="구매하기"></Button>
            </View>
        </View>
    );
}

export default ProductDetail;
