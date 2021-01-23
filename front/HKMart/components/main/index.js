import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import faker from 'faker';
import { getWindowHeight } from '../common/CommonFunction';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../reducers/productsSlice';

const Main = ({ navigation }) => {
    const dispatch = useDispatch();
    const { products } =  useSelector(state => state.products)
    console.log(faker.commerce.productMaterial());
    const [images, setImages] = useState([
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree" // Network image
    ]);
    useEffect(() => {
        dispatch(loadProducts());
    }, []);
    return (
        <ScrollView style={{ flex: 1}}>
            <ImageBackground
                style={{ height: getWindowHeight(30), width:'100%'}}
                source={{
                    uri: 'https://source.unsplash.com/1024x768/?ad',
                }}
                resizeMode="cover">
            </ImageBackground>
            <View style={{ height: getWindowHeight(30)}}>
                <SliderBox
                    autoplayDelay={2000}
                    images={images}
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
