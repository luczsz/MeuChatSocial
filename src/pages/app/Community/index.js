import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { conversas } from '../../../components/list';
import MensageSend from '../../../components/MensageSend';


export default function Community() {

    const navigation = useNavigation();

 return (
   <View style={styles.container} >
        <View style={styles.header} >
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            <Text style={styles.title} >Comunidade</Text>        
        </View>
        <View style={styles.content} >
            <FlatList
                data={conversas}
                keyExtractor={ (item) => item.id}
                renderItem={({item}) => <MensageSend data={item} /> }
            />     

        </View>
        <View style={styles.button} >
           <TextInput
                placeholder='Digite sua mensagem'
                placeholderTextColor={theme.colors.white}
                style={styles.input}
           />        
           <TouchableOpacity style={styles.submit} >
            <Feather name='send' size={22} color={theme.colors.white} />
           </TouchableOpacity>
            
        </View>
   </View>
  );
}
