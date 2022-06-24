import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_logout_white from 'assets/icons/ic_logout_white.png';

// User Preference
import {clearData, getActiveSchool} from 'api/UserPreference';

const GuardScreenHeader = props => {
  const {title, currentDate, nav, navAction, showLogoutButton, showSchoolLogo} =
    props;

  let headerIconAction = null;
  if (navAction === 'back') {
    headerIconAction = () => {
      nav.pop();
    };
  }

  const handleLogoutYesPress = async () => {
    try {
      // clearing user preferences from local storage
      await clearData();

      // resetting navigation to initial state for login again
      nav.navigate('LoggedOut');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure, you want to logout?',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: handleLogoutYesPress},
      ],
      {
        cancelable: false,
      },
    );
  };

  let headerTitle = title;
  if (currentDate) {
    headerTitle += ' (' + currentDate + ')';
  }

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
      <TouchableHighlight
        underlayColor="transparent"
        onPress={headerIconAction}>
        <View style={styles.menuTitleContainer}>
          {navAction === 'back' && (
            <Image
              source={ic_back}
              resizeMode="cover"
              style={styles.headerIcon}
            />
          )}
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.rightButtonContainer}>
        {showLogoutButton && (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={handleLogout}
            style={styles.logoutButton}>
            <Image
              source={ic_logout_white}
              resizeMode="cover"
              style={styles.logoutIcon}
            />
          </TouchableHighlight>
        )}

        {showSchoolLogo && schoolLogo && (
          <Image
            source={{uri: schoolLogo}}
            resizeMode="cover"
            style={styles.headerSchoolLogo}
          />
        )}
      </View>
    </View>
  );
};

export default GuardScreenHeader;

const styles = StyleSheet.create({
  screenHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(6),
    paddingHorizontal: wp(2),
    backgroundColor: '#1ba2de',
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  headerTitle: {
    color: '#fff',
    marginLeft: wp(1.5),
    fontSize: wp(3),
  },
  rightButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginRight: wp(4),
  },
  logoutIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
  headerSchoolLogo: {
    width: wp(10),
    aspectRatio: 2 / 1.2,
  },
});
