import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import { theme } from '../../../global/theme';

export default function SignUp() {

  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function redirect(){
        let data ={
            nome: nome,
            email: email,
            senha: senha,
        };
        navigation.navigate('Profile', data);
  };

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
            autoCorrect={false}
            autoCapitalize='none'
            value={nome}
            onChangeText={ (text) => setNome(text)}
          />
          <TextInput 
            placeholder='Email'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
            autoCorrect={false}
            autoCapitalize='none'
            value={email}
            onChangeText={ (text) => setEmail(text)}
          />
          <TextInput 
            placeholder='Senha'
            placeholderTextColor={theme.colors.white}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            value={senha}
            secureTextEntry={true}
            onChangeText={ (text) => setSenha(text)} 
          />
        </View>

        <View style={styles.button} >

            {email === '' ?
              <TouchableOpacity style={styles.desative} onPress={ () => alert('Dados Vazios')} >
                <Text style={styles.desativeText} >Prosseguir</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.next} onPress={ () => redirect()} >
                <Text style={styles.nextText} >Prosseguir</Text>
              </TouchableOpacity>
            }

            
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
