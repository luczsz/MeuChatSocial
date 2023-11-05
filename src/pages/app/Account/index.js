import React, {useContext} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { chats } from '../../../components/list';
import ListChatUnity from '../../../components/ListChatUnity';

export default function Account() {

    const addImage = 'https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4';
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);

 return (
   <View style={styles.container} >
        <View style={styles.header}>
            <View style={styles.headerContainer} >
             
                <TouchableOpacity onPress={ () => navigation.goBack()} >
                    <Feather name='arrow-left' size={30} color={theme.colors.one} />
                </TouchableOpacity>

            </View>
        </View>
        <Image source={{uri: addImage}} style={styles.logo} />
        <Text style={styles.title} >Lucas Souz</Text>
        <Text style={styles.subTitle} >email@email.com</Text>
        <View style={styles.content} >
            <TouchableOpacity style={styles.comunity} activeOpacity={0.7} onPress={ () => navigation.navigate('Friends')} >
                <Feather name='users' size={30} color={theme.colors.white} />
                <Text style={styles.title} >Amigos</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.button} >
            <TouchableOpacity onPress={ () => signOut()} >
                <Text style={styles.lgOut} >SAIR</Text>
            </TouchableOpacity>
        </View>
   </View>
  );
}
