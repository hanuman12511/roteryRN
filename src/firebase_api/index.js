// API
import messaging from '@react-native-firebase/messaging';

import {UPLOAD_TOKEN, makeRequest} from '../api/ApiInfo';
import {getData, getActiveSchool} from '../api/UserPreference';

//to Display Notification
import notifee, {AndroidStyle} from '@notifee/react-native';
// import app_icon_android from 'assets/app_icon/android/app_icon_android.png';
// References
export let isAppOpenedByRemoteNotificationWhenAppClosed = false;

export const checkPermission = async () => {
  try {
    const enabled = await messaging().hasPermission();

    if (enabled) {
      // fetching fcm token
      await getToken();
    } else {
      await requestPermission();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const requestPermission = async () => {
  try {
    // requesting permission
    await messaging().requestPermission();
    // fetching fcm token
    await getToken();
  } catch (error) {
    // User has rejected permission
    console.log('User has rejected permission:', error.message);
  }
};

const getToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // calling api to upload token

      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {roleId} = userInfo;

      // preparing userId
      let userId = null;

      if (roleId === 'TEACHER') {
        userId = userInfo.empId;
      } else if (roleId === 'STUDENT') {
        const {userdetail: students} = activeSchool;
        const studentIds = students.map(student => student.id);
        userId = studentIds.join();
      } else {
        userId = userInfo.empId;
      }

      // preparing params
      const params = {
        idsprimeID,
        userId,
        roleId,
        token: fcmToken,
      };
      // console.log('Upload Token data', params);
      // calling api
      const response = await makeRequest(UPLOAD_TOKEN, params, true, true);
      console.log('Upload Token', response);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Token Listeners
const onTokenRefreshCallback = async fcmToken => {
  try {
    if (fcmToken) {
      // calling api to upload token

      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {roleId} = userInfo;

      // preparing userId
      let userId = null;

      if (roleId === 'TEACHER') {
        userId = userInfo.empId;
      } else if (roleId === 'STUDENT') {
        const {userdetail: students} = activeSchool;
        const studentIds = students.map(student => student.id);
        userId = studentIds.join();
      } else {
        userId = userInfo.empId;
      }

      // preparing params
      const params = {
        idsprimeID,
        userId,
        roleId,
        token: fcmToken,
      };
      // calling api
      const response = await makeRequest(UPLOAD_TOKEN, params, true, true);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createOnTokenRefreshListener = thisArg => {
  thisArg.onTokenRefreshListener = messaging().onTokenRefresh(
    onTokenRefreshCallback,
  );
};

export const removeOnTokenRefreshListener = thisArg => {
  // thisArg.onTokenRefreshListener();
};

// Notification Listeners
export const createNotificationListeners = async thisArg => {
  // Triggered when a particular notification has been received in foreground
  async function onDisplayNotification(onNotification) {
    const {notification} = onNotification;
    const notifi = notification;
    console.log(
      'notification',
      notifi.android,
      'Data with title',
      notifi.body,
      notifi.title,
    );
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'idsprime',
      name: 'idsprime',
    });
    // Display a notification
    await notifee.displayNotification({
      title: notifi.title,
      body: notifi.body,
      android: {
        channelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: notifi.android.imageUrl,
        },
        // optional, defaults to 'ic_launcher'.
      },
    });
  }
  messaging().onMessage(notification => {
    onDisplayNotification(notification);
    console.log(notification);
  });
};

export const removeNotificationListeners = thisArg => {
  // Remove listeners allocated in createNotificationListeners()
  createNotificationListeners();
};

export const resetIsAppOpenedByRemoteNotificationWhenAppClosed = () => {
  isAppOpenedByRemoteNotificationWhenAppClosed = false;
};
