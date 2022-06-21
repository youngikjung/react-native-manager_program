import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

import Dashboard from './Dashboard';
import MyPage from './MyPage';

let sCheckTime;

const { width, height } = Dimensions.get('window');
const fromCoords = { x: 0, y: height };
const toCoords = { x: width, y: 0 };

const Home = oProps => {
    const [iState, setState] = useState("none");

    const animation = useRef(new Animated.ValueXY(fromCoords)).current;
    
    const animate = (toValue) => {
        return Animated.spring(animation, {
            toValue: toValue === 1 ? toCoords : fromCoords,
            useNativeDriver: true,
            bounciness: 5,
            speed: 5,
        });
    };

    const onCloseDrawer = useCallback(async () => {
        animate(0).start();
        sCheckTime = setTimeout(() => {
            setState("none");
            clearTimeout(sCheckTime);
        }, 300);
    }, []);

    const onOpenDrawer = useCallback(async () => {
        animate(1).start();
        setState("nav");
    }, []);


    useEffect(() => {
        PushNotification.removeAllDeliveredNotifications();
    }, []);

    return (
        <View style={{flex:1, backgroundColor: "#fff"}}>
            {iState === "nav" ?
                <MyPage 
                    sProps={oProps}
                    fnAimation={animation}
                    sFromCoords={fromCoords}
                    fnAnimateMove={() => onCloseDrawer()}
                />
            :
                <Dashboard 
                    sProps={oProps}
                    fnAnimateMove={() => onOpenDrawer()}
                />
            }
        </View>
    )
}

export default Home;