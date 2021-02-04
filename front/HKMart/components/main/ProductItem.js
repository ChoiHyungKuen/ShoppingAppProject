import React from 'react';
import { Button, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { getWindowHeight } from '../common/CommonFunction';

const ProductItem = ({ product, navigation }) => {

    return (
        <>
            <View style={{ height: getWindowHeight(0.5)}}></View>
            <TouchableOpacity 
                style={{ height: getWindowHeight(30)}}
                onPress={() => navigation.navigate('ProductDetail', {product} )}>
                <View style={{ flex: .6, backgroundColor:'white', justifyContent:'center'}}>
                    <Image
                        style={{ width: '90%',height:'90%'}}
                        source={{
                            uri: product.image,
                        }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ flex: .4, backgroundColor:'white', paddingLeft: 10}}>
                    <View style={{ flex: .5, justifyContent: 'center' }}>
                        <Text>{product.name}</Text>
                    </View>
                    <View style={{ flex: .5, justifyContent: 'center' }}>
                        <Text>${product.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default ProductItem;
