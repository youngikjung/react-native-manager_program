import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, Dimensions, Text, TextInput, Keyboard } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import messaging from '@react-native-firebase/messaging';

import { ComponentArrowLeft3 } from '../../assets/svg/arrowLeft3';

import { CompModalContent } from '../modal/AppModalContent';

import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const SignUpPage = ({ oProps, fnReturn, fnMove }) => {
    const [sId, setId] = useState("");
    const [sName, setName] = useState("");
    const [sPhone, setPhone] = useState("");
    const [sPw, setPw] = useState("");
    const [sPwd, setPwd] = useState("");

    const [sIdErrColor, setIdErrColor] = useState("#F2F3F5");
    const [sNmErrColor, setNmErrColor] = useState("#F2F3F5");
    const [sPhoneErrColor, setPhoneErrColor] = useState("#F2F3F5");
    const [sPwErrColor, setPwErrColor] = useState("#F2F3F5");
    const [sPwdErrColor, setPwdErrColor] = useState("#F2F3F5");
    const [sIdErrText, setIdErrText] = useState("");
    const [sNmErrText, setNmErrText] = useState("");
    const [sPhoneErrText, setPhoneErrText] = useState("");
    const [sPwErrText, setPwErrText] = useState("");
    const [sPwdErrText, setPwdErrText] = useState("");

    const [textInputType, setTextInputType] = useState("");

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const scrollViewRef = useRef(null);

    const prevStep = async () => {
        if(fnReturn !== undefined && typeof fnReturn === "function"){
            await fnReturn();
        }
    }

    const onChangeEmail = text => {
        setId(text);
        setIdErrColor("#6490E7");
        setIdErrText("");
    };

    const onChangeName = text => {
        setName(text);
        setNmErrColor("#6490E7");
        setNmErrText("");
    };

    const onChangePw = text => {
        setPw(text);
        setPwErrColor("#6490E7");
        setPwErrText("");
    };

    const onChangePwd = text => {
        setPwd(text);
        setPwdErrColor("#6490E7");
        setPwdErrText("");
    };

    const onChangePhone = text => {
        setPhone(text);
        setPhoneErrColor("#6490E7");
        setPhoneErrText("");
    };
    
    const activeIdText = () => {
        setIdErrColor("#6490E7");
        setNmErrColor("#F2F3F5");
        setPhoneErrColor("#F2F3F5");
        setPwErrColor("#F2F3F5");
        setPwdErrColor("#F2F3F5");
        setTextInputType("id");
    }
    const activeNmText = () => {
        setNmErrColor("#6490E7");
        setIdErrColor("#F2F3F5");
        setPhoneErrColor("#F2F3F5");
        setPwErrColor("#F2F3F5");
        setPwdErrColor("#F2F3F5");
        setTextInputType("nm");
    }
    const activePhoneText = () => {
        setPhoneErrColor("#6490E7");
        setIdErrColor("#F2F3F5");
        setNmErrColor("#F2F3F5");
        setPwErrColor("#F2F3F5");
        setPwdErrColor("#F2F3F5");
        setTextInputType("phone");
    }
    const activePwText = () => {
        setPwErrColor("#6490E7");
        setIdErrColor("#F2F3F5");
        setNmErrColor("#F2F3F5");
        setPhoneErrColor("#F2F3F5");
        setPwdErrColor("#F2F3F5");
        setTextInputType("pw");
    }
    const activePwdText = () => {
        setPwdErrColor("#6490E7");
        setIdErrColor("#F2F3F5");
        setNmErrColor("#F2F3F5");
        setPhoneErrColor("#F2F3F5");
        setPwErrColor("#F2F3F5");
        setTextInputType("pwd");
    }
    const unactiveIdText = () => {
        setIdErrColor("#F2F3F5");
        setTextInputType("");
        Keyboard.dismiss();
    }
    const unactiveNmText = () => {
        setNmErrColor("#F2F3F5");
        setTextInputType("");
        Keyboard.dismiss();
    }
    const unactivePhoneText = () => {
        setPhoneErrColor("#F2F3F5");
        setTextInputType("");
        Keyboard.dismiss();
    }
    const unactivePwText = () => {
        setPwErrColor("#F2F3F5");
        setTextInputType("");
        Keyboard.dismiss();
    }
    const unactivePwdText = () => {
        setPwdErrColor("#F2F3F5");
        setTextInputType("");
        Keyboard.dismiss();
    }


    const nextInputSection = (sIndex) => {
        if(sIndex === "id"){
            unactiveIdText();
        } else if(sIndex === "nm") {
            unactiveNmText();
        } else if(sIndex === "phone") {
            unactivePhoneText();
        } else if(sIndex === "pw") {
            unactivePwText();
        } else if(sIndex === "pwd") {
            unactivePwdText();
        } else {
            Keyboard.dismiss()
        }
    }

    const checkId = async sIndex => {
        let hasId = true;
        let hasText = "";
        let hasColor = "#F2F3F5";
        const oResponse = await oProps.appManager.accessAxios("/app/sales/register/findEmail-" + sIndex, "get", "text", null);
        if(oResponse !== undefined && oResponse !== null){
            hasId = oResponse;
        }

        if(hasId){
            hasColor = "#dd1212";
            hasText = "이미 사용중인 이메일입니다";
        }

        setIdErrColor(hasColor);
        setIdErrText(hasText);

        return hasId;
    }

    const emailValidation = () => {
        let result = false;
        let temp = "#F2F3F5";
        let tempText = "";

        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(!regExp.test(sId)){
            result = true;
            temp = "#dd1212";
            tempText = "이메일 형식에 맞지 않습니다";
        }

        setIdErrColor(temp);
        setIdErrText(tempText);

        return result;
    }

    const checkPhoneNm = async () => {
        let result = false;
        let temp = "#F2F3F5";
        let tempText = "";

        const regex = /[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
        if (!regex.test(sPhone)) {
            result = true;
            temp = "#dd1212";
            tempText = "'-'을 제외한 숫자 및 올바른 번호가 필요합니다";
        }

        setPhoneErrColor(temp);
        setPhoneErrText(tempText);

        return result;
    }

    const access = async () => {
        let sToken = "";
        if(sId === ""){
            setIdErrColor("#dd1212");
            setIdErrText("이메일을 입력해주세요");
            setTextInputType("");
            Keyboard.dismiss();
        } else if (sName === "") {
            setNmErrColor("#dd1212");
            setNmErrText("이름을 입력해주세요");
            setTextInputType("");
            Keyboard.dismiss();
        } else if (sPhone === "") {
            setPhoneErrColor("#dd1212");
            setPhoneErrText("전화번호를 입력해주세요");
            setTextInputType("");
            Keyboard.dismiss();
        } else if (sPw === "") {
            setPwErrColor("#dd1212");
            setPwErrText("비밀번호 한번 더 입력해주세요");
            setTextInputType("");
            Keyboard.dismiss();
        } else if (sPwd === "") {
            setPwdErrColor("#dd1212");
            setPwdErrText("비밀번호 한번 더 입력해주세요");
            setTextInputType("");
            Keyboard.dismiss();
            scrollViewRef.current.scrollToEnd({ animated: true });
        } else if (sPwd !== sPw) {
            setPwErrColor("#dd1212");
            setPwdErrColor("#dd1212");
            setPwErrText("비밀번호 한번 더 확인해주세요");
            setPwdErrText("비밀번호 한번 더 확인해주세요");
            setTextInputType("");
            Keyboard.dismiss();
            scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
            const validateEmail = await emailValidation();
            if(!validateEmail){
                const checkEmail = await checkId(sId);
                if(!checkEmail){
                    const checkPhone = await checkPhoneNm(); 
                    if(!checkPhone){
                        const authorizationStatus = await messaging().requestPermission();
                        if(authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED){
                            if(sToken === undefined || sToken === null || sToken === ""){
                                await messaging().registerDeviceForRemoteMessages();
                                sToken = await messaging().getToken();
                            }
                        }
                        const oData = {
                            sName,
                            sPhone,
                            sEmail: sId,
                            sPassword: sPw,
                            token: sToken
                        }
                        const oResponse = await oProps.appManager.accessAxios("/app/sales/partnersSignUp/v3", "post", null, oData);
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

    const onKeyboardDidShow = (e) => {
        setKeyboardHeight(e.endCoordinates.height);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    }, []);

    return (
        <View style={{flex:1, backgroundColor: "#fff"}}>
            <View style={{height: height * 0.15, backgroundColor: "#fff", justifyContent: "flex-end", marginLeft: "5%"}}>
                <TouchableOpacity activeOpacity={0.8} onPress={prevStep} style={{ height: "50%", width: "10%", justifyContent: "center", alignItems: "flex-start"}}>
                    <ComponentArrowLeft3 iHeight={height * 0.025} iWidth={width * 0.05} iColor={"#646970"}/>
                </TouchableOpacity>
            </View>
            <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", marginLeft: "5%"}}>
                <Text style={{fontWeight: "600", fontSize: RFPercentage(2.8), color: "#191F28", lineHeight: RFPercentage(3.5) }}>사용하실 계정 정보를</Text>
                <Text style={{fontWeight: "600", fontSize: RFPercentage(2.8), color: "#191F28", lineHeight: RFPercentage(3.5) }}>입력해 주세요.</Text>
            </View>
            <ScrollView style={{flex:1, backgroundColor: "#fff"}} ref={scrollViewRef}>
                {(textInputType === "" || textInputType === "id") &&
                    <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                        {sId !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#8B94A1" }}>이메일</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="이메일"
                            placeholderTextColor="#B0B7C1"
                            returnKeyType="next"
                            onChangeText={text => onChangeEmail(text)}
                            onFocus={() => activeIdText()}
                            onBlur={() => unactiveIdText()}
                            onSubmitEditing={() => nextInputSection(textInputType)}
                            value={sId}
                            style={{
                                width: "90%",
                                height: height * 0.07,
                                fontSize: RFPercentage(2.3),
                                borderBottomColor: sIdErrColor,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                color: "#000"
                            }}
                        />
                        {sIdErrText !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#E32938" }}>{sIdErrText}</Text>
                            </View>
                        }
                    </View>
                }
                {(textInputType === "" || textInputType === "nm") &&
                    <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                        {sName !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#8B94A1" }}>이름</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="이름"
                            placeholderTextColor="#B0B7C1"
                            returnKeyType="next"
                            onChangeText={text => onChangeName(text)}
                            onFocus={() => activeNmText()}
                            onBlur={() => unactiveNmText()}
                            onSubmitEditing={() => nextInputSection(textInputType)}
                            value={sName}
                            style={{
                                width: "90%",
                                height: height * 0.07,
                                fontSize: RFPercentage(2.3),
                                borderBottomColor: sNmErrColor,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                color: "#000"
                            }}
                        />
                        {sNmErrText !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#E32938" }}>{sNmErrText}</Text>
                            </View>
                        }
                    </View>
                }
                {(textInputType === "" || textInputType === "phone") &&
                    <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                        {sPhone !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#8B94A1" }}>전화번호</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="전화번호"
                            placeholderTextColor="#B0B7C1"
                            returnKeyType="next"
                            maxLength={11}
                            keyboardType="numeric"
                            onChangeText={text => onChangePhone(text)}
                            onFocus={() => activePhoneText()}
                            onBlur={() => unactivePhoneText()}
                            onSubmitEditing={() => nextInputSection(textInputType)}
                            value={sPhone}
                            style={{
                                width: "90%",
                                height: height * 0.07,
                                fontSize: RFPercentage(2.3),
                                borderBottomColor: sPhoneErrColor,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                color: "#000"
                            }}
                        />
                        {sPhoneErrText !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#E32938" }}>{sPhoneErrText}</Text>
                            </View>
                        }
                    </View>
                }
                {(textInputType === "" || textInputType === "pw") &&
                    <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                        {sPw !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#8B94A1" }}>비밀번호</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="비밀번호"
                            placeholderTextColor="#B0B7C1"
                            returnKeyType="next"
                            keyboardType="numeric"
                            secureTextEntry={true}
                            onChangeText={text => onChangePw(text)}
                            onFocus={() => activePwText()}
                            onBlur={() => unactivePwText()}
                            onSubmitEditing={() => nextInputSection(textInputType)}
                            value={sPw}
                            style={{
                                width: "90%",
                                height: height * 0.07,
                                fontSize: RFPercentage(2.3),
                                borderBottomColor: sPwErrColor,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                color: "#000"
                            }}
                        />
                        {sPwErrText !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#E32938" }}>{sPwErrText}</Text>
                            </View>
                        }
                    </View>
                }
                {(textInputType === "" || textInputType === "pwd") &&
                    <View style={{height: height * 0.13, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                        {sPwd !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#8B94A1" }}>비밀번호확인</Text>
                            </View>
                        }
                        <TextInput
                            placeholder="비밀번호확인"
                            placeholderTextColor="#B0B7C1"
                            returnKeyType="next"
                            keyboardType="numeric"
                            secureTextEntry={true}
                            onChangeText={text => onChangePwd(text)}
                            onFocus={() => activePwdText()}
                            onBlur={() => unactivePwdText()}
                            onSubmitEditing={() => nextInputSection(textInputType)}
                            value={sPwd}
                            style={{
                                width: "90%",
                                height: height * 0.07,
                                fontSize: RFPercentage(2.3),
                                borderBottomColor: sPwdErrColor,
                                borderBottomWidth: 1,
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                color: "#000"
                            }}
                        />
                        {sPwdErrText !== "" &&
                            <View style={{height: height * 0.03, backgroundColor: "#fff", width, justifyContent: "center", marginLeft: "10%"}}>
                                <Text style={{fontWeight: "500", fontSize: RFPercentage(1.4), color: "#E32938" }}>{sPwdErrText}</Text>
                            </View>
                        }
                    </View>
                }
            </ScrollView>
            {textInputType === "" &&
                <View style={{height: height / 6 , backgroundColor: "#fff", justifyContent: "center"}}>
                    <TouchableOpacity
                        onPress={access}
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
                        <Text style={{ fontSize: RFPercentage(2.5), fontWeight: '800', color: '#fff' }}>등록하기</Text>
                    </TouchableOpacity>
                </View>
            }
            {(textInputType === "id" || textInputType === "nm" || textInputType === "phone" || textInputType === "pw" || textInputType === "pwd") &&
                <TouchableOpacity activeOpacity={0.8} onPress={() => nextInputSection(textInputType)} style={{width, height: height * 0.08, backgroundColor: "#6490E8", justifyContent: "center", alignItems: "center", position: "absolute", bottom: keyboardHeight}}>
                    <Text style={{fontWeight: "800", fontSize: RFPercentage(2), color: "#fff" }}>확인</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default SignUpPage;