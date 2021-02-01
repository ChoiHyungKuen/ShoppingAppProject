import React, {useCallback, useEffect, useState} from 'react';
import { Button, ScrollView, Text, View, Image, Modal, TouchableOpacity, FlatList } from 'react-native';
import { getWindowWidth, getWindowHeight } from './CommonFunction';
import {Picker} from '@react-native-picker/picker';

const CustomPicker = ({ value, style, onValueChange, items, modalStyle }) => {

    const [showPicker, setShowPicker] = useState(false);
    const [pickerValue, setPickerValue] = useState(value);

    const renderList = ({item}) => {
        return (
            <TouchableOpacity 
                style={{ width: '100%', justifyContent: 'center', height: getWindowHeight(7) }}
                onPress={() => { setShowPicker(false); onValueChange(item.value)}}
                activeOpacity={1}>
                <Text style={{ fontSize: 25, left: 10 }}>{item.label}</Text>
            </TouchableOpacity>
        );
    }

    const renderPickerIOS = () => {
        if(modalStyle) {
            return (
                    <FlatList        
                        data={items}
                        keyExtractor={item => String(item.value)}
                        renderItem={renderList}/>
            )
        } else {
            return (
                <>
                    <TouchableOpacity
                        style={{ width: '100%', height: '10%', justifyContent: 'center', alignItems: 'flex-end' }}
                        onPress={() => {setShowPicker(false);  onValueChange(pickerValue)}}>
                        <Text style={{ fontSize: 25, right: 20, color: '#0000ff' }}>Done</Text>
                    </TouchableOpacity>
                    <Picker
                        selectedValue={pickerValue}
                        itemStyle={{ fontSize: 30}}
                        style={{width:'100%', height: '90%', justifyContent: 'center'}}
                        onValueChange={(itemValue) => setPickerValue(itemValue)}>
                        {items.map(item => <Picker.Item label={item.label} value={item.value} />)}
                    </Picker> 
                </>
            )
        }

    }

    return (
        <>
            <TouchableOpacity 
                style={[{justifyContent: 'center', alignItems: 'center', borderWidth: 1 }, style]}
                onPress={() => setShowPicker(true)}
                activeOpacity={1}
                >
                <Text>{value}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPicker}
            >
                <View style={{ width: getWindowWidth(100), height: getWindowHeight(100), backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'  }}>
                    <View style={{ width: getWindowWidth(95), height: getWindowHeight(50), backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                        
                        <View style={{ width: '100%', height: '100%' }}>
                            {renderPickerIOS()}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default CustomPicker;
