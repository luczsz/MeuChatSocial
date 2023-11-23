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

import chatImage from '../../../assets/chats.png';

export default function ChatSolo() {

    const route = useRoute();
    const navigation = useNavigation();
    const { username, image, id } = route.params;
    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [images, setImages] = useState(null);
    const [ids, setIds] = useState(0);

    const [messageImage, setMessageImage] = useState('');
    const [load, setLoad] = useState(false);
    const [door, setDoor] = useState(false);

 
    //Analisar mensagens antigas
      useLayoutEffect(() => {
      const firestore = getFirestore();
    
      const collectionRef = collection(firestore, id);
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
    
      const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsubscribe');
        setMessages(
          querySnapshot.docs.map(doc => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
            image: doc.data().image,
          }))
        );
      });
    
      return () => {
        console.log('Cleaning up listener');
        unsubscribe();
      };
      }, []);

   //Enviar mensagem para o firestone     
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

    //Customizar o botão de enviar
      const CustomSendButton = (props) => {
      return (
        <Send 
          {...props}
          containerStyle={{ width: 60, height: 50, alignItems:'center',  justifyContent: 'center',}}
        >
          <View style={{ backgroundColor: theme.colors.three, padding: 10, borderRadius: 12,}}>
            <AntDesign name="arrowup"  size={24} color={theme.colors.white} />
          </View>
        </Send>
      );
      };

    //Customizar as bolhas de chat
      const CustomBubble = (props) => {
      return (
        <Bubble
          {...props}
          timeTextStyle={{
            right: { color: 'white' },
            left: { color: 'white' }
          }}
          textStyle={{
            right: { color: 'white', fontFamily: theme.fonts.regular },
            left: { color: 'white', fontFamily: theme.fonts.regular }
          }}
          wrapperStyle={{
            right: {
              backgroundColor: theme.colors.three, // Cor da bubble para mensagens enviadas pelo usuário
              
            },
            left: {
              backgroundColor: theme.colors.two, // Cor da bubble para mensagens recebidas
            },
          }}
        />
      );
      };


 return (
   <View style={styles.container} >
        <View style={styles.header} >
            
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            
            <Text style={styles.title} > {username} </Text>        
            
            <Image source={{ uri: image }} style={styles.logo} />

        </View>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
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
          renderBubble={props => <CustomBubble {...props} />}
          renderSend={props => <CustomSendButton {...props} />}
          //renderActions={ props => <CurstomAction {...props} />}
          placeholder='Digite sua mensagem...'
          //onPressAvatar={handleAvatarPress} // A função que será chamada ao pressionar o avatar
        />

   </View>
  );
}
