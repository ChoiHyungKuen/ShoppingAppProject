import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './components/tab';
import ProductDetail from './components/detail';
import Login from './components/login';
import Register from './components/register';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

const Stack = createStackNavigator();

const App = () => {
    Icon.loadFont();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='BottomTab'>
                    <Stack.Screen 
                        name='ProductDetail'
                        component={ProductDetail}
                        options={{ headerShown: false }}/>
                    <Stack.Screen 
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }} />    
                    <Stack.Screen 
                        name='Register'
                        component={Register}
                        options={{ headerShown: false }} />    
                    <Stack.Screen 
                        name='BottomTab'
                        component={BottomTab}
                        options={{ headerShown: false }} />    
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
  );
};


export default App;
