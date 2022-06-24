import * as actions from './actions';
import {
  BASE_URL,
  makeRequest,
  UPDATE_STUDENT_ATTENDANCE,
  GET_STUDENT_INFO,
  GET_STUDENT_FEES_DETAIL,
  GET_STUDENT_PAID_FEES_DETAIL,
} from 'api/ApiInfo';
import {Alert} from 'react-native';
import {getData, getActiveSchool} from 'api/UserPreference';
// admin attendance teacher / student
export const getTeacherAttendance = () => async dispatch => {
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
  const {empId: userId} = userInfo;

  // preparing params
  const params = {
    idsprimeID,
    userId,
  };

  // calling api
  const response = await makeRequest(
    BASE_URL + 'adminTeacherAttendnce',
    params,
  );
  //Alert.alert('', BASE_URL + 'adminTeacherAttendnce');
  return dispatch(actions.getTeacherAttendance(response));
};
export const getStudentAttendance = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'adminStudentAttendance',
      params,
    );
    //Alert.alert('', BASE_URL + 'adminStudentAttendance');
    return dispatch(actions.getStudentAttendance(response));
  } catch (error) {}
};
export const getStudentAttendanceList =
  (classId, sectionId) => async dispatch => {
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
    const {empId} = userInfo;

    // preparing params
    const params = {
      teacher_id: empId,
      class_id: classId,
      section_id: sectionId,
      idsprimeID,
    };

    // calling api
    // const response = await makeRequest(GET_STUDENT_ATTENDANCE_LIST, params);
    const response = await makeRequest(
      BASE_URL + 'adminAttendanceList',
      params,
    );
    //Alert.alert('', BASE_URL + 'adminAttendanceList');
    return dispatch(actions.getStudentAttendanceList(response));
  };
export const updateAdminStudentAttendance =
  (classId, sectionId, presentStudents, absentStudents) => async dispatch => {
    try {
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
      const {empId} = userInfo;

      // preparing params
      const params = {
        employee_id: empId,
        class_id: classId,
        section_id: sectionId,
        present_students: presentStudents,
        absent_students: absentStudents,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(UPDATE_STUDENT_ATTENDANCE, params);
      // Alert.alert('', UPDATE_STUDENT_ATTENDANCE);
      return dispatch(actions.updateAdminStudentAttendance(response));
    } catch (error) {}
  };
export const getAbsentStudentData = (classId, sectionId) => async dispatch => {
  try {
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
    const {empId} = userInfo;

    // preparing params
    const params = {
      teacherID: empId,
      classID: classId,
      sectionID: sectionId,
      idsprimeID,
    };
    // calling api
    const response = await makeRequest(
      BASE_URL + 'studentattendancedetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'studentattendancedetails');
    return dispatch(actions.getAbsentStudentData(response));
  } catch (error) {}
};
// admin feesCollection
export const getFeesCollection = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'adminFeesCollection',
      params,
    );
    //Alert.alert('', BASE_URL + 'adminFeesCollection');
    return dispatch(actions.getFeesCollection(response));
  } catch (error) {}
};
// admin Date Sheet
export const getAdminDateSheet = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'adminDatesheet', params);
    //Alert.alert('', BASE_URL + 'adminDatesheet');
    return dispatch(actions.getAdminDateSheet(response));
  } catch (error) {}
};
// library
export const getLibraryData = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'adminLibraryData', params);
    //Alert.alert('', BASE_URL + 'adminLibraryData');
    return dispatch(actions.getLibraryData(response));
  } catch (error) {}
};
// time_table
export const adminTeacherTimetableList = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'adminTeacherTimetableList',
      params,
    );
    //Alert.alert('', BASE_URL + 'adminTeacherTimetableList');
    return dispatch(actions.adminTeacherTimetableList(response));
  } catch (error) {}
};
export const adminClassTimetableList = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'adminClassTimetableList',
      params,
    );
    //Alert.alert('', BASE_URL + 'adminClassTimetableList');
    return dispatch(actions.adminClassTimetableList(response));
  } catch (error) {}
};
export const adminTimeTableDetails = info => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {userType} = info;

    // preparing params
    const params = {
      idsprimeID,
    };

    // preparing request endpoint
    let endpoint = null;

    if (userType === 'Teacher') {
      const {teacherId} = info;
      params.teacherId = teacherId;
      endpoint = 'teacherTimeTable';
    } else if (userType === 'ClassSection') {
      const {classId, sectionId} = info;
      params.classId = classId;
      params.sectionId = sectionId;
      endpoint = 'classTimeTable';
    }

    // calling api
    const response = await makeRequest(BASE_URL + endpoint, params);
    //Alert.alert('', BASE_URL + endpoint);
    return dispatch(actions.adminTimeTableDetails(response));
  } catch (error) {}
};
// Homewirk
export const adminGetHomework = () => async dispatch => {
  try {
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
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      id: userId,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'allfetchassignments',
      params,
    );
    //Alert.alert('', BASE_URL + 'allfetchassignments');
    return dispatch(actions.adminGetHomework(response));
  } catch (error) {}
};

