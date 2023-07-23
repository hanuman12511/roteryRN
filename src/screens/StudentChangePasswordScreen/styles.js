import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginInputView: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    height: 40,
    paddingBottom: 5,
    marginBottom: 30,
  },
  inputIcon: {
    borderRightWidth: 2,
    borderRightColor: '#fff',
    paddingRight: 10,
    color: '#fff',
  },
  loginInput: {
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    color: '#fff',
    height: 40,
    width: '80%',
  },
  loginButton: {
    width: 200,
    height: 42,
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1ba2de',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderContentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
