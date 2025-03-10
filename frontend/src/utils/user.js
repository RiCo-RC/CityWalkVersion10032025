import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const loadUser = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error recovering user data", error);
    return null;
  }
};

export const logoutUser = async (navigation) => {
  try {
    await AsyncStorage.removeItem('uder');
    setUser(null);
    navigation.navigate('Main', { screen: 'HomeScreen'});
  } catch (error) {
    console.error("Error during disconnection", error);
  }
}