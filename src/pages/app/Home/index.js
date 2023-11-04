import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { chats } from '../../../components/list';
import ListChatUnity from '../../../components/ListChatUnity';

export default function Home() {

    const addImage = 'https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4';
    const navigation = useNavigation();

 return (
   <View style={styles.container} >
        <View style={styles.header}>
            <View style={styles.headerContainer} >
             
                <TouchableOpacity>
                    <Feather name='user' size={30} color={theme.colors.one} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Feather name='bell' size={30} color={theme.colors.one} />
                </TouchableOpacity>

            </View>
        </View>
        <Image source={{uri: addImage}} style={styles.logo} />
        <View style={styles.content} >
            <TouchableOpacity style={styles.comunity} activeOpacity={0.7} onPress={ () => navigation.navigate('Comunidade')} >
                <Feather name='command' size={30} color={theme.colors.white} />
                <Text style={styles.title} >Comunidade</Text>
            </TouchableOpacity>
            <View style={{ width: '90%', marginTop: 10, marginBottom: 10, padding: 10, }} >
                <Text style={styles.title} >
                    Meus Chats
                </Text>
            </View>
            <View style={{width: '100%', flex: 1, padding: 12,}} >
                <FlatList
                    data={chats}
                    keyExtractor={ (item) => item.id}
                    renderItem={ ({item}) => <ListChatUnity data={item} /> }
                />
            </View>
        </View>
   </View>
  );
}
