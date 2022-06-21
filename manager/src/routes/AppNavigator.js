import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import {setUserConfig} from '../reducers/UserConfigReducer';
import {setStoreConfig} from '../reducers/StoreConfigReducer';

import {AppRoute} from './AppRoutes';

import {EffectFadeIn} from '../assets/svg/effectFadeIn';

import CommonStyles from '~/styles/common';

import InitialRoute from './InitialPage';
import HomePage from '../screens/home/Main';
import EnrollPage from '../screens/enroll/Main';
import StoreListPage from '../screens/storeList/List';
import TotalStoreListPage from '../screens/storeList/TotalList';
import PaymentPage from '../screens/payment/Main';
import PartnerPage from '../screens/partner/Main';

const RootStack = createStackNavigator();

const AppNavigator = oProps => {
    return (
        <RootStack.Navigator
            initialRouteName={AppRoute.MAIN}
            screenOptions={{headerShown: false}}
        >
            <RootStack.Screen name={AppRoute.MAIN} options={EffectFadeIn}>
                {props => (
                    <InitialRoute {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.HOME} options={EffectFadeIn}>
                {props => (
                    <HomePage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.ENROLL} options={EffectFadeIn}>
                {props => (
                    <EnrollPage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.STORELIST} options={EffectFadeIn}>
                {props => (
                    <StoreListPage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.TOTALSTORELIST} options={EffectFadeIn}>
                {props => (
                    <TotalStoreListPage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.PAYMENT} options={EffectFadeIn}>
                {props => (
                    <PaymentPage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
            <RootStack.Screen name={AppRoute.PARTNER} options={EffectFadeIn}>
                {props => (
                    <PartnerPage {...oProps} initialProps={props} />
                )}
            </RootStack.Screen>
        </RootStack.Navigator>
    )
}

const mapStateToProps = state => {
    return {
        AppConfigReducer: state.AppConfigReducer,
        UserConfigReducer: state.UserConfigReducer,
        StoreConfigReducer: state.StoreConfigReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reduxSetAppConfigStatus: oData => dispatch(setAppConfigStatus(oData)),
        reduxSetStoreConfigStatus: oData => dispatch(setStoreConfig(oData)),
        reduxSetUserConfig: oData => dispatch(setUserConfig(oData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);