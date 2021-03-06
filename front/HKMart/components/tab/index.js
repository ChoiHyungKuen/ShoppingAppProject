
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainHeader from '../header/MainHeader';
import { StackActions } from '@react-navigation/native';

import Main from '../main';
import History from '../history';
import MyInfo from '../myInfo';
import Category from '../category';
import Search from '../search';

const Tab = createMaterialTopTabNavigator();

const BottomTab = ({ navigation, route }) => {
    return (
        <>
            <MainHeader style={{ flex: .06, flexDirection: 'row', backgroundColor: '#ffffff' }} navigation={navigation} route={route} currentScreenName='Main' />
            <Tab.Navigator
                style={{ flex: .94 }}
                tabBarOptions={{ 
                    showIcon: true, 
                    iconStyle: { height: 30, width: 30 }
                }}
                tabBarPosition='bottom'>
                <Tab.Screen name='Main' component={Main} 
                    options={{ 
                        title: props=> null,
                        tabBarIcon: ({ focused }) => (
                            <Icon name='home-outline' size={30} color={focused ? '#ff0000' : '#000000'}/>
                        )
                }}/>
                <Tab.Screen name='Category' component={Category} 
                    options={{ 
                        title: props=> null,
                        tabBarIcon: ({ focused }) => (
                        <View style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Icon name='menu' size={30} color={focused ? '#ff0000' : '#000000'}/>
                        </View>)
                }}/>

                <Tab.Screen name='Search' component={({navigation}) => { 
                            useEffect(() => {
                                const unsubscribe = navigation.addListener('tabPress', e => {
                                    e.preventDefault();
                                    const pushAction = StackActions.push('Search', { type: 'tab' });
                                    navigation.dispatch(pushAction);
                                    // navigation.navigate('Search')
                                  });
                                  return unsubscribe;
                            }, [navigation])
                            return (<></>)
                         }} 
                        options={{ 
                            title: props=> null,
                            tabBarIcon: ({ focused }) => (<View style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                
                                <Icon name='magnify' size={30} color={focused ? '#ff0000' : '#000000'}/>
                            </View>)
                        }}/>
                <Tab.Screen name='MyInfo' component={MyInfo} 
                        options={{ 
                            title: props=> null,
                            tabBarIcon: ({ focused }) => (<View style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                
                                <Icon name='account-outline' size={30} color={focused ? '#ff0000' : '#000000'}/>
                            </View>)
                        }}/>
                <Tab.Screen name='History' component={History} 
                        options={{ 
                            title: props=> null,
                            tabBarIcon: ({ focused }) => (<View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                
                                <Icon name='history' size={30} color={focused ? '#ff0000' : '#000000'}/>
                            </View>)
                }}/>
            </Tab.Navigator>
        </>
    );
}

export default BottomTab;
