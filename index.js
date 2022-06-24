/**
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/idsStore/store';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Remote  message when app is in background', remoteMessage);
});

messaging().setOpenSettingsForNotificationsHandler(remoteMessage => {
  console.log('Remote  message when app is in background', remoteMessage);
});

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage,
  );
});

// Check whether an initial notification is available
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage,
      );
      // e.g. "Settings"
    }
  });

// config
const {store, persister} = configureStore();
const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
