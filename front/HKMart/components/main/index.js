import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight } from '../common/CommonFunction';
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';

import { loadADImage, loadEventImages,loadMainProducts } from '../../reducers/mainSlice';

const Main = ({ navigation }) => {
    const dispatch = useDispatch();
    const { adImagePath, eventImagePath, mainProducts } =  useSelector(state => state.main);

    useEffect(() => {
        dispatch(loadMainProducts());
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
                mainProducts && mainProducts.length > 0 && mainProducts.map(product => (<ProductItem key={product.id} product={product} navigation={navigation}/>))
            }
        </ScrollView>
    );
}

export default Main;
