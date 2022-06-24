import React from 'react';
import {
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
import DetailListComponent from './DetailListComponent';
import showToast from './CustomToast';

// Icons
import ic_assignment_download_green from 'assets/icons/ic_assignment_download_green.png';

const StudentAssignmentItem = props => {
  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;
      // const supported = await Linking.canOpenURL(url);

      Linking.openURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    props.item.file && (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={handleAttachmentDownload}>
        <View style={styles.assignmentInfoList}>
          <DetailListComponent
            titleArr={props.titleArr}
            infoArr={props.item.info}
            skipContainerStyle
          />

          <View style={styles.singleAssignmentButton}>
            <View>
              <Image
                source={ic_assignment_download_green}
                resizeMode="cover"
                style={styles.assignmentIcon}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  );
};

export default StudentAssignmentItem;

const styles = StyleSheet.create({
  assignmentInfoList: {
    backgroundColor: '#fff',
    paddingVertical: wp(1),
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  singleAssignmentButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
  },
  assignmentIcon: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(3.5),
    marginBottom: hp(0.5),
  },
});
