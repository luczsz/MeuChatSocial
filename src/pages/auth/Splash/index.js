import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import Logo from '../../../assets/logo.png';

export default function Splash() {

  const navigation = useNavigation();


 return (
    <View style={styles.container} >

      <View style={styles.content} >
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title} >Meu Chat</Text>
      </View>

      <View style={styles.button} >
        <TouchableOpacity style={styles.next} activeOpacity={0.7} onPress={ () => navigation.navigate('Login')} >
          <Text style={styles.nextText} >Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
