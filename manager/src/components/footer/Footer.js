import React, {useState,useEffect} from 'react';
import { View, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

import { AppRoute } from '../../routes/AppRoutes';

import { ComponentHomeLogo } from '../../assets/svg/home_logo';
import { ComponentEdit } from '../../assets/svg/edit';
import { ComponentFile } from '../../assets/svg/file';
import { ComponentDatabase } from '../../assets/svg/database';

import { CompModalContent } from '../modal/AppModalContent';

const { width, height } = Dimensions.get('window');

const Footer = ({ oProps, sLocation }) => {
    const [activate] = useState(oProps.UserConfigReducer.ACTIVATE);

    const [sTitle, setTitle] = useState("");

    const asyncData = () => {
        if(sLocation !== undefined && sLocation !== null && sLocation !== ""){
            setTitle(sLocation);
        }
    }

    const checkActivate = (sIndex) => {
        console.log("activate",activate);
        if(activate){
            if(sIndex === "home"){
                oProps.appManager.navGoTo('reset', AppRoute.HOME)
            } else if (sIndex === "insert") {
                oProps.appManager.navGoTo('reset', AppRoute.ENROLL)
            } else if (sIndex === "list") {
                oProps.appManager.navGoTo('reset', AppRoute.STORELIST)
            } else if (sIndex === "end") {
                oProps.appManager.navGoTo('reset', AppRoute.TOTALSTORELIST)
            }
        } else {
            openModal("담당자의 승인이 필요합니다");
        }
    }

    const openModal = (sIndex) => {
        oProps.appManager.showModal(
            true,
            <CompModalContent 
                sText={sIndex}
            />, 
            "custom",
            2500
        );
    };

    useEffect(() => {
        asyncData();
    }, []);

    return (
        <View 
            style={{
                position: "absolute",
                zIndex: 1,
                bottom: height * 0.05,
                right: width * 0.025,
                height: height * 0.09, flexDirection: "row", backgroundColor: "#fff",
                width: width * 0.95,
                borderRadius: height * 0.02,
                ...Platform.select({
                    ios: {
                        shadowColor: "#001E62",
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: {
                        height: 5,
                        width: 1,
                        },
                    },
                    android: {
                        elevation: 5,
                    },
                })
            }}
        >
            <TouchableOpacity activeOpacity={0.4} onPress={() => checkActivate("home")} style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: height * 0.08, borderRadius: width * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <View style={{height: "60%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ComponentHomeLogo iHeight={height * 0.03} iWidth={width * 0.01} iColor={sTitle === "home" ? "#001E62" : "#919AA7"}/>
                    </View>
                    <View style={{height: "40%", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
                        <Text style={{fontWeight: sTitle === "home" ? "bold" : "600", fontSize: RFPercentage(1.6), color: sTitle === "home" ? "#001E62" : "#919AA7" }}>홈화면</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} onPress={() => checkActivate("insert")} style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: height * 0.08, borderRadius: width * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <View style={{height: "60%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ComponentEdit iHeight={height * 0.03} iWidth={width * 0.05} iColor={sTitle === "insert" ? "#001E62" : "#919AA7"}/>
                    </View>
                    <View style={{height: "40%", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
                        <Text style={{fontWeight: sTitle === "insert" ? "800" : "600", fontSize: RFPercentage(1.6), color: sTitle === "insert" ? "#001E62" : "#919AA7" }}>새 매장 추가</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} onPress={() => checkActivate("list")} style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: height * 0.08, borderRadius: width * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <View style={{height: "60%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ComponentFile iHeight={height * 0.03} iWidth={width * 0.05} iColor={sTitle === "ing" ? "#001E62" : "#919AA7"}/>
                    </View>
                    <View style={{height: "40%", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
                        <Text style={{fontWeight: sTitle === "ing" ? "bold" : "600", fontSize: RFPercentage(1.6), color: sTitle === "ing" ? "#001E62" : "#919AA7" }}>등록중인 매장</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} onPress={() => checkActivate("end")} style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{height: height * 0.08, borderRadius: width * 0.05, justifyContent: "center", alignItems: "center"}}>
                    <View style={{height: "60%", width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ComponentDatabase iHeight={height * 0.03} iWidth={width * 0.05} iColor={sTitle === "total" ? "#001E62" : "#919AA7"}/>
                    </View>
                    <View style={{height: "40%", width: "100%", justifyContent: "flex-start", alignItems: "center"}}>
                        <Text style={{fontWeight: sTitle === "total" ? "bold" : "600", fontSize: RFPercentage(1.6), color: sTitle === "total" ? "#001E62" : "#919AA7" }}>영업중인 매장</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Footer;