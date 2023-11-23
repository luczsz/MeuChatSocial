import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { amigos } from '../../../components/list';
import ListFriends from '../../../components/ListFriends';

//base de dados
import { ref, onValue, child } from 'firebase/database';
import { auth, database, } from '../../../services/firebaseConnectio';

export default function Friends() {

    const { user } = useContext(AuthContext);
    const [dados, setDados] = useState([]);


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

 return (
   <View style={styles.container} >
        <View style={styles.content} >
          <FlatList
            data={dados}
            keyExtractor={ (item) => item.id}
            renderItem={ ({item}) => <ListFriends data={item}/> }
            ListEmptyComponent={ <Text style={{color: 'white'}} > Você ainda não tem amigos salvos em sua lista</Text>}
          />
        </View>
   </View>
  );
}
