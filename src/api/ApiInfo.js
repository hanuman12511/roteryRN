//axios for api calling
import axios from 'axios';
// Utility
import {encryptData} from './EncryptionUtility';

// User Preference
import {getData} from './UserPreference';

// Base URL
export const BASE_URL = 'https://www.idsprime.com/api/IIMobilelatest/';

/* --------------- API URL ----------------- */
// Common APIs
export const USER_LOGIN = BASE_URL + 'userLogin';
export const SLIDER = BASE_URL + 'slider';
export const UPLOAD_TOKEN = BASE_URL + 'uploadToken';

// Student
export const GET_STUDENT_INFO = BASE_URL + 'getStudentInfo';
export const FETCH_STUDENT_ASSIGNMENTS = BASE_URL + 'fetchassignmentsstudents';
export const GET_STUDENT_ATTENDANCE_DETAIL = BASE_URL + 'studentAttendance';
export const GET_STUDENT_TIME_TABLE = BASE_URL + 'classTimeTable';
export const GET_STUDENT_FEES_DETAIL = BASE_URL + 'singleStudentFees';
export const GET_STUDENT_PAID_FEES_DETAIL = BASE_URL + 'receipt';
export const GET_CALENDAR_EVENT_TYPE = BASE_URL + 'eventtype';
export const GET_CALENDAR_EVENTS = BASE_URL + 'viewevents';
export const GET_NOTICE_BOARD_NEWS = BASE_URL + 'news';
export const GET_DATE_SHEET = BASE_URL + 'datesheet';
export const GET_RESULT = BASE_URL + 'resultsearch';
export const GET_ISSUED_BOOKS = BASE_URL + 'library';
export const STUDENT_FORGOT_PASSWORD = BASE_URL + 'forgot';
export const STUDENT_CHANGE_PASSWORD = BASE_URL + 'changepassword';
export const UPDATE_EMAIL = BASE_URL + 'updateEmail';

// Teacher
export const GET_TEACHER_INFO = BASE_URL + 'getTeacherInfo';
export const FETCH_TEACHER_ASSIGNMENTS = BASE_URL + 'fetchassignment';
export const GET_TEACHER_CLASS_DETAILS = BASE_URL + 'classassign';
export const GET_SUBJECT_DETAILS = BASE_URL + 'fetchSubjectAssign';
export const DELETE_ASSIGNMENT = BASE_URL + 'assignmentdelete';
export const GET_SECTION_DETAILS = BASE_URL + 'fetchClassection';
export const GET_TEACHER_CLASS_LIST = BASE_URL + 'getTeacherClassDetail';
export const ASSIGN_ASSIGNMENT = BASE_URL + 'assigntoanother';
export const GET_STUDENT_ATTENDANCE_PANEL = BASE_URL + 'teacherAttendnce';
export const GET_STUDENT_ATTENDANCE_LIST = BASE_URL + 'studentAttendanceList';
export const UPDATE_STUDENT_ATTENDANCE = BASE_URL + 'updateStudentAttendance';
export const GET_TEACHER_TIME_TABLE = BASE_URL + 'teacherTimeTable';
export const TEACHER_FORGOT_PASSWORD = BASE_URL + 'teacherForgotPassword';
export const TEACHER_CHANGE_PASSWORD = BASE_URL + 'teacherChangePassword';
export const GET_TEACHER_ISSUED_BOOKS = BASE_URL + 'teacherLibraryView';
export const GET_TEACHER_DATE_SHEET = BASE_URL + 'teacher_datesheet';
export const UPDATE_PROFILE_IMAGE = BASE_URL + 'teacheruploadimage';
export const UPDATE_TEACHER_EMAIL = BASE_URL + 'staffupdateEmail';
const AXIOS = axios.create({
  baseURL: BASE_URL,
  headers: {
    // add common headers here
    'content-type': 'multipart/form-data',
  },
});

// Methods
export const makeRequest = async (
  url,
  params = null,
  sendAuthorizationToken = true,
  isContentTypeJSON = true,
) => {
  try {
    // request info
    let info = {};
    info.url = url;
    if (params) {
      // request method
      info.method = 'POST';

      if (sendAuthorizationToken) {
        // fetching userInfo
        const userInfo = await getData();

        if (!userInfo) {
          // console.log('Unable to fetch user info');
          return null;
        }

        const {authToken} = userInfo;
        // console.log('Request authToken:', authToken);
        info.headers = {
          Authorization: 'Bearer ' + authToken,
        };
      }

      // request body
      console.log('Request params:', params);
      if (isContentTypeJSON) {
        // request headers
        info.headers = {
          ...info.headers,
          'Content-Type': 'application/json',
        };

        const data = JSON.stringify(params);
        const payload = await encryptData(data);
        const requestBody = {payload};
        info.data = JSON.stringify(requestBody);
      } else {
        // preparing multipart/form-data
        const formData = new FormData();
        for (const key in params) {
          formData.append(key, params[key]);
        }
        info.data = formData;
      }
    } else {
      if (sendAuthorizationToken) {
        // fetching userInfo
        const userInfo = await getData();
        if (!userInfo) {
          // console.log('Unable to fetch user info');
          return null;
        }

        const {authToken} = userInfo;

        info.headers = {
          Authorization: 'Bearer ' + authToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        };
      } else {
        // headers to prevent cache in GET request
        info.headers = {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
        };
      }
    }

    // console.log('Request URL:', url);
    console.log('Request Info:', info);
    const response = await AXIOS.request(info);

    // const response = await fetch(url, info);
    // console.log('Request Response:', response);

    const result = response.data;
    console.log('Request Result:', result);

    return result;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
