import type { User } from '@react-native-google-signin/google-signin';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

GoogleSignin.configure();

export default function App() {
  const [userInfo, setUserInfo] = useState<User>(null);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      const typedError = error as NativeModuleError;

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          Alert.alert('Sign-in cancelled.');
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert('Sign-in in progress.');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only.
          Alert.alert('Play services are not available or outdated.');
          break;
        default:
          Alert.alert('Something went wrong', typedError.toString());
      }
    }
  };

  const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      setUserInfo(null);
    } catch (error) {
      const typedError = error as NativeModuleError;
      Alert.alert('Something went wrong', typedError.toString());
    }
  };

  function render() {
    const body = userInfo ? renderMain(userInfo) : renderSignInButton();
    return body; 
  }

  function renderMain(userInfo: User) {
    return (
      <>
        <Text>Enter a workout value:</Text>
        <StatusBar style="auto" />
        <TextInput
          style={{
            height: 40,
            width: '80%',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          defaultValue=""
          placeholder="Type here"
        />
      </>
    );
  }

  function renderSignInButton() {
    return (
      <>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
        />
      </>
    );
  }

  return (<View style={styles.container}>{render()}</View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
