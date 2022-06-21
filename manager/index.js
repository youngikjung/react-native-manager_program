import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import SystemSetting from 'react-native-system-setting';

if(Platform.OS !== "ios"){
    PushNotification.createChannel(
        {
            channelId: "notice", // (required)
            channelName: "스루 영업팀 알림", // (required)
            channelDescription: "스루 영업팀 알림", // (optional) default: undefined.
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            vibration: 1200
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}


// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    SystemSetting.setVolume(1, { type: 'notice', playSound: false, showUI: false });
});
 
AppRegistry.registerComponent(appName, () => App);
