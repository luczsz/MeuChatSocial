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
        marginTop: 32,

        alignItems: 'center',
        gap: 10,

    },
    button:{
        height: '20%',
        width: '100%',
        gap: 10,
        alignItems: 'center',
    },
    logo:{
        width: 130,
        height: 130,
        marginTop: 10,
        marginBottom: 20,
    },
    title:{
        fontSize: 40,        
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },
    next:{
        backgroundColor: theme.colors.three,
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    nextText:{
        fontSize: 22,        
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },


    input:{
        borderColor: theme.colors.three,
        borderWidth: 2,
        width: '90%',
        height: 60,
        paddingLeft: 16,
        borderRadius: 8,
        fontFamily: theme.fonts.regular,
        color: theme.colors.white,
    }
})
