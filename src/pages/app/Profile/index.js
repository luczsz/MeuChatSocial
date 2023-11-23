import React, {useState, useContext, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

//base de dados
import { ref, onValue, child, set } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';
import { getIdTokenResult } from 'firebase/auth';


export default function Profile() {

    const addImage = 'https://image.lexica.art/full_jpg/19f280a2-2b97-4be2-b782-1fd5c70b84f4';
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const { username, image, email, keyUser } = route.params;

    const [dados, setDados] = useState([]);
    const [state, setState] = useState(null);
    const [envio, setEnvio] = useState(null);
    const [enviado, setEnviado] = useState(false);
    const [id, setId] = useState(0);

    useEffect( () => {
        async function loadDados(){
            const dataRef = ref(database, `Request/${user.id}`);
    
            onValue(dataRef, (snap) => {
              setDados([]);
    
              snap.forEach( (childItem) => {
                
                const dados = childItem.val();
      
                // Obtém o ID do item atual
                const itemId = dados.id;
                const itemKey = childItem.key;

                // Verifica se o ID é igual à chave do item
                if (itemId === type) {
                   console.log('id correto');
                   setState('1');
                   setEnviado(true);
                } else {
                    //console.log(`Seu itemId é: ${itemId} e seu type é: ${type} e usa key é: ${itemKey} você é ${user.id}`);
                    setState(null);
                    setEnviado(false);
                }    
            })
            })
        };

        function generationID(){
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let newRandomId = '';
    
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                newRandomId += chars.charAt(randomIndex);
              }
          
              setId(newRandomId);
        };

    
          loadDados();
          generationID();
    
    },[]);

    /* 
        keyUser - é o ID do usuario que vai receber o request
        id - é o ID do ROOM ID (por mais estatico que seja ele se torna fixo a partir do momento do request).


    */

    //Solicitação de amizade
    async function sendMensage() {
    
        const dataRef = ref(database, `Request/${keyUser}/${id}`);
    
        let data = {
            id: user.id,
            username: user.nome,
            image: user.url, 
        };
    
        set(dataRef, data)
        .then( () => {
            setEnviado(true);
        })
        .catch( (error) => {
            alert('Deu erro' + error);
        })
  
    };

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
        <Text style={styles.subTitle} > {email} </Text>
        <Text style={styles.subTitle} > {keyUser} </Text>
        <Text style={styles.subTitle} > {id} </Text>
        <Text style={styles.subTitle} > {user.id} </Text>
        
      
        <View style={styles.content} >

            <TouchableOpacity style={styles.comunityRequest} activeOpacity={0.7} onPress={ () => sendMensage()} >
                <Feather name='coffee' size={30} color={theme.colors.white} />
                <Text style={styles.title} numberOfLines={1} > Solicitação enviada </Text>
            </TouchableOpacity>

        </View>
   </View>
  );
}
