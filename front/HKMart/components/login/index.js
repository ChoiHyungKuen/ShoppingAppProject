import React, { useState, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import userInput from '../../hooks/userInput';
import { logIn } from '../../reducers/userSlice';
import { getWindowHeight } from '../common/CommonFunction';
import ProductHeader from '../header/ProductHeader';
import CryptoJS from 'react-native-crypto-js';
const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, onChangeEmail, setEmail] = userInput('');
    const [password, onChangePassword, setPassword] = userInput('');

    const onClickLoginBtn = useCallback(() => {
        let encPassword = CryptoJS.AES.encrypt(password, 'test').toString();
        dispatch(logIn({ email, encPassword }));
        navigation.goBack();
    }, [email, password]);

    const onClickRegisterBtn = useCallback(() => {
        navigation.navigate('Register');
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff'}} >
            <ProductHeader style={{ flex: .06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation} />
            <View style={{ flex: .2, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: '90%', height: '35%' }}>
                    <TextInput 
                        style={{ height: '80%', borderWidth: 1, paddingLeft: 5 }}
                        onChangeText={onChangeEmail}
                        autoCapitalize='none'
                        placeholder='아이디를 입력해주세요.'/>
                </View>
                <View style={{ width: '90%', height: '35%' }}>
                <TextInput style={{ height: '80%', borderWidth: 1}}
                        style={{ height: '80%', borderWidth: 1, paddingLeft: 5 }}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={onChangePassword}
                        placeholder='비밀번호를 입력해주세요.'/>
                </View>
            </View>
            <View style={{ flex: .08, alignItems: 'center' }}>
                <TouchableOpacity 
                    style={{ width: '90%', height: '80%', backgroundColor: '#ff0000', justifyContent:'center', alignItems: 'center'}}
                    onPress={onClickLoginBtn}>
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold' }}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: .08, alignItems: 'center' }}>
                <TouchableOpacity 
                    style={{ width: '90%', height: '80%', justifyContent:'center', alignItems: 'center'}}
                    onPress={onClickRegisterBtn}>
                    <Text style={{ fontSize: 15 }}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login; 
