import AsyncStorage from '@react-native-community/async-storage';
import {encryptData, decryptData} from './EncryptionUtility';

// User Preferences Keys
const KEYS = {
  USER_INFO: 'userInfo',
  ACTIVE_STUDENT: 'activeStudent',
  ACTIVE_SCHOOL: 'activeSchool',
  DESIGNATION: 'designation',
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
