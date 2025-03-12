import api from '@/service/ApiService';

import {API_KEY_MAP} from './variables';

//---- SPECIFIQUE A LA MAP: OpenCage ----\\
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export const fetchCityCoordinates = async (cityName) => {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&key=${API_KEY_MAP}&language=fr`;
        return await fetch(url);

        if (!response.ok) {
            throw new Error('Erreur de réponse de l\'API OpenCage');
        }

        const data = await response.json();

        console.log(">data", data);

        if (data && data.results.length > 0) {
            const cityData = data.results[0];
            const {components, geometry} = cityData;
            const {city, country} = components;
            const {lat, lng} = geometry;

            // Vérification que la latitude et la longitude sont valides
            if (lat && lng) {
                const cityNameToSave = city || cityName;
                const countryNameToSave = country || '';
                return {
                    name: cityNameToSave,
                    country: countryNameToSave,
                    latitude: lat,
                    longitude: lng,
                };
            } else {
                throw new Error('Coordinates are invalid');
            }
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw new Error(`Error retrieving city data : ${error.message}`);
    }
};

//---- UTILISATEURS ---- \\

export const getAllUsers = async () => {
    try {
        // echec — message: 'No users found'
        // OK — response.message: 'Request was successful'
        // OK — response.userList: id, firstName, lastName, username, email, password, role.
        return await api.get('users');
    } catch (error) {
        throw new Error('User - getAllUsers | FAILED: ' + error.message);
    }
};

export const createUser = async (userData) => {
    try {
        return await api.post('user/create', userData);
        // echec — message: 'User already exists'
        // OK - response.message: 'User created successfully'
        // OK - response.user: id, firstName, lastName, username, email, password, role.
    } catch (error) {
        throw new Error('User - createUser | FAILED: ' + error.message);
    }
};

export const updateUser = async (userData) => {
    try {
        return await api.put('user/update', userData);
        // echec — message: 'User not found'
        // OK — response.message: 'User updated successfully'
    } catch (error) {
        throw new Error('User - updateUser | FAILED: ' + error.message);
    }
};

export const deleteUser = async (userId) => {
    try {
        return await api.delete(`user/delete/id/${userId}`);
        // echec — message: 'User not found'
        // OK — response.message: 'User deleted successfully'
    } catch (error) {
        throw new Error('User - deleteUser | FAILED: ' + error.message);
    }
};

export const getOneUserById = async (userId) => {
    try {
        return await api.get(`user/get/id/${userId}`);
        // echec — message: 'User not found'
        // OK — response.message: 'Request was successful'
        // OK — response.user: id, firstName, lastName, username, email, password, role.
    } catch (error) {
        throw new Error('User - getOneUserById | FAILED: ' + error.message);
    }
};

export const getOneUserByUsername = async (username) => {
    try {
        return await api.get(`user/get/username/${username}`);
        // echec — message: 'User not found'
        // OK — response.message: 'Request was successful'
        // OK — response.user: id, firstName, lastName, username, email, password, role.
    } catch (error) {
        throw new Error('User - getOneUserByUsername | FAILED: ' + error.message);
    }
};

export const registerUser = async (userData) => {
    try {
        return await api.post('user/register', userData);
        // echec — message: 'User already exists'
        // OK — response.message: 'User created successfully'
    } catch (error) {
        throw new Error('User - registerUser | FAILED: ' + error.message);
    }
};

export const loginUser = async (userData) => {
    try {
        return await api.post('user/login', userData);
        // echec — message: 'No matching user'
        // OK — response.message: 'Login successful'
        // OK — response.user: id, firstName, lastName, username, email, password, role.

    } catch (error) {
        throw new Error('User - loginUser | FAILED: ' + error.message);
    }
};

export const guestLoginUser = async () => {
    try {
        return await api.post('user/guest-login');
        // ok - response.message: 'Login successful'
        // ok - response.user: username, role

    } catch (error) {
        throw new Error('User - guestLoginUser | FAILED: ' + error.message);
    }
};

//---- VILLES ----\\

export const getAllCities = async () => {
    try {
        return await api.get('cities');
        // echec - message: 'No cities found'
        // ok - response.message: 'Request was successful'
        // ok - response.cityList: id, name, latitude, longitude, latitudeDelta & longitudeDelta

    } catch (error) {
        throw new Error('City - getAllCities | FAILED: ' + error.message);
    }
};

export const createCity = async (cityData) => {
    try {
        return await api.post('city/create', cityData);
        // echec — message: 'City already exists'
        // OK — response.message: 'Request was successful'
        // OK — response.city: id, name, latitude, longitude, latitudeDelta & longitudeDelta.

    } catch (error) {
        throw new Error('City - createCity | FAILED: ' + error.message);
    }
};

export const updateCity = async (cityData) => {
    try {
        return await api.put('city/update', cityData);
        // echec — message: 'City not found'
        // OK — response.message: 'Request was successful'

    } catch (error) {
        throw new Error('City - updateCity | FAILED: ' + error.message);
    }
};

export const deleteCity = async (cityId) => {
    try {
        return await api.delete(`city/delete/id/${cityId}`);
        // echec — message: 'City not found'
        // OK — response.message: 'Request was successful'

    } catch (error) {
        throw new Error('City - deleteCity | FAILED: ' + error.message);
    }
};

export const getOneCityById = async (cityId) => {
    try {
        return await api.get(`city/get/id/${cityId}`);
        // echec - message: 'City don't exists'
        // ok - response.message: 'Request was successful'
        // ok - response.city: id, name, latitude, longitude, latitudeDelta & longitudeDelta

    } catch (error) {
        throw new Error('City - getOneCityById | FAILED: ' + error.message);
    }
};

export const getOneCityByName = async (cityName) => {
    try {
        return await api.get(`city/get/name/${cityName}`);
        // echec - message: 'City don't exists'
        // ok - response.message: 'Request was successful'
        // ok - response.city: id, name, latitude, longitude, latitudeDelta & longitudeDelta

    } catch (error) {
        throw new Error('City - getOneCityByName | FAILED: ' + error.message);
    }
};

//---- BÂTIMENTS ----\\

export const getAllBuildings = async () => {
    try {
        return await api.get('buildings');
        // échec — message: 'No buildings found'
        // OK — response.message: 'Request was successful'
        // OK — response.users: id, name, description, latitude, longitude.

    } catch (error) {
        throw new Error('Building - getAllBuildings | FAILED: ' + error.message);
    }
};

export const createBuilding = async (buildingData) => {
    try {
        return await api.post('building/create', buildingData);
        // échec — message: 'Building already exists'
        // OK — response.message: 'Building created successfully'
        // OK — response.user: id, name, description, latitude, longitude.

    } catch (error) {
        throw new Error('Building - createBuilding | FAILED: ' + error.message);
    }
};

export const updateBuilding = async (buildingData) => {
    try {
        return await api.put('building/update', buildingData);
        // échec — message: 'Building not found'
        // OK — response.message: 'Building updated successfully'

    } catch (error) {
        throw new Error('Building - updateBuilding | FAILED: ' + error.message);
    }
};

export const deleteBuilding = async (buildingId) => {
    try {
        return await api.delete(`building/delete/id/${buildingId}`);
        // échec — message: 'Building not found'
        // OK — response.message: 'Building deleted successfully'

    } catch (error) {
        throw new Error('Building - deleteBuilding | FAILED: ' + error.message);
    }
};

export const getBuildingById = async (buildingId) => {
    try {
        return await api.get(`building/get/id/${buildingId}`);
        // échec — message: 'Building not found'
        // OK — response.message: 'Request was successful'
        // OK — response.building: id, name, description, latitude, longitude.

    } catch (error) {
        throw new Error('Building - getBuildingById | FAILED: ' + error.message);
    }
};

export const getBuildingsByCityId = async (cityId) => {
    try {
        return await api.get(`building/get/city/id/${cityId}`);
        // échec — message: 'No buildings found for this city'
        // OK — response.message: 'Request was successful'
        // OK — response.buildings: Array of buildings (id, name, description, latitude, longitude)

    } catch (error) {
        throw new Error('Building - getBuildingsByCityId | FAILED: ' + error.message);
    }
};
