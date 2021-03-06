import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Dimensions, Text, TextInput, Animated, Keyboard, TouchableOpacity, FlatList, Image } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import moment from 'moment-timezone';
import 'moment/locale/ko';

import Footer from '../../components/footer/Footer';

import { ComponentSearch } from '../../assets/svg/search';

let checkTime;

const { width, height } = Dimensions.get('window');

const StoreList = oProps => {
    const [loading, setLoading] = useState(false);

    const [sNm, setNm] = useState("");

    const [storeList, setstoreList] = useState([]);
    const [initList, setInitList] = useState([]);
    const [sBackground, setBackground] = useState("#FAFAFB");
    
    const [textInputType, setTextInputType] = useState("");
    
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    
    const [bottomAnimated] = useState(new Animated.Value(0));

    const onChangeNm = text => {
        if(text === undefined || text === null || text === ""){
            setstoreList(initList);
        }
        setNm(text);
    };

    const onSearching = async () => {
        setLoading(true);
        const oData = {
            salesId: oProps.UserConfigReducer.SALESID,
            sNm
        }
        const iResponse = await oProps.appManager.accessAxios("/app/sales/store/search/enrolled", "post", null, oData);
        console.log("iResponse",iResponse);
        if (iResponse !== undefined) {
            setstoreList(iResponse);
        }
        searchHideAnimate();
        setLoading(false);
    };

    const searchWideAnimate = () => {
        Animated.timing(bottomAnimated, {
            toValue: width * 0.9,
            duration: 1000,
            useNativeDriver: false,
        }).start();
        setTextInputType("nm");
        setBackground("#fff");
    }

    const searchHideAnimate = async () => {
        setTextInputType("");
        Keyboard.dismiss();
        await Animated.timing(bottomAnimated, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        if(checkTime) clearTimeout(checkTime);
        checkTime = await setTimeout(() => {
            setBackground("#FAFAFB");
        }, 1100);
    }

    const animationStyles = {
        width: bottomAnimated,
    };

    const asyncData = async () => {
        setLoading(true);
        const sales_id = oProps.UserConfigReducer.SALESID;
        const oResponse = await oProps.appManager.accessAxios("/app/sales/store/enrolled-" + sales_id, "get", "text", null);
        if (oResponse !== undefined) {
            setstoreList(oResponse);
            setInitList(oResponse);
        }
        setLoading(false);
    };

    const onKeyboardDidShow = (e) => {
        setKeyboardHeight(e.endCoordinates.height);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        asyncData();
    }, []);

    return (
        <View style={{flex:1, backgroundColor: "#fff"}}>
            {loading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#555"}}>
                    <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                </View>
            :
                <>
                    <View style={{ height: height * 0.03 }}/>
                    <View style={{height: height * 0.08, flexDirection: "row", alignItems: "flex-end", paddingLeft: "10%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.2), color: "#001E62"}}>???????????? ??????</Text>
                    </View>
                    <View style={{ height: height * 0.08, flexDirection: "row", borderColor: "#6490E7", borderBottomColor: "#6490E7", justifyContent: "center", alignItems: "flex-end", flexDirection: "row", marginLeft: "5%", marginRight: "5%" }}>
                        <TextInput
                            placeholder="???) ????????? ????????????"
                            placeholderTextColor="#000"
                            returnKeyType="done"
                            onChangeText={text => onChangeNm(text)}
                            onFocus={() => searchWideAnimate()}
                            onBlur={() => searchHideAnimate()}
                            onSubmitEditing={() => onSearching()}
                            value={sNm}
                            style={{
                                width: "80%",
                                paddingLeft: "5%",
                                backgroundColor: sBackground,
                                height: height * 0.06,
                                fontSize: RFPercentage(2),
                                fontWeight: '500',
                                borderRadius: width * 0.03,
                                color: "#000"
                            }}
                        />
                        <TouchableOpacity onPress={onSearching} style={{ height: height * 0.06, width: "15%", backgroundColor: "#F9E3A7", justifyContent: "center", alignItems: "center", marginLeft: "5%", borderRadius: width * 0.02}}>
                            <ComponentSearch iHeight={height * 0.03} iWidth={height * 0.03} iColor={"#FFAF31"}/>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={[objectStyles.object, animationStyles]} />
                    {textInputType === "" &&
                        <View style={{ flex:1 }}>
                            <FlatList
                                data={storeList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(data, index) => "list-" + index.toString()}
                                ListHeaderComponent={
                                    <View style={{ height: height * 0.03, borderBottomColor: "#F2F3F5", borderBottomWidth: 1, marginLeft: "5%", marginRight: "5%" }} />
                                }
                                ListFooterComponent={
                                    <View style={{ height: height * 0.1 }} />
                                }
                                ListEmptyComponent={
                                    <View style={{height: height * 0.2, justifyContent: "center", alignItems: "center"}}>
                                        <Text style={{fontWeight: "400", fontSize: RFPercentage(1.7), color: "#bbb"}}>
                                            {oProps.UserConfigReducer.SALESGROUPID.toString() === "100" ?
                                                "????????? ???????????????"
                                            :
                                                "????????? ????????????"
                                            }
                                        </Text>
                                    </View>
                                }
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ height: height * 0.1, backgroundColor: "#fff", marginLeft: "5%", marginRight: "5%", marginBottom: "2%", flexDirection: "row", borderBottomColor: "#F2F3F5", borderBottomWidth: 1}}>
                                            <View style={{ height: height * 0.1, width: height * 0.1, justifyContent: "center", alignItems: "center"}}>
                                                <Image source={{uri: item.urlPath}} style={{height: height * 0.08, width: height * 0.08, borderRadius: width * 0.02 }}/>
                                            </View>
                                            <View style={{ height: height * 0.1, width: width * 0.5, justifyContent: "center", paddingLeft: "2%"}}>
                                                <Text style={{ fontWeight: "bold", fontSize: RFPercentage(1.8), color: "#191F28"}}>
                                                    {(item.storeNm !== undefined && item.storeNm !== null && item.storeNm !== "") ? item.storeNm : item.email}
                                                </Text>
                                                {parseInt(item.status) > 0 ? 
                                                    <Text style={{ fontWeight: "800", fontSize: RFPercentage(1.5), color: "#6490E7"}}>????????? ?????????????????????</Text>
                                                : 
                                                    <Text style={{ fontWeight: "800", fontSize: RFPercentage(1.5), color: "#EF4452"}}>?????? ??????????????????</Text>
                                                }
                                            </View>
                                            <View style={{ height: height * 0.1, width: width * 0.2, justifyContent: "center", alignItems: "center"}}>
                                                <View style={{ height: height * 0.04, width: width * 0.17, backgroundColor: "#E8EFFC", borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                                    <Text style={{ fontWeight: "700", fontSize: RFPercentage(1.6), color: "#6490E7"}}>??????</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    }
                    {textInputType === "nm" &&
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onSearching()} style={{width, height: height * 0.08, backgroundColor: "#6490E8", justifyContent: "center", alignItems: "center", position: "absolute", bottom: keyboardHeight - height * 0.42}}>
                            <Text style={{fontWeight: "800", fontSize: RFPercentage(2), color: "#fff" }}>??????</Text>
                        </TouchableOpacity>
                    }
                    {textInputType === "" &&
                        <>
                            <View style={{width, height: height * 0.1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}} />
                            <Footer 
                                oProps={oProps}
                                sLocation={"total"}
                            />
                        </>
                    }
                </>
            }
        </View>
    )
}

const objectStyles = {
    object: {
        height: height * 0.01, 
        borderBottomColor: "#FFAF31", 
        borderBottomWidth: 2, 
        marginLeft: "5%"
    },
}

export default StoreList;