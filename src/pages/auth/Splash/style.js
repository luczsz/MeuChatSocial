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

        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,

    },
    button:{
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: 200,
        height: 200,
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    next:{
        backgroundColor: theme.colors.three,
        width: '80%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    nextText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.one,
    }
})
