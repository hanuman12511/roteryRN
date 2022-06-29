import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_menu from 'assets/icons/ic_main_menu.png';
import logo from 'assets/images/rotary-logo.png';

// User Preference
import {getActiveSchool} from 'api/UserPreference';

const Header = props => {
  const {title, nav, navAction} = props;

  const toggleDrawer = () => {
    props.nav.openDrawer();
  };

  const handleBack = () => {
    nav.pop();
  };

  let handleNavAction = toggleDrawer;
  let navIcon = ic_menu;

  if (navAction === 'back') {
    handleNavAction = handleBack;
    navIcon = ic_back;
  }

  const handleQR = () => {
    props.nav.navigate('QR Code');
  };

  const handleProfile = () => {
    props.nav.navigate('Profile');
  };

  const onSchoolLogoPress = () => {
    props.nav.navigate('Home');
  };

  return (
    <View style={styles.screenHeaderBar}>
      <TouchableHighlight underlayColor="transparent" onPress={handleNavAction}>
        <View style={styles.menuTitleContainer}>
          <Image
            source={navIcon}
            resizeMode="cover"
            style={styles.headerIcon}
          />
          <Text style={styles.dashBoardTopBarTitle}>{props.title}</Text>
        </View>
      </TouchableHighlight>

      <TouchableOpacity onPress={onSchoolLogoPress}>
        <Image
          source={logo}
          resizeMode="cover"
          style={styles.headerSchoolLogo}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

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
