import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './components/tab';
import ProductDetail from './components/detail';


const Stack = createStackNavigator();

const App = () => {
    Icon.loadFont();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='BottomTab'>
                <Stack.Screen 
                    name='ProductDetail'
                    component={ProductDetail}
                    options={{ headerShown: false }}/>
                <Stack.Screen 
                    name='BottomTab'
                    component={BottomTab}
                    options={{ headerShown: false }} />    
            </Stack.Navigator>
        </NavigationContainer>
  );
};


export default App;
