import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Images
import splash_screen_logo from 'assets/images/splash_screen_logo.png';

export default class SplashScreen extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
  };

  handleAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const animatedImageStyle = [
      {
        opacity: this.state.opacity,
        transform: [
          {
            scale: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      },
      styles.logo,
    ];

    return (
      <View style={styles.container}>
        <Animated.Image
          source={splash_screen_logo}
          resizeMode="cover"
          onLoad={this.handleAnimation}
          style={animatedImageStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: hp(14),
    aspectRatio: 2 / 1,
  },
});
