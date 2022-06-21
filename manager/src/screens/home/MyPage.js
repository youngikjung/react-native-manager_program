import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    Image,
    Animated,
    AppState,
    Linking,
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { Polygon } from 'react-native-svg';
import {RFPercentage} from 'react-native-responsive-fontsize';
import { checkNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

import { ComponentDelete } from '../../assets/svg/delete';
import { ComponentFileList } from '../../assets/svg/file_list';
import { ComponentShoppingBag } from '../../assets/svg/shopping_bag';
import { ComponentArrowLogout } from '../../assets/svg/logout';
import { ComponentExternalLink } from '../../assets/svg/external_link';
import { ComponentBox } from '../../assets/svg/box';

import { AppRoute } from '../../routes/AppRoutes';

import { SwitchToggle, CompModalManageGroup } from '../../components/modal/AppModalContent';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const { width, height } = Dimensions.get('window');

const Home = ({sProps, fnAimation, fnAnimateMove, sFromCoords}) => {
    const [togle, setTogle] = useState(false);

    const polygonRef = useRef();
    const appState = useRef(AppState.currentState);

    const opacity = fnAimation.x.interpolate({
        inputRange: [0, width],
        outputRange: [0, 1],
    });

    const translateX = fnAimation.x.interpolate({
        inputRange: [0, width],
        outputRange: [-50, 0],
    });

    const animateMove = async () => {
        if(fnAnimateMove !== undefined && typeof fnAnimateMove === "function"){
            await fnAnimateMove();
        }
    }

    const handleLogout = async () => {
        await sProps.appManager.setLogOut();
        sProps.appManager.navGoTo('reset', AppRoute.MAIN);
    };

    const handleTHROOPage = () => {
        Linking.openURL("https://ceo.throo.co.kr").catch(err => console.error("Couldn't load page", err));
    };

    const openManageGroup = () => {
        sProps.appManager.showModal(
            true,
            <CompModalManageGroup
                oProps={sProps}
                fnClose={() => sProps.appManager.hideModal()}
            />, 
            "custom",
        );
    };

    const handleToggle = async () => {
        let oData = {
            uniqueId: sProps.UserConfigReducer.uniqueId,
            storeId: sProps.UserConfigReducer.StoreID,
        }
        let sToken = "";

        if(!togle){
            const authorizationStatus = await messaging().requestPermission();
            if(authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED){
                let process = false;
                if(Platform.OS === "android"){
                    await checkNotifications().then(async ({ status, settings }) => {
                        if (status === "granted") {
                            process = true;
                        } else {
                            process = false;
                        }
                    });
                } else {
                    process = true;
                }

                if(process){
                    let oUserConfig = {};
                    oUserConfig['APPPUSHSTATUS'] = true;
                    await messaging().registerDeviceForRemoteMessages();
                    sToken = await messaging().getToken();
                    if(sToken === sProps.UserConfigReducer.USERPUSHTOKEN){
                        sToken = sProps.UserConfigReducer.USERPUSHTOKEN;
                    }

                    oData = {
                        token : sToken,
                        salesId: sProps.UserConfigReducer.SALESID,
                    }
                    const res = await sProps.appManager.accessAxios("/app/sales/insertPushToken/v3", "post", null, oData);
                    if(res !== undefined && res !== null){
                        if(res){
                            await sProps.reduxSetUserConfig(oUserConfig);
                            setTogle(true);
                        }
                    }
                } else {
                    Linking.openSettings();
                }
            } else {
                Linking.openSettings();
            }
        }
    }

    useEffect(() => {
        if(sProps.UserConfigReducer.APPPUSHSTATUS){
            setTogle(true);
        }
    }, []);

    useEffect(() => {
        const listener = fnAimation.addListener((v) => {
            if (polygonRef?.current) {
                polygonRef.current.setNativeProps({
                    points: `0,0 ${v.x}, ${v.y} ${width}, ${height} 0, ${height}`,
                });
            }
        });

        return () => {
            fnAimation.removeListener(listener);
        };
    });

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                animateMove();
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <MaskedView
            style={{flex: 1}}
            maskElement={
                <Svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{ backgroundColor: 'transparent' }}
                >
                    <AnimatedPolygon ref={polygonRef} points={`0,0 ${sFromCoords.x}, ${sFromCoords.y} ${width}, ${height} 0, ${height}`} fill='blue' />
                </Svg>
            }
        >
            <Animated.View style={{ flex:1, opacity, transform: [{ translateX }]}}>
                <View style={{ height: height * 0.04, backgroundColor: "#E8EFFC" }}/>
                <View style={{height: height * 0.08, flexDirection: "row", backgroundColor: "#E8EFFC"}}>
                    <View style={{flex: 0.8, justifyContent: "flex-end", paddingLeft: "5%"}} />
                    <View style={{flex: 0.2, alignItems: "center", paddingTop: "5%"}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => animateMove()}  style={{height: height * 0.06, width: height * 0.06, alignItems: "center", borderRadius: width * 0.05 }}>
                            <ComponentDelete iHeight={height * 0.03} iWidth={height * 0.06} />
                        </TouchableOpacity>
                        <View style={{height: height * 0.01}}/>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: "#E8EFFC"}}>
                    <View style={{ height: height * 0.08, margin: "5%", backgroundColor: "#fff", borderRadius: width * 0.03, flexDirection: "row"}}>
                        <View style={{ height: height * 0.08, width: height * 0.1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{uri: "https://api-stg.ivid.kr/img/no-image-new.png"}} style={{height: height * 0.08, width: height * 0.08, borderRadius: width * 0.02 }}/>
                        </View>
                        <View style={{ height: height * 0.08, width: width * 0.7, justifyContent: "center", paddingLeft: "2%" }}>
                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.5), color: "#191F28"}}>{sProps.UserConfigReducer.SALESUSERNAME}</Text>
                            <Text style={{ fontWeight: "600", fontSize: RFPercentage(2), color: "#6B7583"}}>{sProps.UserConfigReducer.LOGINID}</Text>
                        </View>
                    </View>
                    <View style={{ flex:1 }}>
                        <TouchableOpacity onPress={() => sProps.appManager.navGoTo('reset', AppRoute.PAYMENT)} style={{ height: height * 0.07, marginLeft: "5%", marginRight: "5%", backgroundColor: "#fff", borderRadius: width * 0.03, flexDirection: "row", alignItems: "center"}}>
                            <View style={{width: width * 0.07, height: width * 0.07, backgroundColor: "#ed553b", justifyContent: "center", alignItems: "center", borderRadius: 10, marginLeft: "5%"}}>
                                <ComponentFileList iHeight={height * 0.02} iWidth={height * 0.05} iColor={"#fff"}/>
                            </View>
                            <Text style={{ fontWeight: "700", fontSize: RFPercentage(2), color: "#191F28", paddingLeft: "5%"}}>매출내역</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sProps.appManager.navGoTo('reset', AppRoute.PARTNER)} style={{ height: height * 0.07, marginLeft: "5%", marginRight: "5%", marginTop: "5%", backgroundColor: "#fff", borderRadius: width * 0.03, flexDirection: "row", alignItems: "center"}}>
                            <View style={{width: width * 0.07, height: width * 0.07, backgroundColor: "#6490E7", justifyContent: "center", alignItems: "center", borderRadius: 10, marginLeft: "5%"}}>
                                <ComponentShoppingBag iHeight={height * 0.02} iWidth={height * 0.05} iColor={"#fff"}/>
                            </View>
                            <Text style={{ fontWeight: "700", fontSize: RFPercentage(2), color: "#191F28", paddingLeft: "5%"}}>브랜드 계정 관리</Text>
                        </TouchableOpacity>
                        {sProps.UserConfigReducer.SALESGROUPMASTER &&
                            <TouchableOpacity onPress={openManageGroup} style={{ height: height * 0.07, marginLeft: "5%", marginRight: "5%", marginTop: "5%", backgroundColor: "#fff", borderRadius: width * 0.03, flexDirection: "row", alignItems: "center"}}>
                                <View style={{width: width * 0.07, height: width * 0.07, backgroundColor: "#EDCCF8", justifyContent: "center", alignItems: "center", borderRadius: 10, marginLeft: "5%"}}>
                                    <ComponentBox iHeight={height * 0.02} iWidth={height * 0.05} iColor={"#fff"}/>
                                </View>
                                <Text style={{ fontWeight: "700", fontSize: RFPercentage(2), color: "#191F28", paddingLeft: "5%"}}>팀관리</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{height : height * 0.07, marginLeft: "5%", marginRight: "5%", backgroundColor: "#fff", alignItems: "center", flexDirection: "row", borderRadius: width * 0.03}}>
                        <View style={{flex:0.6, justifyContent: "center", marginLeft: "5%"}}>
                            <Text style={{ fontSize: RFPercentage(2), fontWeight: "700", color: "#000"}}>푸시 알림</Text>
                        </View>
                        <View style={{flex:0.4, justifyContent: "center", alignItems: "center"}}>
                            <SwitchToggle isOn={togle} onToggle={handleToggle}/>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => handleTHROOPage()} style={{height : height * 0.07, marginLeft: "5%", marginRight: "5%", marginTop: "2%", backgroundColor: "#fff", alignItems: "center", flexDirection: "row", borderRadius: width * 0.03}}>
                        <View style={{flex:0.6, justifyContent: "center", marginLeft: "5%"}}>
                            <Text style={{ fontSize: RFPercentage(2), fontWeight: "700", color: "#000"}}>사장님 창구로 이동</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()} style={{height : height * 0.07, marginLeft: "5%", marginRight: "5%", marginTop: "2%", marginBottom: "5%", backgroundColor: "#fff", alignItems: "center", flexDirection: "row", borderRadius: width * 0.03}}>
                        <View style={{flex:0.6, justifyContent: "center", marginLeft: "5%"}}>
                            <Text style={{ fontSize: RFPercentage(2), fontWeight: "700", color: "#000"}}>로그 아웃</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: height * 0.03 }} />
                </View>
            </Animated.View>
        </MaskedView>
    )
}

export default Home;