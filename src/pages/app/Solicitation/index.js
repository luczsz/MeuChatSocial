import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { solicitações } from '../../../components/list';
import ListSolicitation  from '../../../components/ListSolicitation';

//base de dados
import { ref, onValue, set } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';


export default function Solicitation() {

  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState([]);


  useEffect( () => {
    async function loadDados(){
        const dataRef = ref(database, `Request/${user.id}`);

        onValue(dataRef, (snap) => {
          setDados([]);

          snap.forEach( (childItem) => {
            
            const dados = childItem.val();
            
            let list = {
              id: childItem.key,
              type: dados.id,
              nome: dados.username,
              url: dados.image,
            };

            setDados( oldArray => [...oldArray, list]);
            //console.log(list);
          })
        })
      };

      loadDados();

},[]);

//Função para adicionar o amigo
async function addFriend(date) {
  
  
  const dataRef = ref(database, `amigos/${user.id}/${date.type}`);

    let list = {
        id: date.id,
        username: date.nome,
        image: date.url, 
    };

    set(dataRef, list)
    .then( () => {

     console.log(date.type + user.id);

     const frindRf = ref(database, `amigos/${date.type}/${user.id}`);

     let lists = {
       id: date.id,
       username: user.nome,
       image: user.url,
     };

     set(frindRf, lists)
     .then( () => {
       console.log('Adicionado B');
     })
     .catch( (error) => {
       console.log('Deu error: ' + error);
     })

    })
    .catch( (error) => {
        console.log('Deu erro' + error);
    });

};

//Função para apagar o amigo da lista de solicitações

 return (
   <View style={styles.container} >
        <View style={styles.content} >
        <FlatList
          data={dados}
          keyExtractor={ (item) => item.key}
          renderItem={ ({item}) => <ListSolicitation data={item} add={addFriend}/> }
          ListEmptyComponent={ <Text style={{color: 'white'}} > Você ainda não tem solicitações de amizade</Text>}
        />
        </View>
   </View>
  );
}
