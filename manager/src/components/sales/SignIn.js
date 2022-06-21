import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Dimensions,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import messaging from '@react-native-firebase/messaging';

import { CompModalContent } from '../modal/AppModalContent';

const {width, height} = Dimensions.get('window');

const SignIn = ({ oProps, fnSignUp, fnMove }) => {
    const [sEmail, setEmail] = useState("");
    const [sEmailColor, setEmailColor] = useState("#E5E7EA");
    const [sEmailBgColor, setEmailBgColor] = useState("#fff");
    const [sPassword, setPassword] = useState("");
    const [sPasswordColor, setPasswordColor] = useState("#E5E7EA");
    const [sPasswordBgColor, setPasswordBgColor] = useState("#fff");

    const [idFocus, setIdFocus] = useState(false);
    const [pwFocus, setPwFocus] = useState(false);

    const [sErrText1, setErrText1] = useState("");
    const [sErrText2, setErrText2] = useState("");

    const refInput = useRef(null);

    const loginEmailCheck = text => {
        setEmail(text);
        setEmailColor("#6490E7");
        setEmailBgColor("#fff");
        setErrText1("");
    };

    const loginPassCheck = text => {
        setPassword(text);
        setPasswordColor("#6490E7");
        setPasswordBgColor("#fff");
        setErrText2("");
    };

    const activeIdText = () => {
        setIdFocus(true);
        setPwFocus(false);
        setEmailColor("#6490E7");
        setEmailBgColor("#fff");
        setErrText1("");
    }
    
    const unactiveIdText = () => {
        refInput.current?.focus();
        setIdFocus(false);
        setPwFocus(false);
        setEmailColor("#E5E7EA");
        setErrText1("");
    }

    const activePwText = () => {
        setPwFocus(true);
        setIdFocus(false);
        setPasswordColor("#6490E7");
        setPasswordBgColor("#fff");
        setErrText2("");
    }

    const unactivePwText = () => {
        setIdFocus(false);
        setPwFocus(false);
        setPasswordColor("#E5E7EA");
        setErrText2("");
    }

    const getLogin = async () => {
        const sCheck = accessDenied();
        if(sCheck !== undefined && sCheck === "0"){
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
                id: sEmail,
                password: sPassword,
                deviceuuid: randomDeviceId.toString(),
                token: sToken
            }
            const oResponse = await oProps.appManager.accessAxios("/app/sales/authenticate/v3", "post", null, oData);
            if (oResponse !== undefined && oResponse !== null) {
                if (oResponse.resultId === "0000") {
                    if(fnMove !== undefined && typeof fnMove === "function"){
                        await fnMove(oResponse,sToken);
                    }
                } else {
                    openModal(oResponse.resultMsg);
                }
            } else {
                openModal("네트워크 에러입니다 나중에 다시 시도바랍니다.");
            }
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

    const accessDenied = () => {
        let temp = "0";

        if(sEmail === ""){
            temp = "1";
            setEmailColor("#E32938");
            setEmailBgColor("#FFEEEF");
            setErrText1("이메일을 입력해주세요");
        } else if (sPassword === "") {
            temp = "2";
            setPasswordColor("#E32938");
            setPasswordBgColor("#FFEEEF");
            setErrText2("비밀번호를 입력해주세요");
        }
        return temp;
    }

    const moveToSignUp = async () => {
        if(fnSignUp !== undefined && typeof fnSignUp === "function"){
            await fnSignUp();
        }
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={{flex:1, backgroundColor: "#fff"}}>
            <View style={{ height: height * 0.24, backgroundColor: "#fff", justifyContent: "flex-end", alignItems: "center" }}>
                <View style={{ height: height * 0.07, width: "90%", justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={{fontSize: RFPercentage(3.3), fontWeight: '600', color: "#191F28", lineHeight: RFPercentage(4)}}>안녕하세요</Text>
                    <Text style={{fontSize: RFPercentage(3.3), fontWeight: '600', color: "#191F28", lineHeight: RFPercentage(4)}}>매니저 정보를 입력해주세요</Text>
                </View>
            </View>
            <View style={{height: height * 0.05, backgroundColor: "#fff"}} />
            <View style={{flex:1, backgroundColor: "#fff"}}>
                <TextInput
                    placeholder="이메일"
                    placeholderTextColor="#95959E"
                    returnKeyType="next"
                    autoFocus={idFocus}
                    onChangeText={text => loginEmailCheck(text)}
                    onFocus={() => activeIdText()}
                    onBlur={() => unactiveIdText()}
                    onSubmitEditing={() => activePwText()}
                    value={sEmail}
                    style={{
                        fontSize: RFPercentage(2.5),
                        fontWeight: '600',
                        height: height / 14,
                        borderColor: sEmailColor,
                        borderWidth: 1,
                        backgroundColor: sEmailBgColor,
                        marginLeft: '5%',
                        marginRight: '5%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        paddingLeft: "5%",
                        textAlign: 'left',
                        color: "#000"
                    }}
                />
                <View style={{height: sErrText1 === "" ? height * 0.015 : height * 0.04, backgroundColor: "#fff", marginLeft: "6%"}}>
                    <Text style={{fontSize: RFPercentage(2), fontWeight: '500', color: "#E32938", lineHeight: RFPercentage(4)}}>{sErrText1}</Text>
                </View>
                <TextInput
                    ref={refInput}
                    placeholder="비밀번호"
                    placeholderTextColor="#95959E"
                    returnKeyType="done"
                    autoFocus={pwFocus}
                    secureTextEntry={true}
                    onChangeText={text => loginPassCheck(text)}
                    onFocus={() => activePwText() }
                    onBlur={() => unactivePwText() }
                    onSubmitEditing={() => getLogin()}
                    value={sPassword}
                    style={{
                        fontSize: RFPercentage(2.5),
                        fontWeight: '600',
                        height: height / 14,
                        borderColor: sPasswordColor,
                        borderWidth: 1,
                        backgroundColor: sPasswordBgColor,
                        marginLeft: '5%',
                        marginRight: '5%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        paddingLeft: "5%",
                        textAlign: 'left',
                        color: "#000"
                    }}
                />
                <View style={{height: sErrText2 === "" ? height * 0.015 : height * 0.04, backgroundColor: "#fff", marginLeft: "6%"}}>
                    <Text style={{fontSize: RFPercentage(2), fontWeight: '500', color: "#E32938", lineHeight: RFPercentage(4)}}>{sErrText2}</Text>
                </View>
                <TouchableOpacity
                    onPress={getLogin}
                    style={{
                        height: height / 14,
                        backgroundColor: '#6490E7',
                        marginLeft: '5%',
                        marginRight: '5%',
                        marginTop: '2%',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: RFPercentage(2.5), fontWeight: '800', color: '#fff' }}>로그인</Text>
                </TouchableOpacity>
                <View style={{ height: height * 0.13, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                    <Text onPress={moveToSignUp} style={{fontSize: RFPercentage(2.5), fontWeight: '600', color: "#6490E7"}}>스루 매니저 가입하기</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SignIn;