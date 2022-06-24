import * as actions from './actions';
import {
  BASE_URL,
  GET_STUDENT_INFO,
  GET_STUDENT_ATTENDANCE_DETAIL,
  GET_STUDENT_FEES_DETAIL,
  GET_STUDENT_TIME_TABLE,
  GET_TEACHER_TIME_TABLE,
  FETCH_STUDENT_ASSIGNMENTS,
  GET_RESULT,
  GET_ISSUED_BOOKS,
  GET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENT_TYPE,
  GET_DATE_SHEET,
  makeRequest,
} from 'api/ApiInfo';
import {Alert} from 'react-native';
import {getData, getActiveSchool, getActiveStudent} from 'api/UserPreference';
// STUDENT_INFO
export const getStudentInfo = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {userdetail: students, idsprimeID} = activeSchool;

    // processing for students id
    let studentIds = students.map(student => student.id);
    studentIds = studentIds.join();

    // preparing params
    const params = {
      id: studentIds,
      idsprimeID,
    };
    // calling api
    const response = await makeRequest(GET_STUDENT_INFO, params);
    // Alert.alert('', GET_STUDENT_INFO);
    // processing response
    return dispatch(actions.getStudentInfo(response));
  } catch (error) {
    console.log(error.message);
  }
};
// ATTENDANCE_DETAILS
export const getAttendanceDetail = yearMonth => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    if (!activeStudentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      studentId: activeStudentId,
      date: yearMonth,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_STUDENT_ATTENDANCE_DETAIL, params);
    // Alert.alert('', GET_STUDENT_ATTENDANCE_DETAIL);
    // processing response
    return dispatch(actions.getAttendanceDetail(response));
  } catch (error) {
    console.log(error.message);
  }
};
// VIEW_FEEDBACK
export const viewFeedback = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();

    if (activeStudentId) {
      var {idsprimeID} = activeSchool;
    }
    // preparing params
    const params = {
      userId: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'viewFeedback', params);
    //Alert.alert('', BASE_URL + 'viewFeedback');
    // processing response
    return dispatch(actions.viewFeedback(response));
  } catch (error) {
    console.log(error.message);
  }
};
// TIMETABLE
export const getTimeTable = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching userInfo from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Fetching roleId
    const {roleId} = userInfo;

    // Preparing URL
    let apiURL = null;

    // preparing params
    const params = {
      idsprimeID,
    };

    if (roleId === 'STUDENT') {
      // URL
      apiURL = GET_STUDENT_TIME_TABLE;

      // Fetching active student id
      const activeStudentId = await getActiveStudent();
      if (!activeStudentId) {
        return;
      }
      params.id = activeStudentId;
    } else if (roleId === 'TEACHER') {
      // URL
      apiURL = GET_TEACHER_TIME_TABLE;

      // Fetching teacher id
      const teacherId = userInfo.empId;
      params.teacherId = teacherId;
    }

    // calling api
    const response = await makeRequest(apiURL, params);
    // Alert.alert('', apiURL);
    // processing response
    return dispatch(actions.getTimeTable(response));
  } catch (error) {
    console.log(error.message);
  }
};
// FEEDBACK
export const viewFeedbackCategories = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'feedbackcategories', params);
    //Alert.alert('', BASE_URL + 'feedbackcategories');
    return dispatch(actions.viewFeedbackCategories(response));
  } catch (error) {}
};
export const submitFeedback = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'feedback', params);
    //Alert.alert('', BASE_URL + 'feedback');
    return dispatch(actions.submitFeedback(response));
  } catch (error) {}
};
// FEE
export const studentFeeDetail = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    if (!activeStudentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      id: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_STUDENT_FEES_DETAIL, params);
    // Alert.alert('', GET_STUDENT_FEES_DETAIL);
    return dispatch(actions.studentFeeDetail(response));
  } catch (error) {}
};
// ASSIGNMENT
export const getStudentAssignment = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching active studentId from local storage
    const studentId = await getActiveStudent();
    if (!studentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      id: studentId,
      idsprimeID: idsprimeID,
    };

    // calling api
    const response = await makeRequest(FETCH_STUDENT_ASSIGNMENTS, params);
    // Alert.alert('', FETCH_STUDENT_ASSIGNMENTS);
    return dispatch(actions.getStudentAssignment(response));
  } catch (error) {}
};
// RESULT
export const getResult = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    if (!activeStudentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      id: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_RESULT, params);
    // Alert.alert('', GET_RESULT);
    return dispatch(actions.getResult(response));
  } catch (error) {}
};
// Library
export const getIssuedBook = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    var {idsprimeID} = activeSchool;
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }
    const {empId} = userInfo;
    var id = '';
    var login_type = '';
    // console.log('0', empId, activeStudentId);
    if (activeStudentId != null) {
      id = activeStudentId;
      // console.log('1', id);
      login_type = 'Student';
    } else {
      login_type = 'Staff';
      id = empId;
      // console.log('2', id);
    }

    // Preparing params
    const params = {
      login_type,
      id,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_ISSUED_BOOKS, params);
    // Alert.alert('', GET_ISSUED_BOOKS);
    return dispatch(actions.getIssuedBook(response));
  } catch (error) {}
};
export const getRequestBookList = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    var {idsprimeID} = activeSchool;
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }
    const {empId} = userInfo;
    var id = '';
    console.log('0', empId, activeStudentId);
    if (activeStudentId != null) {
      id = activeStudentId;
      console.log('1', id);
    } else {
      id = empId;
      console.log('2', id);
    }
    // preparing params
    const params = {
      userId: id,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'bookRequestList', params);
    //Alert.alert('', BASE_URL + 'bookRequestList');
    return dispatch(actions.getRequestBookList(response));
  } catch (error) {}
};
export const cancelRequestBookList = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'cancelBookRequest', params);
    //Alert.alert('', BASE_URL + 'cancelBookRequest');
    return dispatch(actions.cancelRequestBookList(response));
  } catch (error) {}
};
export const getBookCategories = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'booksCategories', params);
    //Alert.alert('', BASE_URL + 'booksCategories');
    return dispatch(actions.getBookCategories(response));
  } catch (error) {}
};
export const getBookInLibrary = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'bookSearch', params);
    //Alert.alert('', BASE_URL + 'bookSearch');
    return dispatch(actions.getBookInLibrary(response));
  } catch (error) {}
};
export const requestBookLibrary = bookId => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    var {idsprimeID} = activeSchool;
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }
    const {empId} = userInfo;
    var id = '';
    console.log('0', empId, activeStudentId);
    if (activeStudentId != null) {
      id = activeStudentId;
      console.log('1', id);
    } else {
      id = empId;
      console.log('2', id);
    }
    // preparing params
    const params = {
      userId: id,
      bookId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'bookRequest', params);
    //Alert.alert('', BASE_URL + 'bookRequest');
    return dispatch(actions.requestBookLibrary(response));
  } catch (error) {}
};

