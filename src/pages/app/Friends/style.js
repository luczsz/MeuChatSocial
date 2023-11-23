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
});

export const styled = StyleSheet.create({
    modalContainer:{
        flex: 1,
        backgroundColor: theme.colors.overlay,
        alignItems: 'center',
        justifyContent: 'center',
    },

    card:{
        width: '60%',
        padding: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
    },

    title:{
        fontSize: 20,
        fontFamily: theme.fonts.bold,
        color:  theme.colors.three,
        marginBottom: 20,
    },

    openChat:{
        backgroundColor: theme.colors.three,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    closeChat:{
        backgroundColor: theme.colors.alert,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 12,
    },
    openText:{
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    }
})
