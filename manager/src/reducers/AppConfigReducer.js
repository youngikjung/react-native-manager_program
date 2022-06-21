/* eslint-disable prettier/prettier */

export const Types = {
   SETAPPCONFIG: "app/SETAPPCONFIG"
};

// Initial State
const INITIAL_STATE = {
   PermissionRequest: false,
   PermissionInternet: '',
   PermissionCamera: '',
   PermissionVibrate: '',
   PermissionBluetooth: '',
   PermissionReadStorage: '',
};

export function setAppConfigStatus(oResult) {
   return {
      type: Types.SETAPPCONFIG,
      payload: {
         result: oResult
      }
   };
}

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case Types.SETAPPCONFIG: {
         let oMerged = { ...state, ...action.payload.result };
         return oMerged;
      }
      default: return state;
   }
}
