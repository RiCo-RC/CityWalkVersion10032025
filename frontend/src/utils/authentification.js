import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuthentification = async (navigation) => {
  try {
    const user = await AsyncStorage.getItem('user');
    console.log('user data: ' + user);
    setTimeout(() => {
      navigation.navigate('Main', user ? { screen: 'HomeScreen', params: { user: user}} : { screen: 'HomeScreen'});
    }, 3500);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'utilisateur",
      error
    );
    navigation.navigate('Main', { screen: 'HomeScreen'});
  }
};