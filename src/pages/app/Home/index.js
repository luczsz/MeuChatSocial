import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { chats } from '../../../components/list';
import ListChatUnity from '../../../components/ListChatUnity';

//base de dados
import { ref, onValue, child } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';

export default function Home() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext)
    const addImage = user.url;
    
    const [dados, setDados] = useState([]);

    function redirect(data){
        navigation.navigate('Chat', data);
    };

    useEffect( () => {
        async function loadDados(){
            const dataRef = ref(database, `chatPrivate/${user.id}`);
    
            onValue(dataRef, (snap) => {
              setDados([]);
    
              snap.forEach( (childItem) => {
                
                const dados = childItem.val();
                
                let list = {
                  key: childItem.key,
                  username: dados.username,
                  image: dados.image,
                  id: dados.id,
                };
    
                setDados( oldArray => [...oldArray, list]);
                console.log(list);
              })
            })
          };
    
          loadDados();
    
    },[]);



 return (
   <View style={styles.container} >
        <View style={styles.header}>
            <View style={styles.headerContainer} >
             
                <TouchableOpacity onPress={ () => navigation.navigate('Conta')} >
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
                    data={dados}
                    keyExtractor={ (item) => item.id}
                    renderItem={ ({item}) => <ListChatUnity data={item} chat={redirect} /> }
                    ListEmptyComponent={ <Text style={{color: 'white'}} > Você ainda não tem chats</Text>}
                />
            </View>
        </View>
   </View>
  );
}
