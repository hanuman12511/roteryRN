import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from './DetailListComponent';
import showToast from './CustomToast';

// Icons
import ic_assignment_delete_green from 'assets/icons/ic_assignment_delete_green.png';
import ic_assignment_download_green from 'assets/icons/ic_assignment_download_green.png';

// API

import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

const AssignmentItem = props => {
  // useEffect(() => {

  // }, [props]);
  const handleAssignmentDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this assignment?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: handleAlertOkClick},
      ],
      {cancelable: false},
    );
  };

  const handleAlertOkClick = async () => {
    try {
      const assignmentId = props.item.id;
      await props.deleteAssignment(assignmentId).then(async () => {
        const response = await props.isDeleteAssignment;

        showToast('Assignment has been successfully deleted!');

        props.refreshAssignmentsCallback(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;

      Linking.openURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAssignmentAssign = () => {
    // const {id: assignmentId} = props.item;
    const {item: assignmentId} = props;
    props.showAssignModal(assignmentId);
  };

  return (
    <View style={styles.assignmentInfoList}>
      <DetailListComponent
        titleArr={props.titleArr}
        infoArr={props.item.info}
        skipContainerStyle
      />

      <View style={styles.singleAssignmentButton}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={handleAssignmentDelete}>
          <Image
            source={ic_assignment_delete_green}
            resizeMode="cover"
            style={styles.assignmentIcon}
          />
        </TouchableHighlight>

        {props.item.file && (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={handleAttachmentDownload}>
            <Image
              source={ic_assignment_download_green}
              resizeMode="cover"
              style={styles.assignmentIcon}
            />
          </TouchableHighlight>
        )}

        <TouchableHighlight
          underlayColor="transparent"
          onPress={handleAssignmentAssign}>
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  isDeleteAssignment: teacherSelectors.isDeleteAssignment(state),
});
const mapDispatchToProps = {
  deleteAssignment: teacherOperations.deleteAssignment,
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentItem);

const styles = StyleSheet.create({
  assignmentInfoList: {
    backgroundColor: '#fff',
    paddingVertical: 3,
    borderLeftColor: '#808285',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  singleAssignmentButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  assignmentIcon: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(4),
    marginBottom: wp(1),
  },
  assignButtonText: {
    backgroundColor: '#1ba2de',
    color: '#fff',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    marginBottom: wp(1),
  },
});
