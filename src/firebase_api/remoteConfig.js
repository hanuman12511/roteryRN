import remoteConfig from '@react-native-firebase/remote-config';
import {
  bannerSlider,
  storeTilesData,
  storeFaqData,
  storeDGMessageData,
} from 'api/UserPreference';
export const getRemoteConfig = async () => {
  try {
    // console.log('data RC 1');
    await remoteConfig().setDefaults({
      banners: 'https://www.daac.in/api/mobile/',
    });
    // console.log('data RC 2');

    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: __DEV__,
    });
    // console.log('data RC 3');
    await remoteConfig().fetch(10);
    // console.log('data RC 4');
    const activated = await remoteConfig().activate();
    // const activated = await remoteConfig().fetchAndActivate();
    console.log('data RC 5', activated);
    if (activated) {
      // console.log('data activated');
      let confVal = await remoteConfig().getAll();
      console.log('getData', confVal);

      // initilize the data into sets
      let tiles = confVal?.tileManager?._value;
      let banners = confVal?.banners?._value;
      let faq = confVal?.faq?._value;
      let dgData = confVal?.dg_message?._value;
      //  parse the data and passes into the object form

      let tiles_Data = JSON.parse(tiles);
      let tiles_data = Object.values(tiles_Data);

      let faq_Data = JSON.parse(faq);
      let faq_data = Object.values(faq_Data);

      let dg_message = JSON.parse(dgData);
      let dg_message_data = Object.values(dg_message);

      await bannerSlider(banners);
      await storeTilesData(tiles_data);
      await storeFaqData(faq_data);
      await storeDGMessageData(dg_message_data);
    }
  } catch (err) {}
};
