import React from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getWindowHeight } from '../common/CommonFunction';
const Profile = () => {
    return (
        <>
            <View style={{ height: '40%', flexDirection: 'row', paddingLeft: 25}}>
                <View style={{ width: '85%', justifyContent: 'center' }}>
                    <View style={{ height: '65%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>최형근</Text>
                        <Text>님은 </Text>
                        <Text style={{ fontSize: 20, color: '#ff0000'}}>FAMILY</Text>
                        <Text> 고객입니다.</Text>
                    </View>
                    <View style={{ height: '35%', flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text>등급혜택 보기</Text><Icon name='play' size={12}/></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', left: 10 }}><Text>내 정보 관리</Text><Icon name='play' size={12}/></View>
                    </View>
                </View>
                <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='bell-outline' size={30}/>
                    <View style={{ width: 12, height: 12, backgroundColor: 'red', borderRadius: 6, position: 'absolute', top: 20, right: 15}}></View>
                </View>
            </View>
            <View style={{ height: '60%', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '90%', height: '80%', borderRadius: 10, alignItems: 'center', backgroundColor: '#e8e8e8' }}>
                    <View style={{ width: '50%', height: '70%', borderRightWidth: 1, borderRightColor: '#c0c0c0', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13 }}>HK-포인트</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0P</Text>
                    </View>
                    <View style={{ width: '50%', height: '70%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13 }}>할인쿠폰</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>0장</Text>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Profile; 
