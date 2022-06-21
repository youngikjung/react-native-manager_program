export const Types = {
    SETTOKEN: 'user/SETTOKEN',
    SETLOGGEDINSTATUS: 'user/SETLOGGEDINSTATUS',
    SETUSERCONFIG: 'user/SETUSERCONFIG',
};

const initialState = {
    INITITALPAGE: true,
    ACTIVATE: 0, 
    AUTOLOGIN: false, 
    LOGINID: "",
    LOGINPW: "",
    USERPUSHTOKEN: "",
    APPPUSHSTATUS: false,

    SALESGROUPID: 0,
    SALESGROUPMASTER: false,
    SALESID: 0,
    SALESUSERNAME: "",
    SALESUSERPHONE: "",
    SALESUSERCOMPANY: "",
}

export function setUserToken(oResult) {
    return {
        type: Types.SETTOKEN,
        payload: {
            result: oResult,
        },
    };
}

export function setUserConfig(oResult) {
    return {
        type: Types.SETUSERCONFIG,
        payload: {
            result: oResult,
        },
    };
}

const UserConfigReducer = (state = initialState, action) => {
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
export default UserConfigReducer;