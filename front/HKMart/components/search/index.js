import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import MainHeader from '../header/MainHeader'
import { getWindowHeight } from '../common/CommonFunction';
import ProductItem from '../main/ProductItem';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ navigation }) => {
    const dispatch = useDispatch();
    const { searchedProducts } =  useSelector(state => state.product);

    useEffect(() => {
        
    }, []);

    return ( 
        <>
            <MainHeader style={{ flex:.06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation} currentScreenName='Search'/>
            <ScrollView style={{ flex: .94, backgroundColor: ('#ffffff') }}>
                { searchedProducts && searchedProducts.map(product => (<ProductItem key={product.id} product={product} navigation={navigation}/>)) }
            </ScrollView>
        </>
    );
}

export default Search;
