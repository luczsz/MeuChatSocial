import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { theme } from '../../../global/theme';

export default function SignUp() {

  const navigation = useNavigation();

 return (
   <View style={styles.container} >
        <View style={styles.header} >
          <TouchableOpacity onPress={ () => navigation.goBack()} >
            <Feather name='arrow-left' size={30} color={theme.colors.three} />
          </TouchableOpacity>
        </View>
        <View style={styles.content} >
          <TextInput 
            placeholder='Nome'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
          />
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
            <TouchableOpacity style={styles.next} onPress={ () => navigation.navigate('Profile')} >
              <Text style={styles.nextText} >Prosseguir</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
                <Text style={{ color: theme.colors.white, fontFamily: theme.fonts.regular }} >Já tem uma conta?</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={ () => navigation.navigate('Login')} >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.three, fontFamily: theme.fonts.bold }} >ENTRE!</Text>
              </TouchableOpacity>
            </View>
        </View>
   </View>
  );
}
