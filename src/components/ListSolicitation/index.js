import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';
import { Feather } from '@expo/vector-icons';

export default function ListSolicitation({data}) {
 return (
   <TouchableOpacity activeOpacity={0.8} style={styles.container} >
        <Image source={{uri: data.url }} style={styles.logo} />
        <Text style={styles.title} numberOfLines={1} > {data.nome} </Text>

        <View style={{ gap: 10, flexDirection: 'row'}} >
            <TouchableOpacity style={styles.chat} >
                <Feather name='check' size={20} color={theme.colors.white} />  
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.delete} >
                <Feather name='x-square' size={20} color={theme.colors.white} />  
            </TouchableOpacity>
        </View>

   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        marginBottom: 5,
        borderBottomColor: theme.colors.three,
        borderBottomWidth: 2,
    },
    logo:{
        width: 60,
        height: 60,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: theme.colors.three,
    },
    title:{
        fontSize: 22,
        fontFamily: theme.fonts.bold,
        color: theme.colors.white,
    },

    chat:{
        width: 40,
        height: 40,
        backgroundColor: theme.colors.three,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    delete:{
        width: 40,
        height: 40,
        backgroundColor: theme.colors.alert,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }
})