// feedback
export const getFeedbackData = info => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      userId: userId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'viewFeedback', params);
    //Alert.alert('', BASE_URL + 'viewFeedback');
    return dispatch(actions.getFeedbackData(response));
  } catch (error) {}
};
export const feedbackCategory = info => async dispatch => {
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
    return dispatch(actions.feedbackCategory(response));
  } catch (error) {}
};
export const handleFeedback = params => async dispatch => {
  try {
    const response = await makeRequest(BASE_URL + 'feedback', params);
    //Alert.alert('', BASE_URL + 'feedback');
    return dispatch(actions.handleFeedback(response));
  } catch (error) {}
};
// school profile
export const getSchoolProfile = () => async dispatch => {
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
    const response = await makeRequest(
      BASE_URL + 'schooldetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'schooldetails');
    return dispatch(actions.getSchoolProfile(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};

// Photo Gallery
export const getPhotoGallery = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }
    // fetching empId from local storage
    const userInfo = await getData();
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
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'photoGallery',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'photoGallery');
    return dispatch(actions.getPhotoGallery(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};

// Teacher Details
export const getTeacherListData = () => async dispatch => {
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
    const response = await makeRequest(
      BASE_URL + 'teacherDetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'teacherDetails');
    return dispatch(actions.getTeacherListData(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
// StudentSummary
export const getClassSectionData = () => async dispatch => {
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
    const response = await makeRequest(
      BASE_URL + 'classsections',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'classsections');
    return dispatch(actions.getClassSectionData(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getClassWiseStudentData =
  (classID, sectionID) => async dispatch => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        classID,
        sectionID,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(
        BASE_URL + 'classsectionsWiseStudent',
        params,
        true,
        false,
      );
      //Alert.alert('', BASE_URL + 'classsectionsWiseStudent');
      return dispatch(actions.getClassWiseStudentData(response));
    } catch (error) {
      console.log('schoool profile error', error);
    }
  };
export const getSingleStudentProfileData = studentID => async dispatch => {
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
      id: studentID,
    };

    // calling api
    // const response = await makeRequest(
    //   BASE_URL + 'singleStudentDetails',
    //   params,
    //   true,
    //   false,
    // );
    const response = await makeRequest(GET_STUDENT_INFO, params);
    // Alert.alert('', GET_STUDENT_INFO);
    return dispatch(actions.getSingleStudentProfileData(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getStudentFeesData = studentID => async dispatch => {
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
      id: studentID,
    };

    // calling api
    // const response = await makeRequest(
    //   BASE_URL + 'singleStudentDetails',
    //   params,
    //   true,
    //   false,
    // );
    const response = await makeRequest(GET_STUDENT_FEES_DETAIL, params);
    // Alert.alert('', GET_STUDENT_FEES_DETAIL);
    return dispatch(actions.getStudentFeesData(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getStudentPaidFeesDetail = studentID => async dispatch => {
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
      id: studentID,
    };

    // calling api
    // const response = await makeRequest(
    //   BASE_URL + 'singleStudentDetails',
    //   params,
    //   true,
    //   false,
    // );
    const response = await makeRequest(GET_STUDENT_PAID_FEES_DETAIL, params);
    // Alert.alert('', GET_STUDENT_PAID_FEES_DETAIL);
    return dispatch(actions.getStudentPaidFeesDetail(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getStudentRemark = studentID => async dispatch => {
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
      studentID,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'reportStudentDetails',
      params,
      true,
      false,
    );
    // const response = await makeRequest(GET_STUDENT_PAID_FEES_DETAIL, params);
    //Alert.alert('', BASE_URL + 'reportStudentDetails');
    return dispatch(actions.getStudentRemark(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getStudentAttendanceReport = studentID => async dispatch => {
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
      studentID,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'attendanceStudentDetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'attendanceStudentDetails');

    return dispatch(actions.getStudentAttendanceReport(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};

// Lead Management
export const getAdminLeadManagement = () => async dispatch => {
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
    const response = await makeRequest(
      BASE_URL + 'leadManagment',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'leadManagment');
    return dispatch(actions.getAdminLeadManagement(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
//Prospectus and admissions
export const getAdminProspectus = admissionDate => async dispatch => {
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
      admissionDate,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'getprospectusDetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'getprospectusDetails');
    return dispatch(actions.getAdminProspectus(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};

export const getAdminAdmissionDetail = admissionDate => async dispatch => {
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
      admissionDate,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'getadmissionDetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'getadmissionDetails');
    return dispatch(actions.getAdminAdmissionDetail(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
export const getFollowUpDetail = id => async dispatch => {
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
      id,
    };

    // calling api
    const response = await makeRequest(
      BASE_URL + 'getfollowupDetails',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'getfollowupDetails');
    return dispatch(actions.getFollowUpDetail(response));
  } catch (error) {
    console.log('schoool profile error', error);
  }
};
