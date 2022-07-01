import AsyncStorage from '@react-native-async-storage/async-storage';
import {encryptData, decryptData} from './EncryptionUtility';

// User Preferences Keys
const KEYS = {
  USER_INFO: 'userInfo',
  ACTIVE_STUDENT: 'activeStudent',
  ACTIVE_SCHOOL: 'activeSchool',
  DESIGNATION: 'designation',
  BANNER_SLIDER: 'banners',
  TILES_DATA: 'tiles_data',
  FAQ: 'faq_data',
};

export const storeData = async data => {
  try {
    const info = JSON.stringify(data);
    const encryptedInfo = await encryptData(info);
    await AsyncStorage.setItem(KEYS.USER_INFO, encryptedInfo);
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to store data!\nError: ', errMessage);
  }
};

// Banner
export const bannerSlider = async data => {
  try {
    const info = JSON.stringify(data);
    await AsyncStorage.setItem(KEYS.BANNER_SLIDER, info);
  } catch (error) {
    console.log('Faild to store data for banner sliders', error);
  }
};

export const getBannerSlider = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.BANNER_SLIDER);
    if (!rawData) {
      return null;
    }
    const info = JSON.parse(rawData);
    return info;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// tiles
export const storeTilesData = async data => {
  try {
    const info = JSON.stringify(data);
    await AsyncStorage.setItem(KEYS.TILES_DATA, info);
  } catch (error) {
    console.log('Faild to store data for Tiles', error);
  }
};

export const getTilesData = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.TILES_DATA);
    if (!rawData) {
      return null;
    }
    const info = JSON.parse(rawData);
    return info;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
// faq data
export const storeFaqData = async data => {
  try {
    const info = JSON.stringify(data);
    await AsyncStorage.setItem(KEYS.FAQ, info);
  } catch (error) {
    console.log('Faild to store data for Tiles', error);
  }
};

export const getFaqData = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.FAQ);
    if (!rawData) {
      return null;
    }
    const info = JSON.parse(rawData);
    return info;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const teacherDesignation = async data => {
  try {
    const info = data;

    await AsyncStorage.setItem(KEYS.DESIGNATION, info);
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to store data!\nError: ', errMessage);
  }
};
export const getTeacherDesignation = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.DESIGNATION);
    if (!rawData) {
      return null;
    }
    return rawData;
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to store data!\nError: ', errMessage);
  }
};

export const getData = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.USER_INFO);
    if (!rawData) {
      return null;
    }

    const decryptedInfo = await decryptData(rawData);
    const userInfo = JSON.parse(decryptedInfo);
    return userInfo;
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to retrieve data!\nError: ', errMessage);
    return null;
  }
};

export const getRoleId = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.USER_INFO);
    if (!rawData) {
      return null;
    }

    const decryptedInfo = await decryptData(rawData);
    const userInfo = JSON.parse(decryptedInfo);
    const roleId = userInfo ? userInfo.roleId : null;

    return roleId;
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to retrieve data!\nError: ', errMessage);
    return null;
  }
};

export const setActiveStudent = async data => {
  try {
    const info = JSON.stringify(data);
    const encryptedInfo = await encryptData(info);
    await AsyncStorage.setItem(KEYS.ACTIVE_STUDENT, encryptedInfo);
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to store data!\nError: ', errMessage);
  }
};

export const getActiveStudent = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.ACTIVE_STUDENT);
    if (!rawData) {
      return null;
    }

    const decryptedInfo = await decryptData(rawData);
    const info = JSON.parse(decryptedInfo);
    return info ? info.id : null;
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to retrieve data!\nError: ', errMessage);
    return null;
  }
};

export const setActiveSchool = async data => {
  try {
    const info = JSON.stringify(data);
    const encryptedInfo = await encryptData(info);
    await AsyncStorage.setItem(KEYS.ACTIVE_SCHOOL, encryptedInfo);
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to store data!\nError: ', errMessage);
  }
};

export const getActiveSchool = async () => {
  try {
    const rawData = await AsyncStorage.getItem(KEYS.ACTIVE_SCHOOL);
    if (!rawData) {
      return null;
    }

    const decryptedInfo = await decryptData(rawData);
    const info = JSON.parse(decryptedInfo);
    return info;
  } catch (error) {
    const errMessage = error.message;
    console.log('Failed to retrieve data!\nError: ', errMessage);
    return null;
  }
};

export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    const errMessage = error.message;
    console.log(errMessage);
  }
};
