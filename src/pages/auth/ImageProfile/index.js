import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

export default function ImageProfile() {

  const navigation = useNavigation();
  const addImage = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png';

 return (
   <View style={styles.container} >
        <View style={styles.header} >
          <TouchableOpacity onPress={ () => navigation.goBack()} >
           <Feather name='arrow-left' size={30} color={theme.colors.three} />
          </TouchableOpacity>
        </View>
        <View style={styles.content} >
          <TouchableOpacity>
            <Image source={{uri: addImage}} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.button} >
          
            <TouchableOpacity style={styles.next} onPress={ () => navigation.navigate('Profile')} >
              <Text style={styles.nextText} >Cadastrar</Text>
            </TouchableOpacity>
      
        </View>
   </View>
  );
}
