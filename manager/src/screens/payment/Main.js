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

const PaymentScreen = oProps => {
    const [loading, setLoading] = useState(false);

    const [fromDate, setFromDate] = useState(moment().format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(moment().add("days", 1).format("YYYY-MM-DD"));

    const [sType, setType] = useState("order");

    const [sList, setList] = useState([]);

    const [fDatePickerVisible, setFDatePickerVisibility] = useState(false);
    const [tDatePickerVisible, setTDatePickerVisibility] = useState(false);

    const handleFromConfirm = (date) => {
        setFromDate(moment(date).format("YYYY-MM-DD"));
        hideFromDatePicker();
    };

    const hideToDatePicker = () => {
        setTDatePickerVisibility(false);
    };

    const handleToConfirm = (date) => {
        setToDate(moment(date).format("YYYY-MM-DD"));
        hideToDatePicker();
    };

    const hideFromDatePicker = () => {
        setFDatePickerVisibility(false);
    };

    const categoryChoose = (sIndex) => {
        let temp = "order";
        if(sIndex === "payment") temp = "payment";
        setType(temp);
        asyncData(temp);
    }

    const goBack = async () => {
        oProps.appManager.navGoTo('reset', AppRoute.HOME)
    }

    const asyncData = async (aIndex) => {
        const oData = {
            sales_id: oProps.UserConfigReducer.SALESID,
            fromDate,
            toDate,
        }

        const oResponse = await oProps.appManager.accessAxios(`/app/sales/paymentList`, "post", null, oData);
        if(oResponse !== undefined){
            let temp = oResponse;
            if(aIndex === "order"){
                temp.sort(function(a, b)  {
                    return b.total - a.total;
                });
            } else {
                temp.sort(function(a, b)  {
                    return b.totalPay - a.totalPay;
                });
            }
            setList(temp);
        }
    }

    useEffect(() => {
        asyncData("order");
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={{ height: height * 0.03 }}/>
            <View style={{height: height * 0.08 }}>
                <View style={{flex:1, alignItems: "flex-start", justifyContent: "center", paddingLeft: "10%" }}>
                    <Text style={{fontWeight: "700", fontSize: RFPercentage(2.2), color: "#191F28", marginTop: "3%"}}>매출내역</Text>
                </View>
                <TouchableOpacity onPress={goBack} style={{ position: "absolute", top: height * 0.02, right: width * 0.05, height: height * 0.05, width: height * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <ComponentDelete iHeight={height * 0.04} iWidth={height * 0.03} iColor={"#000"}/>
                </TouchableOpacity>
            </View>
            <View style={{ height: height * 0.1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => categoryChoose("order")} style={{ height: height * 0.07, width: width * 0.45, borderBottomColor: sType === "order" ? "#000" : "#bbb", borderBottomWidth: sType === "order" ? 2 : 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.2), color: sType === "order" ? "#000" : "#bbb"}}>주문건순</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => categoryChoose("payment")} style={{ height: height * 0.07, width: width * 0.45, borderBottomColor: sType === "payment" ? "#000" : "#bbb", borderBottomWidth: sType === "payment" ? 2 : 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.2), color: sType === "payment" ? "#000" : "#bbb"}}>매출액순</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: height * 0.09, width: width * 0.9, alignItems: "center", flexDirection: "row", marginLeft: "5%", marginRight: "5%" }}>
                <DateTimePickerModal
                    isVisible={fDatePickerVisible}
                    mode="date"
                    confirmTextIOS="확인"
                    cancelTextIOS="취소"
                    onConfirm={handleFromConfirm}
                    onCancel={hideFromDatePicker}
                />
                <DateTimePickerModal
                    isVisible={tDatePickerVisible}
                    mode="date"
                    confirmTextIOS="확인"
                    cancelTextIOS="취소"
                    onConfirm={handleToConfirm}
                    onCancel={hideToDatePicker}
                />
                <TouchableOpacity onPress={() => setFDatePickerVisibility(true)} style={{height: height * 0.06, width: "32%", backgroundColor: "#FAFAFB", borderRadius: width * 0.02, alignItems: "center", justifyContent: "center", marginRight: "4%"}}>
                    <Text style={{fontWeight: "600", fontSize: RFPercentage(1.7), color: "#333D4B"}}>{fromDate}</Text>
                </TouchableOpacity>
                <View style={{height: "100%", width: "5%", marginRight: "5%", justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontWeight: "800", fontSize: RFPercentage(1.7), color: "#333D4B" }}>~</Text>
                </View>
                <TouchableOpacity onPress={() => setTDatePickerVisibility(true)} style={{height: height * 0.06, width: "32%", backgroundColor: "#FAFAFB", borderRadius: width * 0.02, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontWeight: "600", fontSize: RFPercentage(1.7), color: "#333D4B"}}>{toDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => asyncData(sType)} style={{height: height * 0.06, width: width * 0.11, justifyContent: "center", alignItems: "center", backgroundColor: "#E8EFFC", marginLeft: "10%", borderRadius: width * 0.02}}>
                    <ComponentCalender iHeight={height * 0.03} iWidth={width * 0.08} iColor={"#6490E7"}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                {loading ?
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
                        <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                    </View>
                :
                    <FlatList
                        data={[{}]}
                        ListFooterComponent={<View style={{ height: width * 0.05 }} />}
                        ListHeaderComponent={<View style={{ height: width * 0.05 }} />}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={{height: width * 0.5, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontWeight: "400", fontSize: RFPercentage(1.8), color: "#bbb"}}>데이터가 없습니다</Text>
                            </View>
                        }
                        keyExtractor={(data, index) => "list-" + index + Math.random()}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{height: width * 0.05}}/>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{height: width * 0.3, backgroundColor: "#FAFAFB", margin: "5%", borderRadius: width * 0.01}}>
                                    <View style={{flex: 0.4, justifyContent: "center", paddingLeft: "5%"}}>
                                        <Text style={{fontWeight: "600", fontSize: RFPercentage(2)}}>{item.storeNm}</Text>
                                    </View>
                                    <View style={{flex: 0.3, flexDirection: "row", paddingLeft: "5%", alignItems: "center", paddingRight: "5%"}}>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}>
                                            <Text style={{fontWeight: "400", fontSize: RFPercentage(1.9)}}>주문건수</Text>
                                        </View>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                            <Text style={{fontWeight: "600", fontSize: RFPercentage(2), color: "#617BE3"}}>{item.total}<Text style={{color: "#000", fontSize: RFPercentage(1.9)}}> 건</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 0.3, flexDirection: "row", paddingLeft: "5%", alignItems: "center", paddingRight: "5%"}}>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-start"}}>
                                            <Text style={{fontWeight: "400", fontSize: RFPercentage(1.9)}}>매출금액</Text>
                                        </View>
                                        <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                                            <Text style={{fontWeight: "600", fontSize: RFPercentage(2), color: "#617BE3"}}>{item.totalPayWon}<Text style={{color: "#000", fontSize: RFPercentage(1.9)}}> 원</Text></Text>
                                        </View>
                                    </View>
                                </View>
                            ) 
                        }}
                    />
                }
            </View>
        </View>
    )

}

export default PaymentScreen;