import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight } from '../common/CommonFunction';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../reducers/productsSlice';
import { loadADImage, loadEventImages } from '../../reducers/mainSlice';

const Main = ({ navigation }) => {
    const dispatch = useDispatch();
    const { products } =  useSelector(state => state.products);
    const { adImagePath, eventImagePath } =  useSelector(state => state.main);

    
    useEffect(() => {
        dispatch(loadProducts());
        dispatch(loadADImage());
        dispatch(loadEventImages());
    }, []);

    return ( 
        <ScrollView style={{ flex: 1 }}>
            <ImageBackground
                style={{ height: getWindowHeight(30), width:'100%'}}
                source={{
                    uri: adImagePath,
                }}
                resizeMode="cover">
            </ImageBackground>
            <View style={{ height: getWindowHeight(30)}}>
                <SliderBox
                    autoplayDelay={2000}
                    images={eventImagePath}
                    autoplay
                    circleLoop
                    paginationBoxVerticalPadding={10}
                    style={{ height: '100%'}}
                />
            </View>
            {
                products && products.map(product => (<Product key={product.id} product={product} navigation={navigation}/>))
            }
        </ScrollView>
    );
}

export default Main;
