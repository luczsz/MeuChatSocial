import React, {useState, useContext} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { AuthContext } from '../../../context/auth';

import Logo from '../../../assets/logo.png';
import { theme } from '../../../global/theme';

export default function SignIn() {

  const navigation = useNavigation();
  const { signIn, loading, autenticar } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

    function logarUser(){
        signIn(email, senha);
        //autenticar(email, senha);
    }

 return (
   <View style={styles.container} >
        <View style={styles.content} >
          <Image source={Logo} style={styles.logo} /> 
          <TextInput 
            placeholder='Email'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
            autoCapitalize='none'
            value={email}
            onChangeText={ (text) => setEmail(text)}
          />
          <TextInput 
            placeholder='Senha'
            placeholderTextColor={theme.colors.white}
            style={styles.input} 
            autoCapitalize='none'
            value={senha}
            secureTextEntry={true}
            onChangeText={ (text) => setSenha(text)}
          />
        </View>

        <View style={styles.button} >
            <TouchableOpacity style={styles.next}  onPress={() => logarUser()} >
                {loading ?
                  <ActivityIndicator size={'large'} color={theme.colors.white} />
                  :
                  <Text style={styles.nextText} >Entre</Text>     
                }
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
                <Text style={{ color: theme.colors.white, fontFamily: theme.fonts.regular }} >Ainda não tem uma conta?</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={ () => navigation.navigate('Cadastro')} >
                <Text style={{ fontSize: 16, color: theme.colors.three, fontFamily: theme.fonts.bold }} >CADASTRE-SE</Text>
              </TouchableOpacity>
            </View>
        </View>

   </View>
  );
}
