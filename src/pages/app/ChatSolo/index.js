import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    useContext
  } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './style';
import { Feather, AntDesign } from '@expo/vector-icons';
import { theme } from '../../../global/theme';
import { getUnixTime } from 'date-fns';
import { AuthContext } from '../../../context/auth';

import { GiftedChat, Bubble, Send, Actions } from 'react-native-gifted-chat';

//Base de dados
import { auth, stone, database, storage } from '../../../services/firebaseConnectio';
import { collection, query, onSnapshot, orderBy, getFirestore, addDoc } from 'firebase/firestore';
import { ref, onValue, set } from 'firebase/database';




export default function ChatSolo() {

    const route = useRoute();
    const navigation = useNavigation();
    const { nome, image, id, username } = route.params;

    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [images, setImages] = useState(null);
    const [ids, setIds] = useState(0);

    const [messageImage, setMessageImage] = useState('');
    const [load, setLoad] = useState(false);

    //Criar Id de chatSolo
    function sendMessage(){

        const dataRef = ref(database, `chatPrivate/${user.id}/${id}`);

        let data = {
            id: id,
            username: nome,
            image: image,
        };

        set(dataRef, data)
        .then( () => {
            console.log('true');
        })
        .catch( (error) => {
            console.log('error:' + error);
        })
    };

    //Enviando mensagem para o firestone
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        const firestore = getFirestore();
  
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user, image } = messages[0];    
        addDoc(collection(firestore, id), {
          _id,
          createdAt,
          text,
          user,
        });
    }, []); 

      //Analisar mensagens antigas
      useLayoutEffect(() => {
        const firestore = getFirestore();
  
        const collectionRef = collection(firestore, id);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
        const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              image: doc.data().image,
            }))
          );
        });
    return unsubscribe;
      }, []);

 return (
   <View style={styles.container} >
        <View style={styles.header} >
            
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            
            <Text style={styles.title} > {nome === '' ? nome : username} </Text>        
            
            <Image source={{ uri: image }} style={styles.logo} />

        </View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={true}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: theme.colors.one,
            }}
            textInputStyle={{
                fontFamily: theme.fonts.regular,
                color: theme.colors.three,
            }}
            user={{
                _id: user.email,
                avatar: user.url,
                nome: user.nome,
                email: user.email,
                keyUser: user.id,
            }}
        />
        
   </View>
  );
}
