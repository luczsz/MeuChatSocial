import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../context/auth';
import { useNavigation } from '@react-navigation/native';

import { styles, styled } from './style';
import { amigos } from '../../../components/list';
import ListFriends from '../../../components/ListFriends';
import { Ionicons } from '@expo/vector-icons';

//base de dados
import { ref, onValue, child, set } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';
import { theme } from '../../../global/theme';

export default function Friends() {

    const { user } = useContext(AuthContext);
    const [dados, setDados] = useState([]);
    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(''); 
    const [image, setImage] = useState(''); 
    const [nome, setNome] = useState(''); 
    const [keyUser, setKeyUser] = useState(''); 


    useEffect( () => {
      async function loadDados(){
          const dataRef = ref(database, `amigos/${user.id}`);

          onValue(dataRef, (snap) => {
            setDados([]);

            snap.forEach( (childItem) => {
              
              const dados = childItem.val();
              
              let list = {
                key: childItem.key,
                id: dados.id,
                nome: dados.username,
                url: dados.image,
              };

              setDados( oldArray => [...oldArray, list]);
              console.log(list);
            })
          })
        };

        loadDados();

    },[]);

    //Função para abrir o modal e criar um chat
    function openState(data){
      setOpen(true);
      setId(data.id);
      setNome(data.nome);
      setImage(data.url);
      setKeyUser(data.key);
    };

    function insertDate(){
        const dataRef = ref(database, `chatPrivate/${user.id}/${id}`);

        let data = {
          id: id,
          nome: nome,
          url: image,
        };

        set(dataRef, data)
        .then( () => {
          
          const privateRf = ref(database, `chatPrivate/${keyUser}/${id}`);

          let list = {
            id: user.id,
            nome: user.nome,
            url: user.url
          };

          set(privateRf, list)
          .then( () => {
            setOpen(false);
            navigation.navigate('Inicio');
          })
          .catch( (error) => {
            console.log('Error');
          })


        })
        .catch( (error) => {
          console.log('Deu erro ' + error)
        })
    }

 return (
   <View style={styles.container} >
        <View style={styles.content} >
          <FlatList
            data={dados}
            keyExtractor={ (item) => item.id}
            renderItem={ ({item}) => <ListFriends data={item} handleOpen={openState} />  }
            ListEmptyComponent={ <Text style={{color: 'white'}} > Você ainda não tem amigos salvos em sua lista</Text>}
          />
        </View>

        <Modal
          transparent={true}
          visible={open}
          animationType='fade'
          onRequestClose={ () => setOpen(false)}
        >
            <View style={styled.modalContainer} >
              <View style={styled.card} >
                <Text style={styled.title}>
                  O que deseja fazer ?
                </Text>
                
                <TouchableOpacity style={styled.openChat} activeOpacity={0.8} onPress={ () => insertDate()} >
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.colors.white} />
                  <Text style={styled.openText} >ABRIR O CHAT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styled.closeChat} activeOpacity={0.9} onPress={ () => setOpen(false)} >
                  <Ionicons name="close-circle-outline" size={24} color={theme.colors.white} />
                  <Text style={styled.openText} >FECHAR</Text>
                </TouchableOpacity>

              </View>
            </View>
        </Modal>
   </View>
  );
}
