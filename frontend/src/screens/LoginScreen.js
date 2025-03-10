import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeProvider';
import { height } from '../utils/variables';

import {
  Header,
  CustomButtonText,
  CustomButtonLink,
  CustomInput,
} from '../components';

import { loginUser } from '../utils/apiRouter';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const getViewBackgroundColorStyle =
    theme === 'dark' ? styles.containerDark : styles.containerLight;

  const handleUsernameChange = (username) => setUsername(username);
  const handlePasswordChange = (password) => setPassword(password);

  const handleLogin = async ({ username, password }) => {
    console.log('handleLogin:', username, password);
    setLoading(true);

    try {
      const user = { username, password };

      const response = await loginUser(user);
      console.log('API answer:', response);

      if (response.message === 'No matching user') {
        setLoading(false);
        return;
      }

      if (response.message === 'Login successful' && response.user) {
        console.log('Retrieved user:', response.user);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        navigation.navigate('Main', { screen: 'HomeScreen', params: { user: user}});
      }
    } catch (error) {
      console.log('Connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');

    console.log('validateform: lauched');

    if (!username) {
      setUsernameError('User name required.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password required.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleLogin({ username, password });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={[styles.container, getViewBackgroundColorStyle]}>
              <Header />
              <View style={[styles.containerContent]}>
                {/* Formulaire de connexion */}
                <View style={[styles.containerForm]}>
                  <View style={[styles.containerFormForm]}>
                    <CustomInput
                      placeholder='Write your username...'
                      type='text'
                      value={username}
                      onChangeText={handleUsernameChange}
                      error={usernameError}
                    />
                    <CustomInput
                      placeholder='Write your password...'
                      type='password'
                      value={password}
                      onChangeText={handlePasswordChange}
                      error={passwordError}
                    />
                  </View>
                </View>
                {/* Buttons */}
                <View style={[styles.containerButtons]}>
                  <CustomButtonText
                    type='primary'
                    onBackground={true}
                    withBackground={true}
                    withBorder={true}
                    buttonStyle={styles.button}
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Connexion...' : "I'm ready to visit"}
                  </CustomButtonText>
                  <CustomButtonText
                    type='secondary'
                    onBackground={false}
                    withBackground={false}
                    withBorder={true}
                    buttonStyle={styles.button}
                    onPress={() =>
                      navigation.navigate('Main', { screen: 'HomeScreen' })
                    }
                  >
                    Sign up
                  </CustomButtonText>
                  <CustomButtonLink
                    text='Forgot your Password?'
                    linkText='Click here!'
                    type='primary'
                    onPress={() =>
                      navigation.navigate('Main', { screen: 'HomeScreen' })
                    }
                  />
                </View>
              </View>
              <View style={[styles.containerBack, getViewBackgroundColorStyle]}>
                <CustomButtonText
                  type='tertiary'
                  onBackground={false}
                  withBackground={false}
                  withBorder={true}
                  buttonStyle={styles.button2}
                  onPress={() =>
                    navigation.navigate('Main', { screen: 'HomeScreen' })
                  }
                >
                  Go back
                </CustomButtonText>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  //--- VIEW ---\\
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  containerLight: {
    backgroundColor: '#ECF0F1',
  },
  containerDark: {
    backgroundColor: '#2D46AF',
  },
  containerContent: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    paddingTop: Math.min(60, height * 0.1),
  },
  containerForm: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  containerFormForm: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  containerButtons: {
    alignItems: 'center',
    gap: 10,
    height: 200,
    justifyContent: 'center',
    width: '100%',
  },
  containerBack: {
    alignItems: 'center',
    height: height * 0.08,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    height: 60,
    width: '90%',
  },
  button2: {
    width: '90%',
  },
});
