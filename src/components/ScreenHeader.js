import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const win = Dimensions.get('window');
// Icons
import ic_main_menu from 'assets/icons/ic_main_menu.png';
import ic_search_white from 'assets/icons/ic_search_white.png';
import logo from 'assets/images/rotary-logo.png';
// User Preference
import {getActiveSchool} from 'api/UserPreference';

const ScreenHeader = props => {
  let headerIcon = ic_main_menu;
  props.backIcon && (headerIcon = props.backIcon);

  const toggleDrawer = () => {
    props.nav.openDrawer();
  };

  const goBack = () => {
    props.nav.pop();
  };

  let headerIconAction = toggleDrawer;
  props.backIcon && (headerIconAction = goBack);

  const onStudentListPress = () => {
    props.nav.navigate('StudentList');
  };

  const onSearchPress = () => {
    props.nav.push('AdminSearch');
  };

  const onSchoolLogoPress = () => {
    props.nav.navigate('Home');
  };

  const [schoolLogo, setSchoolLogo] = useState(null);

  const getSchoolLogo = async () => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      const {logo} = activeSchool;
      setSchoolLogo(logo);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSchoolLogo();
  }, []);

  return (
    <View style={styles.screenHeaderBar}>
      <TouchableOpacity onPress={headerIconAction} style={{flex: 1}}>
        <View style={styles.menuTitleContainer}>
          <Image
            source={headerIcon}
            resizeMode="cover"
            style={styles.headerIcon}
          />
          <Text style={styles.dashBoardTopBarTitle}>{props.title}</Text>
        </View>
      </TouchableOpacity>

      {props.studentListIcon && (
        <TouchableOpacity
          onPress={onStudentListPress}
          style={styles.studentListIcon}>
          <Image
            source={props.studentListIcon}
            resizeMode="cover"
            style={styles.headerStudentListIcon}
          />
        </TouchableOpacity>
      )}

      {props.showSearchIcon && (
        <TouchableOpacity
          onPress={onSearchPress}
          style={styles.studentListIcon}>
          <Image
            source={ic_search_white}
            resizeMode="cover"
            style={styles.headerSearchIcon}
          />
        </TouchableOpacity>
      )}

      {props.showSchoolLogo && schoolLogo && (
        <TouchableOpacity onPress={onSchoolLogoPress}>
          <Image
            source={logo}
            resizeMode="cover"
            style={styles.headerSchoolLogo}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  screenHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(6),
    paddingHorizontal: wp(2),
    backgroundColor: '#ffffff',
    borderBottomColor: '#ccc8',
    borderBottomWidth: 1,
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  headerStudentListIcon: {
    height: hp(5),
    aspectRatio: 1 / 1,
  },
  headerSearchIcon: {
    height: wp(3),
    aspectRatio: 1 / 1,
  },
  dashBoardTopBarTitle: {
    color: '#333',
    marginLeft: wp(2),
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  studentListIcon: {
    marginLeft: 'auto',
    marginRight: wp(3),
  },
  headerSchoolLogo: {
    height: hp(4.5),
    aspectRatio: 3 / 1,
    resizeMode: 'contain',
    // width: win.width / 2.5,
    // height: win.width / 2.5,
    // resizeMode: 'contain',
  },
});
