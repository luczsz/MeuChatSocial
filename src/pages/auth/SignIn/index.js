import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';

import Logo from '../../../assets/logo.png';
import { theme } from '../../../global/theme';

export default function SignIn() {

  const navigation = useNavigation();


 return (
   <View style={styles.container} >
        <View style={styles.content} >
          <Image source={Logo} style={styles.logo} /> 
          <TextInput 
            placeholder='Email'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
          />
          <TextInput 
            placeholder='Senha'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
          />
        </View>

        <View style={styles.button} >
            <TouchableOpacity style={styles.next} >
              <Text style={styles.nextText} >Entre</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
                <Text style={{ color: theme.colors.white }} >Ainda não tem uma conta?</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={ () => navigation.navigate('Cadastro')} >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.three }} >CADASTRE-SE</Text>
              </TouchableOpacity>
            </View>
        </View>

   </View>
  );
}
