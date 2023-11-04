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
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: 300,
        height: 300,
        borderRadius: 152,
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
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
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.white,
    }
})
