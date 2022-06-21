import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LottieView from 'lottie-react-native';
import moment from 'moment-timezone';
import 'moment/locale/ko';

import { AppRoute } from '../../routes/AppRoutes';

import { ComponentDelete } from '../../assets/svg/delete';
import { ComponentCalender } from '../../assets/svg/calender';

const { width, height } = Dimensions.get('window');

const PartnerPage = oProps => {
    const [loading, setLoading] = useState(false);

    const [sList, setList] = useState([]);

    const goBack = async () => {
        oProps.appManager.navGoTo('reset', AppRoute.HOME)
    }

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={{ height: height * 0.03 }}/>
            <View style={{height: height * 0.08 }}>
                <View style={{flex:1, alignItems: "flex-start", justifyContent: "center", paddingLeft: "10%" }}>
                    <Text style={{fontWeight: "700", fontSize: RFPercentage(2.2), color: "#191F28", marginTop: "3%"}}>브랜드 계정 관리</Text>
                </View>
                <TouchableOpacity onPress={goBack} style={{ position: "absolute", top: height * 0.02, right: width * 0.05, height: height * 0.05, width: height * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <ComponentDelete iHeight={height * 0.04} iWidth={height * 0.03} iColor={"#000"}/>
                </TouchableOpacity>
            </View>
            <View style={{ flex:1 }}>
                {loading ?
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
                        <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                    </View>
                    :
                    <FlatList
                        data={[]}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(data, index) => "list-" + index.toString()}
                        ListFooterComponent={
                            <View style={{ height: height * 0.1 }} />
                        }
                        ListEmptyComponent={
                            <View style={{height: height * 0.2, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontWeight: "400", fontSize: RFPercentage(1.7), color: "#bbb"}}>등록된 브랜드계정이 없습니다</Text>
                            </View>
                        }
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ height: height * 0.1, backgroundColor: "#fff", marginLeft: "5%", marginRight: "5%", marginBottom: "2%", flexDirection: "row", borderBottomColor: "#F2F3F5", borderBottomWidth: 1}}>
                                    
                                </View>
                            )
                        }}
                    />
                }
            </View>
            <View style={{height: height / 6 , backgroundColor: "#fff", justifyContent: "center"}}>
                <TouchableOpacity
                    style={{
                        height: height / 14,
                        backgroundColor: '#6490E7',
                        marginLeft: '5%',
                        marginRight: '5%',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: RFPercentage(2.5), fontWeight: '800', color: '#fff' }}>새로운 브랜드 계정 생성</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PartnerPage;