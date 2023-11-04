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
        padding: 10,
        flex: 1,
        width: '100%',
        marginTop: 20,
        gap: 10,

    },
    header:{
        marginTop: 32,
        paddingLeft: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderBottomColor: theme.colors.three,
    },
    button:{
        flexDirection: 'row',
        height: '14%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 14,
        paddingRight: 14,
        gap: 10,
    },
    logo:{
        width: 200,
        height: 200,
    },
    title:{
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white
    },

    input:{
        backgroundColor: theme.colors.two, 
        flex: 1,
        height: 60,
        paddingLeft: 14,
        borderRadius: 12,
        color: theme.colors.white,
        fontFamily: theme.fonts.regular,
        
    },
    submit:{
        backgroundColor: theme.colors.three,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }
})
