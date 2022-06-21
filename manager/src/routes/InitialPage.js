import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Platform, View, SafeAreaView } from 'react-native';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from "react-native-version-check";
import PushNotification, { Importance } from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

import constants from '../config/constants';
import {setUserConfig} from '../reducers/UserConfigReducer';

import {AppRoute} from '../routes/AppRoutes';

import { ComponentAppIcon1 } from '../assets/svg/appIcon1';

import AppNotice from '../components/sales/AppNotice';
import HomeScreen from '../components/sales/Home';
import SignIn from '../components/sales/SignIn';
import SignUpPage from '../components/sales/SignUp';

import { CompModalContent } from '../components/modal/AppModalContent';

const { width, height } = Dimensions.get('window');

export default initialRoute = oProps => {
    const [isLogin, setIsLogin] = useState("0");
    const [isCheck, setCheck] = useState(oProps.UserConfigReducer.INITITALPAGE);
    const [pageLine, setPageLine] = useState("0");

    const inititalize = async () => {
        if(oProps.UserConfigReducer.AUTOLOGIN){
            let randomDeviceId = (Math.random() * (10 - 1)) + 1;
            let sToken = "";
    
            const authorizationStatus = await messaging().requestPermission();
            if(authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED){
                if(sToken === undefined || sToken === null || sToken === ""){
                    await messaging().registerDeviceForRemoteMessages();
                    sToken = await messaging().getToken();
                }
            }

            const oData = {
                id: oProps.UserConfigReducer.LOGINID,
                password: oProps.UserConfigReducer.LOGINPW,
                deviceuuid: randomDeviceId.toString(),
                token: sToken
            }
            const oResponse = await oProps.appManager.accessAxios("/app/sales/auto/v3", "post", null, oData);
            if (oResponse !== undefined && oResponse !== null) {
                if (oResponse.resultId === "0000") {
                    asyncData(oResponse,sToken);
                } else {
                setIsLogin("1");
                openModal("존재하지않는 로그인정보입니다");
                }
            } else {
                setIsLogin("1");
                openModal("네트워크 에러입니다 나중에 다시 시도바랍니다.");
            }
        } else {
            setIsLogin("1");
        }
    };

    const startFunction = () => {
        setPageLine("2");
    };

    const signInFunction = () => {
        setPageLine("1");
    };

    const asyncData = async (sIndex,aIndex) => {
        let oUserConfig = {};
        
        oUserConfig['AUTOLOGIN'] = true;
        oUserConfig['LOGINID'] = sIndex.loginId;
        oUserConfig['LOGINPW'] = sIndex.loginPw;
        oUserConfig['USERPUSHTOKEN'] = aIndex;
        oUserConfig['ACTIVATE'] = sIndex.activated;

        oUserConfig['SALESGROUPID'] = sIndex.groupId;
        oUserConfig['SALESID'] = sIndex.salesId;
        oUserConfig['SALESUSERNAME'] = sIndex.salesName;
        oUserConfig['SALESUSERPHONE'] = sIndex.salesPhone;
        oUserConfig['SALESUSERCOMPANY'] = sIndex.salesCompany;
        
        if(aIndex === ""){
            oUserConfig['APPPUSHSTATUS'] = false;
        } else {
            oUserConfig['APPPUSHSTATUS'] = true;
        }
        
        if(sIndex.isMaster.toString() === "0"){
            oUserConfig['SALESGROUPMASTER'] = false;
        } else {
            oUserConfig['SALESGROUPMASTER'] = true;
        }
        
        await oProps.reduxSetUserConfig(oUserConfig);

        oProps.appManager.navGoTo('reset', AppRoute.HOME);
    }
    
    const confirm = async () => {
        let oUserConfig = {};
        oUserConfig['INITITALPAGE'] = false;
        await oProps.reduxSetUserConfig(oUserConfig);
        setCheck(false);
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
        PushNotification.removeAllDeliveredNotifications();
        inititalize();
    }, []);

    return (
        <>
            {isLogin === "0" &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                    <ComponentAppIcon1 iHeight={height * 0.1} iWidth={height * 0.1} iColor={"#646970"}/>
                </View>
            }
            {isLogin === "1" &&
                <>
                    {isCheck ?
                        <AppNotice 
                            fnTermAgree={() => confirm()}
                        />
                    :
                        <>
                            {pageLine === "0" &&
                                <HomeScreen
                                    fnStart={() => startFunction()}
                                    fnSignIn={() => signInFunction()}
                                />
                            }
                            {pageLine === "1" &&
                                <SignIn 
                                    oProps={oProps}
                                    fnMove={(sIndex,aIndex) => asyncData(sIndex,aIndex)}
                                    fnSignUp={() => setPageLine("2")}
                                    fnFindId={() => setPageLine("3")}
                                    fnFindPwd={() => setPageLine("4")}
                                />
                            }
                            {pageLine === "2" &&
                                <SignUpPage 
                                    oProps={oProps}
                                    fnReturn={() =>setPageLine("0")}
                                    fnMove={(sIndex,aIndex) => asyncData(sIndex,aIndex)}
                                />
                            }
                        </>
                    }
                </>
            }
        </>
    )

}