import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../../hooks/userInput';
import { searchProducts, searchDone } from '../../reducers/productSlice';

const MainHeader = ( { style, navigation, currentScreenName, route } ) => {
    const dispatch = useDispatch();
    const [searchText, onChangeSearchText, setSearchText] = userInput('');
    const { cart, myInfo } = useSelector(state => state.user);
    const { onSearchDone } = useSelector(state => state.product);
    const onClickCartBtn = useCallback(() => {
        if(myInfo) {
            navigation.navigate('Cart');
        } else { 
            navigation.navigate('Login');
        }
    }, [myInfo]);
    const onSearch = useCallback(() => {
        dispatch(searchProducts({searchText}));
    }, [searchText]);
   
    const onClickBackBtn = useCallback(() => {
        navigation.goBack();
    });

    useEffect(() => {
        if(onSearchDone) {
            dispatch(searchDone());
            navigation.navigate('Search', { searchText });
        }
        if(route.params) {
            setSearchText(route.params.searchText);
        } 
    }, [onSearchDone])
    return (
        <SafeAreaView style={[{flex: .06, flexDirection: 'row', backgroundColor: '#ffffff'}, style]}>
            <View style={{ flexDirection: 'row', width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {
                    currentScreenName === 'Search' 
                    ?   <TouchableOpacity 
                            style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}
                            onPress={onClickBackBtn}>
                            <Icon name='arrow-left' size={30}/>
                        </TouchableOpacity>
                    : <Icon name='truck-fast' size={42} />
                }
                
            </View>
            <View style={{ flexDirection: 'row', width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TextInput 
                        style={{width: '100%', height: '90%', borderWidth: 3,borderRadius: 50, paddingLeft: 10, paddingRight: 10}}
                        onChangeText={onChangeSearchText}
                        value={searchText}
                        placeholder={'검색어를 입력해주세요.'}/>
                <TouchableOpacity style={{ justifyContent: 'center' }}
                    onPress={onSearch}>
                    <Icon name='magnify' size={24} style={{ position: 'absolute', right: 10 }}/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='cart-outline' size={30} onPress={onClickCartBtn} />
                <View style={{ position: 'absolute', top: 0, right: 20, width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold'}}>{cart.length}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MainHeader;