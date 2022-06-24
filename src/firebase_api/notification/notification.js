import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotificationHandler from './notificationHandler';

export default class notification {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);
    if (Platform.OS === 'android') {
      // Clear badge number at start
      PushNotification.getApplicationIconBadgeNumber(function (number) {
        if (number > 0) {
          PushNotification.setApplicationIconBadgeNumber(0);
        }
      });

      PushNotification.getChannels(function (channels) {
        // console.log(channels);
      });
    } else {
      // Clear badge number at start
      PushNotificationIOS.getApplicationIconBadgeNumber(function (number) {
        if (number > 0) {
          PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }
      });
    }
  }

  createDefaultChannels() {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'idsprime', // (required)
          channelName: `idsprime`, // (required)
          channelDescription: 'A default idsprime', // (optional) default: undefined.
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        created =>
          console.log(
            `createChannel 'default-channel-id' returned '${created}'`,
          ), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  }

  createOrUpdateChannel() {
    if (Platform.OS === 'android') {
      this.lastChannelCounter++;
      PushNotification.createChannel(
        {
          channelId: 'idsprime',
          channelName: `idsprime - Counter: ${this.lastChannelCounter}`,
          channelDescription: `A idsprime to categorise your custom notifications. Updated at: ${Date.now()}`,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  }

  popInitialNotification() {
    if (Platform.OS === 'android') {
      PushNotification.popInitialNotification(notification =>
        console.log('InitialNotication:', notification),
      );
    } else {
      PushNotificationIOS.popInitialNotification(notification =>
        console.log('InitialNotication:', notification),
      );
    }
  }

  checkPermission(cbk) {
    if (Platform.OS === 'android') {
      return PushNotification.checkPermissions(cbk);
    } else {
      return PushNotificationIOS.checkPermissions(cbk);
    }
  }

  requestPermissions() {
    if (Platform.OS === 'android') {
      return PushNotification.requestPermissions();
    } else {
      return PushNotificationIOS.requestPermissions();
    }
  }
  abandonPermissions() {
    if (Platform.OS === 'android') {
      PushNotification.abandonPermissions();
    } else {
      PushNotificationIOS.abandonPermissions();
    }
  }

  getDeliveredNotifications(callback) {
    if (Platform.OS === 'android') {
      PushNotification.getDeliveredNotifications(callback);
    } else {
      PushNotificationIOS.getDeliveredNotifications(callback);
    }
  }
}
