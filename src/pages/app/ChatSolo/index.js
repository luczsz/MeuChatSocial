import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { onlyChat } from '../../../components/list';
import MensageSolo from '../../../components/MensageSolo';

export default function ChatSolo() {

    const route = useRoute();
    const navigation = useNavigation();
    const { username } = route.params;
    console.log(username);

 return (
   <View style={styles.container} >
        <View style={styles.header} >
            
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            
            <Text style={styles.title} > {username} </Text>        
            
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='trash-2' size={30} color={theme.colors.three} />
            </TouchableOpacity>

        </View>
        <View style={styles.content} >
            <FlatList
                data={onlyChat}
                keyExtractor={ (item) => item.id}
                renderItem={({item}) => <MensageSolo data={item} /> }
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
