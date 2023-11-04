import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';



export default function Profile() {

    const addImage = 'https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4';
    const navigation = useNavigation();
    const route = useRoute();
    const { username, image } = route.params;

 return (
   <View style={styles.container} >
        <View style={styles.header}>
            <View style={styles.headerContainer} >
             
                <TouchableOpacity onPress={ () => navigation.goBack()} >
                    <Feather name='arrow-left' size={30} color={theme.colors.one} />
                </TouchableOpacity>

            </View>
        </View>
        <Image source={{uri: image}} style={styles.logo} />
        <Text style={styles.title} > {username} </Text>
        <Text style={styles.subTitle} >email@email.com</Text>
      
        <View style={styles.content} >
            <TouchableOpacity style={styles.comunity} activeOpacity={0.7} onPress={ () => navigation.navigate('Friends')} >
                <Feather name='user-plus' size={30} color={theme.colors.white} />
                <Text style={styles.title} >Adicionar como amigo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chat} activeOpacity={0.7} onPress={ () => navigation.navigate('Friends')} >
                <Feather name='message-square' size={30} color={theme.colors.white} />
            </TouchableOpacity>
        </View>
   </View>
  );
}
