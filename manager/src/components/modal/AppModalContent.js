import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Animated, ScrollView, Easing, FlatList, Image, TextInput, Keyboard, Linking } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import { WebView } from "react-native-webview";
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-picker';
import FormData from 'form-data';
import mime from "mime";

import { 
    BasicTerms, 
    AgreeTerms, 
    PersonalTerms,
    OnChangeIdContent,
    OnChangePwContent,
    OnChangeDeleteStoreContent,
    OnChangeCopyMenuContent
} from './SubContent';

import { ComponentDelete } from '../../assets/svg/delete';
import { ComponentArrowLeft3 } from '../../assets/svg/arrowLeft3';
import { ComponentPercent } from '../../assets/svg/percent';
import { ComponentBox } from '../../assets/svg/box';
import { ComponentHome } from '../../assets/svg/home';
import { ComponentPhone } from '../../assets/svg/phone';
import { ComponentWalkThroo } from '../../assets/svg/walkthroo';

const { width, height } = Dimensions.get('window');
const storeFunctionList = [
    { key: 0, name: "아이디 변경", color: "#F2F4F6", textColor: "#4E5968" },
    { key: 1, name: "비밀번호 변경", color: "#F2F4F6", textColor: "#4E5968" },
    { key: 2, name: "상품복사", color: "#14C17F", textColor: "#fff" },
    { key: 3, name: "매장삭제", color: "#E32938", textColor: "#fff" },
]
const storeSettingList = [
    { key: 0, name: "정산 정보 설정하기", color: "#C1EAD1", textColor: "#4E5968" },
    { key: 1, name: "메뉴그룹 설정하기", color: "#ABCEF4", textColor: "#4E5968" },
    { key: 2, name: "메뉴 설정하기", color: "#ABCEF4", textColor: "#617be3" },
    { key: 3, name: "옵션 설정하기", color: "#ABCEF4", textColor: "#fff" },
    { key: 4, name: "대표메뉴 설정하기", color: "#ABCEF4", textColor: "#fff" },
    { key: 5, name: "매장 정보 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 6, name: "매장 업종 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 7, name: "매장 소개글 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 8, name: "매장 공지사항 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 9, name: "매장 상품 원산지 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 10, name: "매장 상품 준비시간 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 11, name: "매장 상품 로고 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 12, name: "매장 상품 이미지 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 13, name: "매장 상품 휴무일 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 14, name: "매장 상품 영업시간 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 15, name: "픽업존 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 16, name: "픽업존 이미지 설정하기", color: "#F9E3A7", textColor: "#fff" },
    { key: 17, name: "픽업존 추가 기능 설정하기", color: "#F9E3A7", textColor: "#fff" },
]

export const SwitchToggle = ({ onToggle, isOn }) => {
    const [aniValue] = useState(new Animated.Value(0));
    const color = isOn ? "#617BE3" : "#F45552";

    const moveSwitchToggle = aniValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.11],
    });

    Animated.timing(aniValue, {
        toValue: isOn ? 1 : 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
    }).start();

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity onPress={onToggle}>
                <View style={{ width: width * 0.17, height: height * 0.02, paddingLeft: 2, borderRadius: 15, justifyContent: "center",backgroundColor: color }}>
                    <Animated.View 
                        style={{ 
                            transform: [{ translateX: moveSwitchToggle }],
                            width: width * 0.05,
                            height: width * 0.05,
                            backgroundColor: "#fff",
                            borderRadius: width,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 2.5,
                            elevation: 1.5
                        }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const CompModalContent = ({sText}) => {

    return (
        <View 
            style={{
                marginHorizontal: "5%",
                marginTop: width * 0.1,
                width: width * 0.8,
                height: width * 0.3, 
                backgroundColor: "#fff",
                borderRadius: width * 0.02, 
            }}
        >
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", margin: "10%"}}>
                <Text style={{fontSize: RFPercentage(2), fontWeight: '500', color: "#666"}}>{sText}</Text>
            </View>
        </View>
    )
}

export const CompModalStoreManage = ({ oProps, item, fnClose, fnDelete }) => {
    const [loading, setLoading] = useState(false);

    const [idOpen, setIdOpen] = useState(false);
    const [pwOpen, setPwOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [copyMenuOpen, setCopyMenuOpen] = useState(false);

    const storeDelete = async () => {
        if(fnDelete !== undefined && typeof fnDelete === "function"){
            await fnDelete();
        }
    }

    const close = async () => {
        if(fnClose !== undefined && typeof fnClose === "function"){
            await fnClose();
        }
    }

    const openSetting = async (sIndex) => {
        if(sIndex.key.toString() === "0"){
            setIdOpen(true);
        } else if (sIndex.key.toString() === "1") {
            setPwOpen(true);
        } else if (sIndex.key.toString() === "2") {
            setCopyMenuOpen(true);
        } else if (sIndex.key.toString() === "3") {
            setDeleteOpen(true);

        }
    }

    const activateStore = () => {
        console.log("activate");
    }
    

    const asyncData = async () => {
        setLoading(true);
        const oData = {
            salesId: oProps.UserConfigReducer.SALESID,
            storeId: item.storeId
        }
        const iResponse = await oProps.appManager.accessAxios("/app/sales/dashboard/v2", "post", null, oData);
        if (iResponse !== undefined) {
            let oUserConfig = {};
            
            oUserConfig['LOGINID'] = "";
            oUserConfig['LOGINPW'] = "";
            oUserConfig['TOKEN'] = "";
            oUserConfig['REFRESHTOKEN'] = "";
            oUserConfig['STOREID'] = "";
            oUserConfig['BUSINESSTYPE'] = "";
            oUserConfig['STORENAME'] = "";
            oUserConfig['STOREOWNER'] = "";
            
            await oProps.reduxSetStoreConfigStatus(oUserConfig);
        }

        setLoading(false);
    }
    
    useEffect(() => {
        asyncData();
    }, []);

    return (
        <View 
            style={{
                marginHorizontal: "-5%",
                width: width,
                height: height, 
                backgroundColor: "#fff",
            }}
        >
            {loading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
                    <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                </View>
            :
                <>
                    {(!idOpen && !pwOpen && !deleteOpen && !copyMenuOpen) &&
                        <ScrollView style={{ flex:1 }}>
                            <View style={{ height: height * 0.3 }}>
                                <Image source={{uri: item.urlPath}} style={{height: height * 0.3, width, resizeMode: "cover"}}/>
                                <TouchableOpacity onPress={close} style={{ position: "absolute", top: height * 0.05, right: width * 0.05, backgroundColor: "#fff", height: height * 0.05, width: width * 0.1, borderRadius: width, justifyContent: "center", alignItems: "center"}}>
                                    <ComponentDelete iHeight={height * 0.04} iWidth={width * 0.06} iColor={"#000"}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: height * 0.1, justifyContent: "center", paddingLeft: "5%", paddingRight: "5%"}}>
                                <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#000"}}>
                                    {(item.storeNm !== undefined && item.storeNm !== null && item.storeNm !== "") ? item.storeNm : item.email}
                                </Text>
                            </View>
                            <View style={{ height: height * 0.05, justifyContent: "space-between", alignItems: "flex-start", paddingLeft: "5%", paddingRight: "5%", flexDirection: "row" }}>
                                {/* <Text style={{fontWeight: "400", fontSize: RFPercentage(1.6), color: "#617BE3"}}>스루 약관 동의</Text>
                                <Text style={{fontWeight: "400", fontSize: RFPercentage(1.6), color: "#bbb"}}>스루 약관 동의 대기중</Text> */}
                                <Text style={{fontWeight: "700", fontSize: RFPercentage(1.7), color: "#dd1212"}}>스루 약관 동의가 필요합니다</Text>
                                <View style={{ width: width * 0.2, backgroundColor: "#001E62", height: height * 0.03, borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontWeight: "400", fontSize: RFPercentage(1.6), color: "#fff"}}>동의하기</Text>
                                </View>
                            </View>
                            <View style={{ height: height * 0.07, backgroundColor: "#fff", borderTopColor: "#dfdfdf", borderTopWidth: 1}}>
                                <FlatList
                                    data={storeFunctionList}
                                    horizontal
                                    contentContainerStyle={{paddingHorizontal: width * 0.05, alignItems: "center" }}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(data, index) => "list-" + index + Math.random()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => openSetting(item)} style={{ height: height * 0.04, backgroundColor: item.color, minWidth: width * 0.25, marginRight: width * 0.03, borderRadius: width * 0.03, justifyContent: "center", alignItems: "center"}}>
                                                <Text style={{fontWeight: "bold", fontSize: RFPercentage(1.8), color: item.textColor, paddingLeft: "5%", paddingRight: "5%" }}>{item.name}</Text>
                                            </TouchableOpacity>
                                        ) 
                                    }}
                                />

                            </View>
                            <View style={{ height: height * 0.02, backgroundColor: "#F1F3F7"}} />
                            {storeSettingList.map((item,index) => {
                                return (
                                    <View key={index} style={{ height: height * 0.1, backgroundColor: "#fff", borderBottomColor: "#F1F3F7", borderBottomWidth: 1, flexDirection: "row" }}>
                                        <View style={{ width: width * 0.2, height: "100%", justifyContent: "center", alignItems: "center"}}>
                                            <View style={{ width: width * 0.1, height: "50%", backgroundColor: item.color, borderRadius: width, justifyContent: "center", alignItems: "center"}}>
                                                {item.key === 0 &&
                                                    <ComponentPercent iHeight={height * 0.04} iWidth={width * 0.06} iColor={"#000"}/>
                                                }
                                                {(item.key === 1 || item.key === 2 || item.key === 3 || item.key === 4) &&
                                                    <View style={{ width: width * 0.05, height: "70%", backgroundColor: "#353D4E", borderRadius: width * 0.01, justifyContent: "center", alignItems: "center"}}>
                                                        <ComponentBox iHeight={height * 0.03} iWidth={width * 0.02} iColor={"#fff"}/>
                                                    </View>
                                                }
                                                {(item.key !== 0 && item.key !== 1 && item.key !== 2 && item.key !== 3 && item.key !== 4) &&
                                                    <View style={{ width: width * 0.07, height: "50%", backgroundColor: "#FFB031", borderRadius: width * 0.01, justifyContent: "center", alignItems: "center"}}>
                                                        <ComponentHome iHeight={height * 0.03} iWidth={width * 0.03} iColor={"#fff"}/>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                        <View style={{ width: width * 0.5, height: "100%", justifyContent: "center"}}>
                                            <Text style={{fontWeight: "bold", fontSize: RFPercentage(2), color: "#000" }}>{item.name}</Text>
                                        </View>
                                        <View style={{ width: width * 0.3, height: "100%", justifyContent: "center", alignItems: "center"}}>
                                            <View style={{ width: width * 0.15, height: "40%", backgroundColor: "#E8EFFC", borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                                <Text style={{fontWeight: "bold", fontSize: RFPercentage(1.7), color: "#6490E7" }}>이동</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                            <View style={{ height: height * 0.15, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                                <TouchableOpacity onPress={() => activateStore()} style={{ height: height * 0.07, width: width * 0.9, backgroundColor: "#6490E7", borderRadius: width * 0.03, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#fff", paddingLeft: "5%", paddingRight: "5%" }}>영업시작</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    }
                </>
            }
            {idOpen &&
                <OnChangeIdContent 
                    iStoreId={item.storeId}
                    sProps={oProps}
                    fnClose={() => setIdOpen(false)}
                    fnAction={() => setIdOpen(false)}
                />
            }
            {pwOpen &&
                <OnChangePwContent 
                    iStoreId={item.storeId}
                    sProps={oProps}
                    fnClose={() => setPwOpen(false)}
                    fnAction={() => setPwOpen(false)}
                />
            }
            {deleteOpen &&
                <OnChangeDeleteStoreContent 
                    sProps={oProps}
                    storeId={item.storeId}
                    fnClose={() => setDeleteOpen(false)}
                    fnAction={() => storeDelete()}
                />
            }
            {copyMenuOpen &&
                <OnChangeCopyMenuContent 
                    iStoreId={item.storeId}
                    sProps={oProps}
                    fnClose={() => setCopyMenuOpen(false)}
                    fnAction={() => close(false)}
                />
            }
        </View>
    )
}

export const CompModalManageGroup = ({ oProps, fnClose }) => {
    const [loading, setLoading] = useState(false);
    
    const [sType, setType] = useState("new");

    const [memberList, setMemberList] = useState([]);
    const [userList, setUserList] = useState([]);

    const onChangeType = async (sIndex) => {
        setType(sIndex);
    }

    const close = async () => {
        if(fnClose !== undefined && typeof fnClose === "function"){
            await fnClose();
        }
    }

    const memberDelete = async (sIndex) => {
        const oData = {
            salesId: oProps.UserConfigReducer.SALESID,
            userId: sIndex
        }
        const iResponse = await oProps.appManager.accessAxios("/app/sales/manager/delete", "post", null, oData);
        if (iResponse !== undefined) {
            setstoreList(iResponse);
        }
        asyncData();
    }

    const enrollMember = async (sIndex) => {
        const oData = {
            salesId: oProps.UserConfigReducer.SALESID,
            userId: sIndex
        }
        const iResponse = await oProps.appManager.accessAxios("/app/sales/manager/onChangeMember", "post", null, oData);
        if (iResponse !== undefined) {
            setstoreList(iResponse);
        }
        asyncData();
    }

    const asyncData = async () => {
        setLoading(true);
        const sales_id = oProps.UserConfigReducer.SALESID;
        const oResponse = await oProps.appManager.accessAxios("/app/sales/manager/list-" + sales_id, "get", "text", null);
        if (oResponse !== undefined) {
            setMemberList(oResponse.memberList);
            setUserList(oResponse.userList);
        }
        setLoading(false);
    }

    useEffect(() => {
        asyncData();
    }, []);

    return (
        <View 
            style={{
                marginHorizontal: "-5%",
                marginTop: height * 0.1,
                width: width,
                height: height * 0.9, 
                backgroundColor: "#fff",
                borderTopLeftRadius: width * 0.02, 
                borderTopRightRadius: width * 0.02, 
            }}
        >
            <View style={{height: height * 0.02, width}} />
            <View style={{height: height * 0.07, backgroundColor: "#fff", alignItems: "center", marginLeft: "5%", marginRight: "5%", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: RFPercentage(2.5), fontWeight: 'bold', color: "#000"}}>관리</Text>
                <TouchableOpacity onPress={close} style={{height: height * 0.035, width: width * 0.08}}>
                    <ComponentDelete iHeight={height * 0.035} iWidth={width * 0.08} iColor={"#000"}/>
                </TouchableOpacity>
            </View>
            {loading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}}>
                    <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                </View>
            :
                <View style={{ flex: 1 }}>
                    <View style={{ height: height * 0.1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                        <TouchableOpacity onPress={() => onChangeType("new")} style={{ height: height * 0.07, width: width * 0.45, borderBottomColor: sType === "new" ? "#000" : "#bbb", borderBottomWidth: sType === "new" ? 2 : 1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.5), color: sType === "new" ? "#000" : "#bbb"}}>신규등록</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChangeType("member")} style={{ height: height * 0.07, width: width * 0.45, borderBottomColor: sType === "member" ? "#000" : "#bbb", borderBottomWidth: sType === "member" ? 2 : 1, justifyContent: "center", alignItems: "center"}}>
                            <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.5), color: sType === "member" ? "#000" : "#bbb"}}>나의 팀</Text>
                        </TouchableOpacity>
                    </View>
                    {sType === "new" ?
                        <FlatList
                            data={userList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(data, index) => "list-" + index.toString()}
                            ListFooterComponent={
                                <View style={{ height: height * 0.1 }} />
                            }
                            ListEmptyComponent={
                                <View style={{height: height * 0.2, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontWeight: "400", fontSize: RFPercentage(2.3), color: "#bbb"}}>신규회원이 없습니다</Text>
                                </View>
                            }
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ height: height * 0.1, backgroundColor: "#fff", marginLeft: "5%", marginRight: "5%", marginBottom: "2%", flexDirection: "row", alignItems: "center"}}>
                                        <View style={{ height: height * 0.05, width: height * 0.05, justifyContent: "center", alignItems: "center", backgroundColor: "#BCE9E9", borderRadius: width * 0.03}}>
                                            <ComponentWalkThroo iHeight={height * 0.03} iWidth={height * 0.03} iColor={"#fff"}/>
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.5, justifyContent: "center", paddingLeft: "5%"}}>
                                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#000"}}>{item.email}</Text>
                                            <Text style={{ fontWeight: "900", fontSize: RFPercentage(2), color: "#191F28"}}>{item.name}</Text>
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.3, justifyContent: "space-evenly", alignItems: "flex-end"}}>
                                            <TouchableOpacity onPress={() => enrollMember(item.id)} style={{ height: height * 0.035, width: width * 0.19, backgroundColor: "#6490E7", borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                                <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2), color: "#fff"}}>활성화</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    :
                        <FlatList
                            data={memberList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(data, index) => "list-" + index.toString()}
                            ListFooterComponent={
                                <View style={{ height: height * 0.1 }} />
                            }
                            ListEmptyComponent={
                                <View style={{height: height * 0.2, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontWeight: "400", fontSize: RFPercentage(2), color: "#bbb"}}>아직 회원이 없습니다</Text>
                                </View>
                            }
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ height: height * 0.1, backgroundColor: "#fff", marginLeft: "5%", marginRight: "5%", marginBottom: "2%", flexDirection: "row", alignItems: "center"}}>
                                        <View style={{ height: height * 0.05, width: height * 0.05, justifyContent: "center", alignItems: "center", backgroundColor: "#FFB031", borderRadius: width * 0.03}}>
                                            <ComponentWalkThroo iHeight={height * 0.03} iWidth={height * 0.03} iColor={"#fff"}/>
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.5, justifyContent: "center", paddingLeft: "5%"}}>
                                            <Text style={{ fontWeight: "800", fontSize: RFPercentage(2.3), color: "#000"}}>{item.email}</Text>
                                            <Text style={{ fontWeight: "500", fontSize: RFPercentage(2.2), color: "#191F28"}}>{item.name}</Text>
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.3, justifyContent: "space-evenly", alignItems: "flex-end"}}>
                                            <TouchableOpacity onPress={() => memberDelete(item.id)} style={{ height: height * 0.035, width: width * 0.16, backgroundColor: "#EF4452", borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                                <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2), color: "#fff"}}>탈퇴</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />

                    }
                    <View style={{ height: height * 0.05}} />
                </View>
            }
        </View>
    )
}

