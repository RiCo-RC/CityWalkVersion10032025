import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AccountScreen, HomeScreen, MapScreen, PlanningScreen } from '@/screens';

const Tab = createBottomTabNavigator();

const screens = [
    { name: 'Home', component: HomeScreen },
    { name: 'Account', component: AccountScreen },
    { name: 'Visit', component: PlanningScreen },
    { name: 'Map', component: MapScreen },
];

const getTabBarIcon = (route, focused, color, size) => {
    const icons = {
        Home: focused ? "home" : "home-outline",
        Account: focused ? "account" : "account-outline",
        Visit: focused ? "wallet-travel" : "wallet-travel",
        Map: focused ? "map" : "map-outline",
    };

    return <Icon name={icons[route.name]} size={size} color={color} />;
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) =>
                    getTabBarIcon(route, focused, color, size),
                tabBarActiveTintColor: "#3498db",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
            id="main">
            {screens.map(({ name, component }) => (
                <Tab.Screen key={name} name={name} component={component} />
            ))}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
