import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../context/ThemeProvider';
import { height } from '../utils/variables';

import { CustomButtonText, CustomText } from '../components';

const HomeUserNoConnected = ({ navigation, user }) => {
  const { theme } = useTheme();
  const [localUser, setLocalUser] = useState(user); 

  // Vérifier si 'user' a changé à chaque rechargement du composant
  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const userRole = localUser?.role === 'NON_CONNECTED' ? 'Guest' : (localUser?.role ? localUser.role.charAt(0).toUpperCase() + localUser.role.slice(1).toLowerCase() : 'Guest');

  // Fonction pour se déconnecter
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user'); 
      setLocalUser(null);
      navigation.navigate('SplashScreen');
    } catch (error) {
      console.error("Disconnection error:", error);
    }
  };

  return (
    <View style={[styles.container]}>
      {localUser ? (
        <CustomText>Welcome to you: {localUser.username} - {userRole}.</CustomText>
      ) : (
        <CustomText>Welcome Guest</CustomText>
      )}
      <CustomButtonText
        type='primary'
        onBackground={true}
        withBackground={true}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Main', { screen: 'HomeScreen'})}
      >
        My favorites list
      </CustomButtonText>

      <CustomButtonText
        type='primary'
        onBackground={true}
        withBackground={true}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Main', { screen: 'HomeScreen'})}
      >
        Plan a visit
      </CustomButtonText>

      <CustomButtonText
        type='primary'
        onBackground={true}
        withBackground={true}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Main', { screen: 'Map' })}
      >
        Go to map
      </CustomButtonText>

      <CustomText type='note'>----- OR -----</CustomText>

      <CustomButtonText
        type='secondary'
        onBackground={false}
        withBackground={false}
        withBorder={true}
        buttonStyle={styles.button}
        onPress={handleLogout}
      >
        Logout
      </CustomButtonText>
    </View>
  );
};

export default HomeUserNoConnected;

const styles = StyleSheet.create({
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
  }
});