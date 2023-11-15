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
        backgroundColor: 'red',
        flex: 1,
        width: '100%',
    },
    header:{
        marginTop: 32,
        paddingLeft: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 60,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.three,
    },
    button:{
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        height: '14%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 14,
        paddingRight: 14,
        gap: 10,
        position: 'absolute',
        bottom: 0,
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
});

export const styled = StyleSheet.create({
    containerModal:{
        flex: 1,
        backgroundColor: theme.colors.overlay,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card:{
        backgroundColor: theme.colors.white,
        width: '70%',
        height: '42%',
        padding: 10,
        borderRadius: 12,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItem:{
        backgroundColor: theme.colors.three,
        padding: 8,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    menuItemText:{
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    }
});

export const styling = StyleSheet.create({
    containerModal:{
        flex: 1,
        backgroundColor: theme.colors.two,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        flex: 1,
        width: '100%',
    },
    header:{
        paddingLeft: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 60,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.three,
    },
    input:{
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        gap: 10,
        flexDirection: 'row',
    },
    inputs:{
        borderColor: theme.colors.three,
        borderWidth: 2,
        width: '90%',
        height: 60,
        paddingLeft: 16,
        borderRadius: 8,
        fontFamily: theme.fonts.regular,
        color: theme.colors.white,
    },
    image:{
        width: '100%',
        height: '98%',
    }
})

