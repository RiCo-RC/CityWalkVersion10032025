import { View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeProvider';
import { height } from '../utils/variables';

import { CustomButtonText, CustomText } from '../components';

import { guestLoginUser } from "../utils/apiRouter";

const HomeUserNoConnected = ({ navigation }) => {
  const { theme } = useTheme();

  const handleGuestLogin = async () => {
    console.log('lauched handleGuestLogin')
    try {
      const response = await guestLoginUser();
      console.log("API answer:", response);

      if (response.message === 'Login successful' && response.user) {
        console.log("Retrieved user:", response.user);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        navigation.replace('Main', { screen: 'HomeScreen', params: { user: response.user}});
      }
    } catch (error) {
      console.error("Guest login error:", error);
    }
  };

  return (
    <View style={[styles.container]}>
      <CustomButtonText
        type='primary'
        onBackground={true}
        withBackground={true}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </CustomButtonText>
      <CustomButtonText
        type='secondary'
        onBackground={false}
        withBackground={false}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up Now
      </CustomButtonText>
      <CustomText type='note'>----- OR -----</CustomText>
      <CustomButtonText
        type='tertiary'
        onBackground={false}
        withBackground={false}
        withBorder={true}
        buttonStyle={styles.button2}
        onPress={handleGuestLogin}
      >
        Connect as a Guest
      </CustomButtonText>
    </View>
  );
};

export default HomeUserNoConnected;

const styles = StyleSheet.create({
  //--- VIEW ---\\
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    paddingTop: Math.min(60, height * 0.1),
    paddingBottom: height * 0.08,
  },
  button: {
    height: 60,
    width: '90%',
  },
  button2: {
    width: '90%',
  },
});
