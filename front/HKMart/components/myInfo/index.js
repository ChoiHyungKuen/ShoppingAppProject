import React from 'react'
import { View, Text } from 'react-native';
import { getWindowHeight } from '../common/CommonFunction';
import Profile from './Profile';
import MyMenu from './MyMenu';
import OrderInfo from './OrderInfo';
const MyInfo = () => {

    return (
        <View style={{ flex: 1 }}>
            <Profile />
            <View style={{ height: getWindowHeight(0.5) }}/>
            <OrderInfo />
            <View style={{ height: getWindowHeight(0.5) }}/>
            <MyMenu title='리뷰작성' />
            <MyMenu title='고객센터' />
            <MyMenu title='환경설정' />
        </View>
    );
}

export default MyInfo; 
