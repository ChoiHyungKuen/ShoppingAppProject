import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import MainHeader from '../header/MainHeader'
import { getWindowHeight } from '../common/CommonFunction';
import ProductItem from '../main/ProductItem';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { searchedProducts } =  useSelector(state => state.product);
    useEffect(() => {
        if(route.params && route.params.type === 'tab') {
            // 초기화작업진행
            alert('탭에서 서치함');
        }
    }, []);
    return ( 
        <>
            <MainHeader style={{ flex:.06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation} currentScreenName='Search' route={route}/>
            <ScrollView style={{ flex: .94 }}>
                {   searchedProducts && searchedProducts.length > 0
                    ? searchedProducts.map(product => (<ProductItem key={product.id} product={product} navigation={navigation}/>)) 
                    : <><Text>검색결과가 없습니다.</Text></>    
                }
            </ScrollView>
        </>
    );
}

export default Search;
