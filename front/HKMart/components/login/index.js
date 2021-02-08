import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../../hooks/userInput';
import { logIn, logInSuccess } from '../../reducers/userSlice';
import ProductHeader from '../header/ProductHeader';
import CommonHeader from '../header/CommonHeader';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { logInDone } = useSelector(state => state.user);
    const [userID, onChangeUserID, setUserID] = userInput('');
    const [password, onChangePassword, setPassword] = userInput('');

    useEffect(() => {
        if(logInDone) {
            Alert.alert('알림', '로그인 되었습니다.');
            dispatch(logInSuccess);
            navigation.goBack();
        }
    }, [logInDone]);

    const onClickLoginBtn = useCallback(() => {
        dispatch(logIn({ userID, password }));
    }, [userID, password]);

    const onClickRegisterBtn = useCallback(() => {
        navigation.navigate('Register');
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff'}} >
            <CommonHeader title={'로그인'} navigation={navigation}/>
            <View style={{ flex: .2, justifyContent: 'flex-end', alignItems: 'center' }}>
                <View style={{ width: '90%', height: '35%' }}>
                    <TextInput 
                        style={{ height: '80%', borderWidth: 1, paddingLeft: 5 }}
                        onChangeText={onChangeUserID}
                        value={userID}
                        autoCapitalize='none'
                        placeholder='아이디를 입력해주세요.'/>
                </View>
                <View style={{ width: '90%', height: '35%' }}>
                <TextInput style={{ height: '80%', borderWidth: 1}}
                        style={{ height: '80%', borderWidth: 1, paddingLeft: 5 }}
                        autoCapitalize='none'
                        value={password}
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
