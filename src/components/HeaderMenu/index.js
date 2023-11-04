import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export default function HeaderMenu() {
 return (
   <View style={styles.container} >
        <Text style={styles.title} >Amigos</Text>
   </View>
  );
}


const styles = StyleSheet.create({
    container:{
        height: 60,
        width: '100%',
        justifyContent: 'center',
    },
    title:{
        fontSize: 22,
        fontFamily: theme.fonts.regular,
        color: theme.colors.three,
    }
})
