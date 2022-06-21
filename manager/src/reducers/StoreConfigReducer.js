export const Types = {
    SETTOKEN: 'store/SETTOKEN',
    SETLOGGEDINSTATUS: 'store/SETLOGGEDINSTATUS',
    SETUSERCONFIG: 'store/SETUSERCONFIG',
};

const initialState = {
    LOGINID: "",
    LOGINPW: "",
    TOKEN: "",
    REFRESHTOKEN: "",

    STOREID: 0,
    BUSINESSTYPE: "",
    STORENAME: "",
    STOREOWNER: ""
}

export function setStoreToken(oResult) {
    return {
        type: Types.SETTOKEN,
        payload: {
            result: oResult,
        },
    };
}

export function setStoreConfig(oResult) {
    return {
        type: Types.SETUSERCONFIG,
        payload: {
            result: oResult,
        },
    };
}

const StoreConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SETLOGGEDINSTATUS: {
            let oMerged = {...state, ...action.payload.result};
            return oMerged;
        }
        case Types.SETUSERCONFIG: {
            let oMerged = {...state, ...action.payload.result};
            return oMerged;
        }
        default: {
            return state;
        }
    }
};

// Exports
export default StoreConfigReducer;