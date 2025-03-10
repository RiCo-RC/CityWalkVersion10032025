import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  AccountScreen,
  HomeScreen,
  MapScreen,
  PlanningScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Home', component: HomeScreen },
  { name: 'Account', component: AccountScreen },
  { name: 'Visit', component: PlanningScreen },
  { name: 'Map', component: MapScreen },
];

const getTabBarIcon = (route, focused, color, size) => {
  const icons = {
    HomeScreen: focused ? "home": "home-outline",
    AccountScreen: focused ? "account": "account-outline",
    PlanningScreen: focused ? "wallet-travel": "wallet-travel",
    MapScreen: focused ? "map": "map-outline",
  };

  return <Icon name={icons[route.name]} size={size} color={color} />;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => 
          getTabBarIcon(route, focused, color, size),
          tabBarActiveTintColor: "#3498db",
          tabBarInactiveTintColor: "gray",
          //tabBarStyle: commonStyles.tabBar,
          headerShown: false,
       })}
    >
      {screens.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;