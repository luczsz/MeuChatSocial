import { StyleSheet } from "react-native";
import { theme } from '../../../global/theme';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.one,
    },
    content:{
        flex: 1,
        width: '100%',
        marginTop: 20,
        gap: 10,

        alignItems: 'center',
        justifyContent: 'center',

    },
    header:{
        marginTop: 32,
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        height: 60,
        width: '100%',
        borderBottomWidth: 2,
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
        width: 45,
        height: 45,

        borderRadius: 44,
        borderColor: theme.colors.three,
        borderWidth: 2,
    },
    ImageChats:{
        width: 290,
        height: 290,
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
    },
    Submit:{
        backgroundColor: theme.colors.three,
        width: '80%',
        height: 60,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    submitText:{
        fontSize: 22,
        fontFamily: theme.fonts.bold,
        color: theme.colors.one,
    }
})
