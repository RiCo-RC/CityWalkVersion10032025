import { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../context/ThemeProvider';
import { height, width } from '../utils/variables';
import { getBuildingsByCityId } from '../utils/apiRouter';

import {
  Header,
  CustomText,
  CustomButtonText,
  CustomInput,
} from '../components';

const BuildingsListScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { cityId } = route.params;
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await getBuildingsByCityId(cityId);
        if (
          response.message === 'Request was successful' &&
          response.buildings
        ) {
          setBuildings(response.buildings);
          setFilteredBuildings(response.buildings);
        }
      } catch (error) {
        console.error('Error when retrieving buildings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuildings();
  }, [cityId]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredBuildings(buildings);
      return;
    }
    const filtered = buildings.filter((building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBuildings(filtered);
  }, [searchQuery, buildings]);

  // Récupération du style selon le theme
  const getViewBackgroundColorStyle =
    theme === 'dark' ? styles.containerDark : styles.containerLight;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, getViewBackgroundColorStyle]}>
            <Header />
            <View style={styles.containerContent}>
              <View style={styles.containerSearch}>
                <CustomInput
                  placeholder='Find a building...'
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  iconName='magnify'
                  iconPosition='left'
                />
              </View>
              <View style={styles.containerList}>
                {isLoading ? (
                  <ActivityIndicator size='large' color='#007AFF' />
                ) : (
                  <FlatList
                    data={filteredBuildings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.buildingCard}>
                        <CustomText style={styles.buildingName}>
                          {item.name}
                        </CustomText>
                        <CustomText style={styles.buildingDescription}>
                          {item.description || 'No description'}
                        </CustomText>
                      </View>
                    )}
                    ListEmptyComponent={
                      <CustomText style={styles.noBuildings}>
                        No buildings found.
                      </CustomText>
                    }
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  />
                )}
              </View>
              <View style={styles.containerButtons}>
                <CustomButtonText
                  type='primary'
                  onBackground={true}
                  withBackground={true}
                  withBorder={true}
                  buttonStyle={styles.button}
                  onPress={() => navigation.navigate('AddBuildingScreen')}
                >
                  Add Building
                </CustomButtonText>

                <CustomButtonText
                  type='secondary'
                  onBackground={false}
                  withBackground={false}
                  withBorder={true}
                  buttonStyle={styles.button}
                  onPress={() => navigation.goBack()}
                >
                  Go back to map
                </CustomButtonText>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BuildingsListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
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
    width: '100%',
    paddingTop: Math.min(60, height * 0.1),
  },
  containerList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 2,
  },
  containerSearch: {
    width: Math.min(400, width * 0.9),
    marginVertical: 10,
  },
  noBuildings: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  buildingCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
  },
  buildingName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buildingDescription: {
    fontSize: 14,
    color: '#555',
  },
  containerButtons: {
    alignItems: 'center',
    gap: 10,
    height: 140,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    height: 60,
    width: '90%',
  },
});