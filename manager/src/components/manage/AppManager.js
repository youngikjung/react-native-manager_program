import React, { useRef } from 'react';
import axios from 'axios';

import * as RootNavigation from '../../routes/RootNavigatorRef';
import {AppRoute} from '../../routes/AppRoutes';
import ReducerSetter from '../../components/manage/ReducerSetter';
import AppModal from './AppModal';

import CONSTANTS from '../../config/constants';

const AppManager = oProps => {
    let oSavedRouteParams = {};

    const oAppModal = useRef();
    const oReducerSetter = useRef();
  
    const fnNavGoTo = (sType, sUrl, oParams) => {
        oSavedRouteParams = oParams;
        if (oParams !== undefined && oParams.hasOwnProperty('oInitialProps')) {
            delete oParams['oInitialProps'];
        }

        if (RootNavigation !== undefined) {
            if (sType !== undefined && sType === 'reset') {
                RootNavigation.reset({
                    index: 0,
                    routes: [{name: sUrl, params: oParams}],
                });
            } else if (sType !== undefined && sType === 'push') {
                RootNavigation.push(sUrl, oParams);
            } else if (sType !== undefined && sType === 'drawer') {
                RootNavigation.navigate(AppRoute.DRAWERNAV, {
                    screen: sUrl,
                    params: oParams,
                });
            } else if (sType !== undefined && sType === 'mainnav') {
                RootNavigation.navigate(AppRoute.MAINNAV, {
                    screen: sUrl,
                    params: oParams,
                });
            } else if (sType !== undefined && sType === 'goback') {
                RootNavigation.doGoback(oParams);
            } else if (sUrl !== undefined) {
                RootNavigation.navigate(sUrl, oParams);
            }
        }
    };

    const fnHideModal = () => {
        if (oAppModal.current != undefined) {
            oAppModal.current._refHideModal();
        }
    }

    const fnShowModal = (bBoolean, ViewComponent, sTemplate, sTimeoutSec) => {
        if (oAppModal.current != undefined) {
            oAppModal.current._refShowModal(bBoolean, ViewComponent, sTemplate, sTimeoutSec);
        }
    }

    const fnAxios = async (sUrl, sMethod, sHeader, oData, oPath) => {
        let sGetApiUrl = CONSTANTS.API_URL;
        let sConnectUrl = sUrl;

        if(oPath !== undefined && oPath !== null && oPath !== ""){
            sGetApiUrl = CONSTANTS.API_POS_URL;
        }

        if (sConnectUrl.indexOf('http') == -1) {
            sConnectUrl = sGetApiUrl + sConnectUrl;
        }
        let oUserConfig = oReducerSetter.current._refGetUserConfig();
        let oDefHeader = {
            'Content-Type': 'application/json',
        };
        if (sHeader !== undefined && sHeader !== null && typeof sHeader === 'string') {
            if (sHeader === 'login') {
                if(sMethod === "post"){
                    oDefHeader = {
                        Authorization: oUserConfig.STORETOKEN,
                        'Content-Type': 'application/json',
                        'refresh-token': oUserConfig.STOREREFRESHTOKEN,
                    };
                } else {
                    oDefHeader = {
                        Authorization: oUserConfig.STORETOKEN,
                        'Content-Type': 'text/plain',
                        'refresh-token': oUserConfig.STOREREFRESHTOKEN,
                    };
                }
            } else if (sHeader == 'multipart') {
                oDefHeader = {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                };
            } else if (sHeader === 'text') {
                oDefHeader = {
                    'Content-Type': 'text/plain',
                };
            }
        }
        try {
            const oResponse = await axios({
                url: sConnectUrl,
                method: sMethod,
                timeout: 15 * 1000,
                headers: oDefHeader,
                data: oData,
                transformResponse: [
                    data => {
                        return data;
                    },
                ],
            });
            if (oResponse !== undefined && oResponse.name !== undefined && oResponse.name.toLowerCase() === 'error') {
                if (oResponse.message !== undefined && oResponse.message.toLowerCase().indexOf('401') !== -1) {}
            }
            if (oResponse.headers !== undefined && oResponse.headers['refreshed-token'] !== undefined) {}
            if (oResponse !== undefined && oResponse.data !== undefined) {
                return JSON.parse(oResponse.data);
            } else {
                return false;
            }
        } catch (err) {
            if (err.message.toLowerCase().indexOf('401') !== -1) {}
        }
    };

    const fnSetReduxUserConfig = oUserConfigData => {
        if (oReducerSetter.current !== undefined) {
            oReducerSetter.current._refSetUserConfig(oUserConfigData);
        }
        return false;
    };

    const fnGetReduxUserConfig = () => {
        if (oReducerSetter.current !== undefined) {
            return oReducerSetter.current._refGetUserConfig();
        }
        return false;
    };

    const fnSetReduxStoreConfig = oStoreConfigData => {
        if (oReducerSetter.current !== undefined) {
            oReducerSetter.current._refSetStoreConfig(oStoreConfigData);
        }
        return false;
    };

    const fnGetReduxStoreConfig = () => {
        if (oReducerSetter.current !== undefined) {
            return oReducerSetter.current._refGetStoreConfig();
        }
        return false;
    };

    const fnGetReduxUserBasket = () => {
        if (oReducerSetter.current !== undefined) {
            return oReducerSetter.current._refGetUserBasket();
        }
        return false;
    };

    const fnSetReduxUserBasket = oUserBasketData => {
        oReducerSetter.current._refSetUserBasket(oUserBasketData);
    };

    const fnLogOut = async () => {
        let oResult = false;

        try {
            let oUserConfig = {};
            oUserConfig['INITITALPAGE'] = true;
            oUserConfig['ACTIVATE'] = false;
            oUserConfig['AUTOLOGIN'] = false;
            oUserConfig['LOGINID'] = "";
            oUserConfig['LOGINPW'] = "";
            oUserConfig['USERPUSHTOKEN'] = "";
            oUserConfig['APPPUSHSTATUS'] = false;

            oUserConfig['SALESGROUPID'] = 0;
            oUserConfig['SALESID'] = 0;
            oUserConfig['SALESUSERNAME'] = "";
            oUserConfig['SALESUSERPHONE'] = "";
            oUserConfig['SALESUSERCOMPANY'] = "";

            await oReducerSetter.current._refSetUserConfig(oUserConfig);
            oResult = true;

        } catch (error) {
            console.log("error",error);
        }

        return oResult;
    }

    const oThisManager = {
        accessAxios: fnAxios,

        navGoTo: fnNavGoTo,

        showModal: fnShowModal,
        hideModal: fnHideModal,

        setLogOut: fnLogOut,

        setReduxUserConfig: fnSetReduxUserConfig,
        getReduxUserConfig: fnGetReduxUserConfig,
        setReduxStoreConfig: fnSetReduxStoreConfig,
        getReduxStoreConfig: fnGetReduxStoreConfig,
        getReduxUserBasket: fnGetReduxUserBasket,
        setReduxUserBasket: fnSetReduxUserBasket,
    };

    return (
        <>
            {React.cloneElement(oProps.children, {appManager: oThisManager})}
            <ReducerSetter {...oProps} ref={oReducerSetter} />
            <AppModal {...oProps} ref={oAppModal} />
        </>
    )
}

export default AppManager;
