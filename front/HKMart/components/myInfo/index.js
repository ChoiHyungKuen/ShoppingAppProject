import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { getWindowHeight } from '../common/CommonFunction';
import Profile from './Profile';
import MyMenu from './MyMenu';
import OrderInfo from './OrderInfo';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyInfo = ({ navigation }) => {
    const { myInfo } =  useSelector(state =>state.user);

    const onClickLogin = useCallback(() => {
        navigation.navigate('Login');
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: getWindowHeight(20), backgroundColor: '#ffffff'}}>
                {
                    myInfo != null ? <Profile /> 
                    : 
                    <>
                        <View style={{ height: '40%', justifyContent: 'flex-end', paddingLeft: 25}}>
                            <Text>로그인이 필요한 서비스입니다.</Text>
                        </View>
                        <View style={{ height: '60%', paddingLeft: 25 }}>
                            <TouchableOpacity 
                                style={{ width: '40%', height: '70%', flexDirection: 'row', alignItems: 'center'}}
                                onPress={onClickLogin}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>로그인</Text>
                                <Icon name='chevron-right' size={30} style={{ right: 5 }}/>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
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
