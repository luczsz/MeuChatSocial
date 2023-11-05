import React, {useState, useEffect, useContext} from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { solicitações } from '../../../components/list';
import ListSolicitation  from '../../../components/ListSolicitation';

//base de dados
import { ref, onValue, child } from 'firebase/database';
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
              key: childItem.key,
              nome: dados.nome,
              url: dados.url,
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
          renderItem={ ({item}) => <ListChatUnity data={item} chat={redirect} /> }
          ListEmptyComponent={ <Text style={{color: 'white'}} > Sem dados na lista</Text>}
        />
        </View>
   </View>
  );
}
