import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Alert ,View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../../hooks/userInput';
import { getWindowHeight } from '../common/CommonFunction';
import ProductHeader from '../header/ProductHeader';
import { register, registerSuccess } from '../../reducers/userSlice';
import CheckBox from '@react-native-community/checkbox';
import CommonHeader from '../header/CommonHeader';
const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const { registerDone } = useSelector(state => state.user);
    const [userID, onChangeUserID, setUserID] = userInput('');
    const [email, onChangeEmail, setEmail] = userInput('');
    const [password, onChangePassword, setPassword] = userInput('');
    const [passwordCheck, onChangepasswordCheck, setPasswordCheck] = userInput('');
    const [name, onChangeName, setName] = userInput('');
    const [phone, onChangePhone, setPhone] = userInput('');
    const [address, onChangeAddress, setAddress] = userInput('');
    const [agreeCheck, setAgreeCheck] = useState(false);

    useEffect(() => {
        if(registerDone) {
            Alert.alert('알림','회원가입 되었습니다.');
            navigation.replace('Login');
            dispatch(registerSuccess());
        }
    }, [registerDone]);

    const onToggleCheckBox = useCallback((checked) => {
        setAgreeCheck(checked);
    }, [agreeCheck]); 

    const onRegister = useCallback(() => {
        if(!userID) {
            Alert.alert('경고', 'ID를 입력하지 않았습니다.');
            return; 
        } else if(!name) {
            Alert.alert('경고', '이름을 입력하지 않았습니다.');
            return; 
        } else if(!password) {
            Alert.alert('경고', '비밀번호를 입력하지 않았습니다.');
            return; 
        } else if(!passwordCheck) {
            Alert.alert('경고', '비밀번호 확인을 입력하지 않았습니다.');
            return; 
        } else if(!email) {
            Alert.alert('경고', '이메일을 입력하지 않았습니다.');
            return; 
        } else if(!phone) {
            Alert.alert('경고', '전화번호를 입력하지 않았습니다.');
            return; 
        } else if(!address) {
            Alert.alert('경고', '주소를 입력하지 않았습니다.');
            return; 
        } else if(password !== passwordCheck) {
            Alert.alert('알림','비밀번호와 비밀번호 확인이 맞지 않습니다.');
            return ;
        } else if(!agreeCheck) {
            Alert.alert('알림','약관에 동의 하지 않으셨습니다.');
            return ;
        }

        dispatch(register({ email, password, passwordCheck, name, userID, phone, address }));
    }, [email, password, passwordCheck, name, userID, phone, address]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <CommonHeader title={'회원가입'} navigation={navigation}/>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>사용자 ID</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='사용자 ID'
                        onChangeText={onChangeUserID}
                        value={userID}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>이름</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='이름'
                        onChangeText={onChangeName}
                        value={name}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>이메일</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='이메일'
                        onChangeText={onChangeEmail}
                        value={email}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15  }}>
                    <Text style={{ fontSize: 16 }}>비밀번호</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='비밀번호'
                        onChangeText={onChangePassword}
                        value={password}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>비밀번호 확인</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='비밀번호 확인'
                        onChangeText={onChangepasswordCheck}
                        value={passwordCheck}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>핸드폰</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='전화번호, - 없이 입력해주세요.'
                        onChangeText={onChangePhone}
                        value={phone}/>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row' }}>
                <View style={{ width: '30%',justifyContent: 'center', left: 15 }}>
                    <Text style={{ fontSize: 16 }}>주소</Text>
                </View>
                <View style={{ width: '70%',justifyContent: 'center' }}>
                    <TextInput 
                        style={{ width: '90%', height: '60%', borderWidth: 1, paddingLeft: 10}}
                        placeholder='주소'
                        onChangeText={onChangeAddress}
                        value={address}/>
                </View>
            </View>
            <View style={{ flex: .36 }}>
                <View style={{ height: '10%' }}>
                    <Text style={{ left: 20 }}>쿠팡 서비스약관에 동의합니다.</Text>
                </View>
                <View style={{ height: '10%', paddingLeft: 20, flexDirection: 'row' }}>
                    <CheckBox
                        style={{ width: 18, height: 18}}
                        value={agreeCheck}
                        boxType='square'
                        onValueChange={onToggleCheckBox}/>
                    <Text style={{ left: 10 }}> 약관에 모두 동의합니다.</Text>
                </View>
                <View style={{ height: '80%', width: '90%', borderWidth: 1, alignSelf: 'center' }}>
                    <Text>이용약관!</Text>
                </View>
            </View>
            <View style={{ flex: .08, flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                <TouchableOpacity 
                    style={{ width: '90%', height: '80%', justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}
                    onPress={onRegister}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Register; 
