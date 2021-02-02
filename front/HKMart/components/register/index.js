import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Alert ,View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import userInput from '../../hooks/userInput';
import { getWindowHeight } from '../common/CommonFunction';
import ProductHeader from '../header/ProductHeader';
import { register, registerDone } from '../../reducers/userSlice';
const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const { onRegisterDone } = useSelector(state => state.user);
    const [email, onChangeEmail, setEmail] = userInput('');
    const [password, onChangePassword, setPassword] = userInput('');
    const [passwordCheck, onChangepasswordCheck, setPasswordCheck] = userInput('');
    const [name, onChangeName, setName] = userInput('');
    

    useEffect(() => {
        if(onRegisterDone) {
            Alert.alert('알림','회원가입 되었습니다.');
            navigation.replace('Login');
            dispatch(registerDone());
        }
    }, [onRegisterDone]);

    const onRegister = useCallback(() => {
        if(password !== passwordCheck) {
            Alert.alert('알림','비밀번호와 비밀번호 확인이 맞지 않습니다.');
            return ;
        }
        dispatch(register({ email, password, name }));
    }, [email, password, passwordCheck, name]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ProductHeader style={{ flex: .06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation} />
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