export const CompModalTerms = ({ type, fnAgree, isAgree }) => {
    
    const agree = async () => {
        if(fnAgree !== undefined && typeof fnAgree === "function"){
            await fnAgree();
        }
    }

    return (
        <View 
            style={{
                marginHorizontal: "-5%",
                marginTop: height * 0.3,
                width: width,
                height: height * 0.7, 
                backgroundColor: "#fff",
                borderTopLeftRadius: width * 0.05, 
                borderTopRightRadius: width * 0.05, 
            }}
        >
            <View style={{height: height / 12, backgroundColor: "#fff", marginTop: "5%", justifyContent: "center", width: "100%", marginLeft: "5%"}}>
                {type === "term1" &&
                    <Text style={{ fontSize: RFPercentage(2.3), fontWeight: '600', color: '#191F28' }}>판매 이용약관</Text>
                }
                {type === "term2" &&
                    <Text style={{ fontSize: RFPercentage(2.3), fontWeight: '600', color: '#191F28' }}>전자금융거래 이용약관</Text>
                }
                {type === "term3" &&
                    <Text style={{ fontSize: RFPercentage(2.3), fontWeight: '600', color: '#191F28' }}>판매자 개인 정보 수집 및 이용 동의</Text>
                }
            </View>
            <View style={{flex:1,justifyContent: "center", alignItems: "center", marginLeft: "5%", marginRight: "5%", paddingBottom: "5%"}}>
                <ScrollView>
                    {type === "term1" &&
                        <BasicTerms />
                    }
                    {type === "term2" &&
                        <AgreeTerms />
                    }
                    {type === "term3" &&
                        <PersonalTerms />
                    }
                </ScrollView>
            </View>
            <View style={{height: height / 9 , backgroundColor: "#fff", justifyContent: "flex-start"}}>
                <TouchableOpacity
                    onPress={agree}
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
                <Text style={{ fontSize: RFPercentage(2), fontWeight: '800', color: '#fff' }}>{isAgree ? "동의완료": "동의합니다"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}