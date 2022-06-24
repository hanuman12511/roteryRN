import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from 'components/DetailListComponent';
import showToast from 'components/CustomToast';

// Icons
import ic_assignment_download_green from 'assets/icons/ic_assignment_download_green.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StudentAssignmentItem = props => {
  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(url);
        // showToast('Unable to handle this url!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const info = props.item;

  const assignmentInfoList = {
    backgroundColor:
      '#' +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      0x15,
    padding: wp(2),
    borderWidth: 1,
    borderColor: '#00000015',
  };

  return (
    <View style={assignmentInfoList}>
      {/* <DetailListComponent
        titleArr={props.titleArr}
        infoArr={props.item.info}
        skipContainerStyle
      /> */}
      {props.item.file && (
        <TouchableOpacity
          onPress={handleAttachmentDownload}
          style={styles.boxContainerStyle}>
          <View style={styles.boxContainer}>
            <Text style={styles.headingText}>
              Class {info.classname} - {info.sectionname}
            </Text>
            <Text style={styles.msgText}>
              {info.created} {info.subject}
            </Text>
            <Text style={styles.msgText}>Given By : {info.givenby}</Text>
            <Text style={styles.msgText}>Due : {info.end_date}</Text>
            <Text style={styles.msgText}>{info.description}</Text>
          </View>
          {props.item.file && (
            <View style={styles.singleAssignmentButton}>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={handleAttachmentDownload}>
                <Image
                  source={ic_assignment_download_green}
                  resizeMode="cover"
                  style={styles.assignmentIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StudentAssignmentItem;

const styles = StyleSheet.create({
  // assignmentInfoList: {
  //   backgroundColor:
  //     '#' +
  //     (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
  //     0x15,
  //   padding: wp(2),
  //   borderWidth: 1,
  //   borderColor: '#00000015',
  // },
  singleAssignmentButton: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
  assignmentIcon: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(3.5),
    marginBottom: hp(0.5),
  },
  boxContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  boxContainer: {flex: 1, marginLeft: wp(2), justifyContent: 'space-between'},
  headingText: {
    fontSize: wp(4.2),
    fontWeight: 'bold',
    marginBottom: wp(1.5),
  },
  msgText: {fontSize: wp(3), fontWeight: '400', marginBottom: wp(1.3)},
});
