import { Dimensions } from 'react-native';

const windowSize = Dimensions.get('window');

export const getWindowWidth = (width) => {
    return windowSize.width * (width / 100); 
}

export const getWindowHeight = (height) => {
    return windowSize.height * (height / 100); 
}