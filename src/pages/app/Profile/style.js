import { StyleSheet } from "react-native";
import { theme } from '../../../global/theme';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.one,
        alignItems: 'center',
    },
    content:{
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        padding: 20,
        gap: 10,

    },
    button:{
        height: '10%',
        width: '100%',
        gap: 10,
        alignItems: 'center',
    },
    header:{
        backgroundColor: theme.colors.three,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 35,
        gap: 10,
        height: 180,
        width: '100%',
    },
    headerContainer:{
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        gap: 10,
    },
    logo:{
        width: 180,
        height: 180,
        borderRadius: 152,
        marginTop: -100,
        borderWidth: 4,
        borderColor: theme.colors.two,
    },
    title:{
        fontSize: 20,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },
    subTitle:{
        fontSize: 14,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },
    lgOut:{
        fontSize: 20,
        fontFamily: theme.fonts.bold,
        color: theme.colors.three,
    },
    comunity:{
        backgroundColor: theme.colors.three,
        width: '80%',
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row'
    },
    chat:{
        width: 60,
        height: 60,
        backgroundColor: theme.colors.three,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
})