// CALENDER
export const getCalendarEvents = mothYear => async dispatch => {
  // fetching active school from local storage
  const activeSchool = await getActiveSchool();
  if (!activeSchool) {
    return;
  }

  const {idsprimeID} = activeSchool;

  // preparing params
  const params = {
    date: mothYear,
    idsprimeID,
  };

  // calling api
  const response = await makeRequest(GET_CALENDAR_EVENTS, params);
  // Alert.alert('', GET_CALENDAR_EVENTS);
  return dispatch(actions.getCalendarEvents(response));
};
export const getCalendarEventType = () => async dispatch => {
  // fetching active school from local storage
  const activeSchool = await getActiveSchool();
  if (!activeSchool) {
    return;
  }

  const {idsprimeID} = activeSchool;

  // preparing params
  const params = {
    idsprimeID,
  };

  // calling api
  const response = await makeRequest(GET_CALENDAR_EVENT_TYPE, params);
  // Alert.alert('', GET_CALENDAR_EVENT_TYPE);
  return dispatch(actions.getCalendarEventType(response));
};
// Date_Sheet
export const getDateSheet = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    if (!activeStudentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      id: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_DATE_SHEET, params);
    // Alert.alert('', GET_DATE_SHEET);
    return dispatch(actions.getDateSheet(response));
  } catch (err) {}
};
// gate_pass
export const getGatePass = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();

    if (activeStudentId) {
      var {idsprimeID} = activeSchool;
    }

    // preparing params
    const params = {
      userId: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'viewGatePass', params);
    //Alert.alert('', BASE_URL + 'viewGatePass');
    return dispatch(actions.getGatePass(response));
  } catch (error) {}
};
