import { StyleSheet } from "react-native";
import { theme } from '../../../global/theme';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.one,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        flex: 1,
        width: '100%',
        padding: 20,
        gap: 10,

    },
    button:{
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 40,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },
})
