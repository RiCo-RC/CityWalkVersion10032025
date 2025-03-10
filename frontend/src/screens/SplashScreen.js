import {useEffect} from "react";
import {StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

import {useTheme} from '@/context/ThemeProvider';

import {checkAuthentification} from "@/utils";
import {CustomIcon, CustomText, ProgressBar} from '@/components';

const SplashScreen = () => {
    const navigation = useNavigation();
    const {theme} = useTheme();

    useEffect(() => {
        checkAuthentification(navigation);
    }, [navigation]);

    // Récupération du style selon le theme
    const getViewBackgroundColorStyle = theme === 'dark' ? styles.containerDark : styles.containerLight;
    const getTextColorStyle = theme === 'dark' ? styles.textDark : styles.textLight;

    return (
        <View style={[styles.container, getViewBackgroundColorStyle]}>
            <CustomIcon icon='loading'/>
            <CustomText level='note' style={[styles.text, getTextColorStyle]}>Loading...</CustomText>
            <ProgressBar/>
        </View>
    );
};

export default SplashScreen;

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
    //--- TYPOGRAPHY ---\\
    text: {
        fontFamily: "Montserrat-BoldItalic",
    },
    textLight: {
        color: "#2D46AF",
    },
    textDark: {
        color: "#ECF0F1",
    },
});
