import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';

import { styles, styled } from './style';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { conversas } from '../../../components/list';
import MensageSend from '../../../components/MensageSend';

//base de dados
import {ref , set, getDatabase, onValue, child  } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';


export default function Community() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [dados, setDados] = useState([]);
    
    const [id, setId] = useState(null);
    const [type, setType] = useState(null);
    const [username, setUsername] = useState(null);
    const [image, setImage] = useState(null);
    const [mensagem, setMensagem] = useState(null);
    const [mensageImage, setMensageImage] = useState(null);

    const [open, setOpen] = useState(false);
    const [assets, setAssets] = useState(false);
    
    useEffect( () => {
        async function loadDados(){
            const dataRef = ref(database, `chatComunidade/`);
    
            onValue(dataRef, (snap) => {
              setDados([]);
    
              snap.forEach( (childItem) => {
                
                const dados = childItem.val();
                
                let list = {
                    id: dados.key,
                    type: dados.type,
                    username: dados.username,
                    image: dados.image,
                    mensage: dados.mensage,
                    mensageImage: dados.mensageImage,
                };
    
                setDados( oldArray => [...oldArray, list]);
                //console.log(list);
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
    
    //Adicionar mensagem
    async function sendMensage() {
    
        const dataRef = ref(database, `chatComunidade/${id}`);
    
        let data = {
            id: id,
            type: user.id, //uri do user !== uri do enviado
            username: user.nome,
            image: user.url, 
            mensage: mensagem,
            mensageImage: mensageImage || 'null',
        };
    
        set(dataRef, data)
        .then( () => {
            setMensagem('');
        })
        .catch( (error) => {
            alert('Deu erro' + error);
        })
  
    };

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
                data={dados}
                keyExtractor={ (item) => item.id}
                renderItem={({item}) => <MensageSend data={item} /> }
                ListEmptyComponent={ <Text style={{color: 'white'}} > Sem novas mensagens na comunidade</Text>}
            />     

        </View>
        <View style={styles.button} >
           <TextInput
                placeholder='Digite sua mensagem'
                placeholderTextColor={theme.colors.white}
                style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                value={mensagem}
                onChangeText={ (text) => {setMensagem(text), setAssets(true)}}
           />        

            {assets ?
                <></>
                :
                <TouchableOpacity style={styles.submit} onPress={ () => setOpen(true)} >
                    <Feather name='paperclip' size={22} color={theme.colors.white} />
                </TouchableOpacity>
            }

           <TouchableOpacity style={styles.submit} onPress={ () => sendMensage()} >
            <Feather name='send' size={22} color={theme.colors.white} />
           </TouchableOpacity>
            
        </View>


        <Modal 
            visible={open}
            onRequestClose={ () => setOpen(false)}
            animationType='fade'
            transparent={true}
        >
            <View style={styled.containerModal} >
                <View style={styled.card} >
                   <TouchableOpacity activeOpacity={0.7} onPress={ () => setOpen(false)} >
                        <Feather name='x' size={30} color={theme.colors.three} />
                   </TouchableOpacity>
                   
                   <TouchableOpacity style={styled.menuItem} activeOpacity={0.7} >
                        <Feather name='camera' size={30} color={theme.colors.white} />
                        <Text style={styled.menuItemText} >Adicionar uma foto</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styled.menuItem} activeOpacity={0.7} >
                        <FontAwesome name='microphone' size={30} color={theme.colors.white} />
                        <Text style={styled.menuItemText} >Adicionar uma foto</Text>
                   </TouchableOpacity>
                </View>
            </View>
        </Modal>

   </View>
  );
}
