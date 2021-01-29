import React, {useCallback, useEffect, useState} from 'react';
import { Button, ScrollView, Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import ProductHeader from '../header/ProductHeader';
import PurchaseView from './PurchaseView';
import { getWindowHeight } from '../common/CommonFunction';

const ProductDetail = ({ route, navigation }) => {
    const { product } = route.params;

    return (
        <View style={{ flex:1 }}>
            <ProductHeader style={{ flex:.06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation}/>
            <ScrollView style={{ flex: .94, backgroundColor: ('#ffffff') }}>
                <View style={{ height: getWindowHeight(30), backgroundColor: 'white' }}>
                    <Image
                        style={{ width: '100%',height:'90%'}}
                        source={{
                            uri: product.image,
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ height: getWindowHeight(10), backgroundColor: '#ffffff', paddingLeft: 10 }}>
                    <View style={{ flex: .6, justifyContent: 'center' }}> 
                        <Text>{product.title}</Text>
                    </View>
                    <View style={{ flex: .4 }}>
                        <Text>${product.price}</Text>
                    </View>
                </View>
                <View style={{ height: getWindowHeight(0.5) }}/>

                <View style={{ height: getWindowHeight(500), backgroundColor: '#ffffff', paddingLeft: 10 }}>
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
            <PurchaseView product={product}/>
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
