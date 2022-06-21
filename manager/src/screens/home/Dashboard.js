
import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, Text, AppState, Platform, FlatList, Image, Linking } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import moment from 'moment-timezone';
import 'moment/locale/ko';

import { CompModalStoreManage } from '../../components/modal/AppModalContent';

import { ComponentDrawer} from '../../assets/svg/drawer';

import Footer from '../../components/footer/Footer';

const { width, height } = Dimensions.get('window');

const Dashboard = ({ sProps, fnAnimateMove }) => {
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pageNumber, setPageNumber] = useState("");
    const [sList, setList] = useState([]);
    const [bannerList, setBannerList] = useState([]);

    const appState = useRef(AppState.currentState);

    const openUrl = async (item) => {
        if(item.param !== undefined && item.param !== null && item.param !== ""){
            Linking.openURL("https://ceo.throo.co.kr" + item.move_path + "?" + item.param).catch(err => {});
        }
    }

    const animateMove = async () => {
        if(fnAnimateMove !== undefined && typeof fnAnimateMove === "function"){
            await fnAnimateMove();
        }
    }

    const openStoreManage = async (sIndex) => {
        sProps.appManager.showModal(
            true,
            <CompModalStoreManage 
                oProps={sProps}
                item={sIndex}
                fnClose={() => sProps.appManager.hideModal()}
                fnDelete={() => deleteStore()}
            />, 
            "custom",
        );
    };

    const deleteStore = () => {
        sProps.appManager.hideModal();
        asyncData();
    }

    const refreshData = async () => {
        setDataLoading(true);
        const oData = {
            salesId: sProps.UserConfigReducer.SALESID,
            pageNm: pageNumber + 10
        }
        const iResponse = await sProps.appManager.accessAxios("/app/sales/dashboard/v2", "post", null, oData);
        if (iResponse !== undefined) {
            if (iResponse.resultCd === "0000") {
                setList(iResponse.storeList);
                setPageNumber(iResponse.pageNm);
            }
        }
        setDataLoading(false);
    }

    const asyncData = async () => {
        setLoading(true);
        const oData = {
            salesId: sProps.UserConfigReducer.SALESID
        }
        const iResponse = await sProps.appManager.accessAxios("/app/sales/dashboard/v2", "post", null, oData);
        if (iResponse !== undefined) {
            if (iResponse.resultCd === "0000") {
                setList(iResponse.storeList);
                setBannerList(iResponse.bannerList);
                setPageNumber(iResponse.pageNm);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                asyncData();
            }
            appState.current = nextAppState;
        });
        return () => {
            subscription.remove();
        };
    },[]);

    useEffect(() => {
        asyncData();
    }, []);

    return (
        <>
            {loading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#555"}}>
                    <LottieView style={{width: width * 0.7, height: width * 0.7 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                </View>
            :
                <>
                    <View style={{ height: height * 0.03 }}/>
                    <View style={{height: height * 0.08, flexDirection: "row", backgroundColor: "#fff"}}>
                        <View style={{flex: 0.8, justifyContent: "flex-end", paddingLeft: "5%"}}>
                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#000"}}>{sProps.UserConfigReducer.SALESUSERNAME} 매니저님</Text>
                            <Text style={{ fontWeight: "700", fontSize: RFPercentage(2), color: "#919AA7"}}>{moment().format('YYYY MMMM Do dddd')}</Text>
                        </View>
                        <View style={{flex: 0.2, alignItems: "center", paddingTop: "5%"}}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => animateMove()}  style={{height: height * 0.06, width: height * 0.06, alignItems: "center", borderRadius: width * 0.05 }}>
                                <ComponentDrawer iHeight={height * 0.06} iWidth={height * 0.06} />
                            </TouchableOpacity>
                            <View style={{height: height * 0.01}}/>
                        </View>
                    </View>
                    <View style={{ height: height * 0.02, borderBottomColor: "#F2F3F5", borderBottomWidth: 1, marginLeft: "5%", marginRight: "5%" }} />
                    <View style={{height: height * 0.23, justifyContent: "center", width}}>
                        <FlatList
                            data={bannerList}
                            horizontal
                            contentContainerStyle={{paddingHorizontal: width * 0.05, alignItems: "center" }}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(data, index) => "list-" + index + Math.random()}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        {item.param !== "mob_promotion" &&
                                            <TouchableOpacity 
                                                onPress={() => openUrl(item)}
                                                style={{
                                                    height: height * 0.2,
                                                    width: height * 0.3,
                                                    borderRadius: width * 0.03,
                                                    backgroundColor: "#fff",
                                                    marginRight: width * 0.03,
                                                    ...Platform.select({
                                                        ios: {
                                                            shadowColor: "#191F28",
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 5,
                                                            shadowOffset: {
                                                                height: 0,
                                                                width: 0,
                                                            },
                                                        },
                                                        android: {
                                                            shadowColor: "#191F28",
                                                            elevation: 5,
                                                        },
                                                    })
                                                }}
                                            >
                                                <Image source={{uri: item.url_path}} style={{height: height * 0.2, width: height * 0.3, borderRadius: 5, resizeMode: "stretch"}}/>
                                            </TouchableOpacity>
                                        }
                                    </>
                                ) 
                            }}
                        />
                    </View>
                    <View style={{ height: height * 0.02, borderTopColor: "#F2F3F5", borderTopWidth: 1, marginLeft: "5%", marginRight: "5%" }} />
                    <View style={{ flex:1 }}>
                        <FlatList
                            data={sList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(data, index) => "list-" + index.toString()}
                            onEndReached={refreshData}
                            refreshing={true}
                            onEndReachedThreshold={0.5}
                            ListHeaderComponent={
                                <View style={{ height: height * 0.08 }}>
                                    <View style={{flex: 0.8, justifyContent: "flex-end", paddingLeft: "5%"}}>
                                        <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#000"}}>최근 등록한 매장 리스트</Text>
                                        <Text style={{ fontWeight: "600", fontSize: RFPercentage(2), color: "#919AA7"}}>{moment().format("LT")} 기준</Text>
                                    </View>
                                </View>

                            }
                            ListFooterComponent={
                                <View style={{width, height: height * 0.2, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}} />
                            }
                            ListEmptyComponent={
                                <View style={{height: height * 0.2, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{fontWeight: "400", fontSize: RFPercentage(1.7), color: "#bbb"}}>아직 등록된 매장이 없습니다</Text>
                                </View>
                            }
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ height: height * 0.1, backgroundColor: "#fff", marginLeft: "5%", marginRight: "5%", marginBottom: "2%", flexDirection: "row", borderBottomColor: "#F2F3F5", borderBottomWidth: 1}}>
                                        <View style={{ height: height * 0.1, width: height * 0.1, justifyContent: "center", alignItems: "center"}}>
                                            <Image source={{uri: item.urlPath}} style={{height: height * 0.08, width: height * 0.08, borderRadius: width * 0.02 }}/>
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.5, justifyContent: "center", paddingLeft: "2%"}}>
                                            <Text style={{ fontWeight: "bold", fontSize: RFPercentage(2.3), color: "#191F28"}}>
                                                {(item.storeNm !== undefined && item.storeNm !== null && item.storeNm !== "") ? item.storeNm : item.email}
                                            </Text>
                                            {parseInt(item.status) > 0 ? 
                                                <Text style={{ fontWeight: "800", fontSize: RFPercentage(2), color: "#6490E7"}}>등록이 완료되었습니다</Text>
                                            : 
                                                <Text style={{ fontWeight: "800", fontSize: RFPercentage(2), color: "#EF4452"}}>매장 등록중입니다</Text>
                                            }
                                        </View>
                                        <View style={{ height: height * 0.1, width: width * 0.2, justifyContent: "center", alignItems: "center"}}>
                                            <TouchableOpacity onPress={() => openStoreManage(item)} style={{ height: height * 0.04, width: width * 0.17, backgroundColor: "#E8EFFC", borderRadius: width * 0.02, justifyContent: "center", alignItems: "center"}}>
                                                <Text style={{ fontWeight: "700", fontSize: RFPercentage(2), color: "#6490E7"}}>열기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    {dataLoading &&
                        <View style={{ position: "absolute", bottom: 0, left: 0, height: height * 0.35, width, alignItems: "center", opacity: 0.9}}>
                            <LottieView style={{width: width * 0.4, height: width * 0.4 }} source={require('../../assets/lottie/throo_splash.json')} autoPlay loop/>
                        </View>
                    }
                    <View style={{width, height: height * 0.1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff"}} />
                    <Footer 
                        oProps={sProps}
                        sLocation={"home"}
                    />
                </>
            }
        </>
    )
}

export default Dashboard;