import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from 'react-native';

import {useTheme} from '@/context/ThemeProvider';

import {Header} from '@/components';
import {loadUser} from "@/utils";

const AccountScreen = ({navigation}) => {
    const {theme} = useTheme();
    const [user, setUser] = useState(null);

    // Récupération du background selon le theme
    const getViewBackgroundColorStyle = theme === 'dark' ? styles.containerDark : styles.containerLight;

    // Récupération de l'utilisateur
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await loadUser();
            setUser(userData);
        };

        fetchUser();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.container, getViewBackgroundColorStyle]}>
                <Header/>
                <Text>Welcome to you: </Text>
            </View>
        </SafeAreaView>
    )
};

export default AccountScreen;

const styles = StyleSheet.create({
    //--- VIEW ---\\
    container: {
        alignItems: 'center',
        flex: 1,
        gap: 10,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    containerLight: {
        backgroundColor: "#ECF0F1",
    },
    containerDark: {
        backgroundColor: "#2D46AF",
    },
});
