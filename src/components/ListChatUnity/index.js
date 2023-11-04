import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export default function ListChatUnity({data}) {
 return (
   <TouchableOpacity activeOpacity={0.8} style={styles.container} >
        <Image source={{uri: data.image }} style={styles.logo} />
        <Text style={styles.title}> {data.username} </Text>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
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
    }
})
