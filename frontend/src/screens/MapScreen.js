import {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, TextInput, View,} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from '@/context/ThemeProvider';
import {height, width} from '@/utils/variables';

import {CustomButtonText, CustomText, Header} from '@/components';

import {createCity, fetchCityCoordinates, getBuildingsByCityId, getOneCityById, getOneCityByName,} from '@/utils';

const MapScreen = ({navigation}) => {
    const {theme} = useTheme();
    const [city, setCity] = useState(null);
    const [buildings, setBuildings] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const mapRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [initialRegion, setInitialRegion] = useState(null);

    // const [initialRegion, setInitialRegion] = useState({
    //   latitude: 47.9961,
    //   longitude: 7.8534,
    //   latitudeDelta: 0.015,
    //   longitudeDelta: 0.015,
    // });

    // Fonction pour récupérer la ville
    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await getOneCityById(1);
                console.log('API answer:', response);

                if (response.message === 'Request was successful' && response.city) {
                    console.log('Retrieved city:', response.city);
                    await AsyncStorage.setItem('city', JSON.stringify(response.city));
                    setCity(response.city);

                    setInitialRegion({
                        latitude: response.city.latitude,
                        longitude: response.city.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
                    });
                }
            } catch (error) {
                console.error('Error retrieving city: ', error);
            }
        };

        fetchCity();
    }, []);

    // Fonction pour récupérer les bâtiments en fonction de la ville
    useEffect(() => {
        if (!city) return;

        const fetchBuildings = async () => {
            try {
                const response = await getBuildingsByCityId(city.id);
                console.log('API answer:', response);

                if (
                    response.message === 'Request was successful' &&
                    response.buildings
                ) {
                    console.log('Retrieved buildings:', response.buildings);
                    await AsyncStorage.setItem(
                        'buildings',
                        JSON.stringify(response.buildings)
                    );
                    setBuildings(response.buildings);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des bâtiments :', error);
            }
        };

        fetchBuildings();
    }, [city]);

    const handleMarkerPress = (poi) => {
        setSelectedPlace(poi);
        mapRef.current?.animateToRegion(
            {
                latitude: poi.latitude,
                longitude: poi.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            1000
        );
    };

    // Fonction de recherche de ville avec vérification dans la base de données
    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        try {
            // Recherche de la ville dans la base de données
            const cityFromDb = await getOneCityByName(searchQuery);
            setSearchQuery('');

            if (cityFromDb.message === 'Request was successful' && cityFromDb.city) {
                // Ville trouvée dans la base de données
                await handleCityFound(cityFromDb);
            } else {
                // Ville non trouvée dans la base de données - appel à OpenCage
                const cityData = await fetchCityCoordinates(searchQuery);

                if (cityData) {
                    // Sauvegarder la ville dans la base de données
                    const createResponse = await createCity({
                        name: cityData.name,
                        latitude: cityData.latitude,
                        longitude: cityData.longitude,
                    });

                    if (createResponse.city) {
                        // Ville créée et sauvegardée dans la base de données
                        await handleCityFound(createResponse.city);
                    }
                }
            }
        } catch (error) {
            console.log('Erreur', error.message);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    // Fonction pour gérer la ville trouvée (mise à jour de la carte et du stockage)
    const handleCityFound = async (cityData) => {
        if (cityData.city.latitude && cityData.city.longitude) {
            setCity(cityData.city);
            await AsyncStorage.setItem('city', JSON.stringify(cityData.city));

            setInitialRegion({
                latitude: cityData.city.latitude,
                longitude: cityData.city.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            mapRef.current?.animateToRegion(
                {
                    latitude: cityData.city.latitude,
                    longitude: cityData.city.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                },
                1000
            );
        }
    };

    // Récupération du background selon le thème
    const getViewBackgroundColorStyle =
        theme === 'dark' ? styles.containerDark : styles.containerLight;

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'
            >
                <View style={[styles.container, getViewBackgroundColorStyle]}>
                    <Header/>
                    <View style={styles.containerContent}>
                        <View style={styles.containerMap}>
                            {/* Barre de recherche */}
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={[
                                        styles.searchInput,
                                        theme === 'dark' && styles.searchInputDark,
                                    ]}
                                    placeholder='Find a city...'
                                    placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    onSubmitEditing={handleSearch}
                                />
                            </View>
                            <MapView
                                ref={mapRef}
                                style={styles.map}
                                initialRegion={initialRegion}
                                region={initialRegion}
                                onPress={() => setSelectedPlace(null)}
                            >
                                {/* Affichage des bâtiments récupérés */}
                                {buildings.map((building) => (
                                    <Marker
                                        key={building.id}
                                        coordinate={{
                                            latitude: building.latitude,
                                            longitude: building.longitude,
                                        }}
                                        onPress={() => handleMarkerPress(building)}
                                    />
                                ))}
                            </MapView>

                            {/* Détails du bâtiment sélectionné */}
                            {selectedPlace && (
                                <View style={styles.selectedPlaceContainer}>
                                    <CustomText style={styles.selectedPlaceTitle}>
                                        {selectedPlace.name}
                                    </CustomText>
                                    <CustomText style={styles.selectedPlaceDescription}>
                                        {selectedPlace.description}
                                    </CustomText>
                                </View>
                            )}
                        </View>
                        <View style={styles.containerButtons}>
                            <CustomButtonText
                                type='primary'
                                onBackground={true}
                                withBackground={true}
                                withBorder={true}
                                buttonStyle={styles.button}
                                onPress={() => {
                                    if (city) {
                                        navigation.navigate("BuildingsListScreen", {cityId: city.id});
                                    }
                                }}
                            >
                                List of buildings
                            </CustomButtonText>
                            <CustomButtonText
                                type='primary'
                                onBackground={true}
                                withBackground={true}
                                withBorder={true}
                                buttonStyle={styles.button}
                            >
                                Planning a visit
                            </CustomButtonText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        gap: 10,
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
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        paddingTop: Math.min(60, height * 0.1),
    },
    containerMap: {
        alignItems: 'center',
        height: '70%',
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
    searchContainer: {
        width: Math.min(500, width * 0.8),
        marginVertical: 10,
        position: 'relative',
    },
    searchInput: {
        backgroundColor: '#ECF0F1',
        padding: 15,
        borderRadius: 10,
        borderBottomWidth: 1,
        fontSize: 16,
        elevation: 3,
        borderColor: '#2D46AF',
    },
    searchInputDark: {
        backgroundColor: '#2D46AF',
        color: '#ECF0F1',
        borderColor: '#ECF0F1',
    },
    selectedPlaceContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
    },
    selectedPlaceTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    selectedPlaceDescription: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
    map: {
        flex: 1,
        // height: '100%',
        width: '100%',
    },
    button: {
        height: 60,
        width: '90%',
    },
    loading: {
        position: 'absolute',
        right: 15,
        top: 18,
    },
});
