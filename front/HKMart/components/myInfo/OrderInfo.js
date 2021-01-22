import React from 'react'
import { View, Text } from 'react-native';
import { getWindowHeight } from '../common/CommonFunction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderInfo = ({ title, component }) => {
    return (
        <View style={{ height: getWindowHeight(20), backgroundColor: '#ffffff'}}>
            <View style={{ height: '20%', justifyContent: 'center', paddingLeft: 10 }}>
                <Text>주문내역(최근 6개월, 배송상품 기준)</Text>
            </View>
            <View style={{ height: '60%', borderBottomWidth: 1, borderBottomColor: '#e8e8e8' }}>

            </View>
            <View style={{ height: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>주문내역 전체보기</Text>
                <Icon name='chevron-right' size={20} style={{ right: 5 }}/>
            </View>
        </View>
    );
}

export default OrderInfo;
