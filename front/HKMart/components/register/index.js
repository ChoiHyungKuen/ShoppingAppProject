import React from 'react'
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getWindowHeight } from '../common/CommonFunction';
const Register = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            
            <View style={{ height: '40%', flexDirection: 'row', paddingLeft: 25}}>
                <View style={{ width: '85%', justifyContent: 'center' }}>
                    <View style={{ height: '65%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text>회원가입 페이지 </Text>
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
        </View>
    );
}

export default Register; 
