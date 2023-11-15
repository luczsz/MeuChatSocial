import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext
} from 'react'; 
import { TouchableOpacity, Text, View, Modal, TextInput, Image } from 'react-native';
import { GiftedChat, Bubble, Send, Actions } from 'react-native-gifted-chat';
import { auth, stone, database, storage } from '../../../services/firebaseConnectio';
import { collection, query, onSnapshot, orderBy, getFirestore, addDoc } from 'firebase/firestore';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../context/auth';
import { theme } from '../../../global/theme';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';

export default function Chats() {

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(0);

    //Enviar mensagem para o firestone     
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      const firestore = getFirestore();

      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user, image } = messages[0];    
      addDoc(collection(firestore, 'chats'), {
        _id,
        createdAt,
        text,
        user,
      });
    }, []);

    //Analisar mensagens antigas
    useLayoutEffect(() => {
      const firestore = getFirestore();

      const collectionRef = collection(firestore, 'chats');
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

    //Customizar o botão de enviar
    const CustomSendButton = (props) => {
      return (
        <Send 
          {...props}
          containerStyle={{justifyContent: 'center', right: 2}}
        >
          <TouchableOpacity style={{ marginRight: 10, marginBottom: 5 }}>
            <AntDesign name="arrowup"  size={24} color={theme.colors.three} />
          </TouchableOpacity>
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

     //Customizar as Actions 
     const CurstomAction = (props) =>{
      return(
        <Actions
          {...props}
          containerStyle={{ justifyContent: 'center', right: 2, }}
          options={{
            'Escolher Imagem': () => alert('Imagem choice'), // Função para lidar com a escolha de imagens
            'Adicionar um áudio': () => alert('Áudio chat'), // Função para lidar com a escolha de audios
          }}
          icon={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name='paperclip' size={20} color={theme.colors.three} />
            </View>
          )}
        />
      )
    };
    



 return (
  <View style={{ backgroundColor: theme.colors.one,  flex: 1,}} >
    <View style={styles.header} >
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            <Text style={styles.title} >Comunidade</Text>          
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
      }}
      renderBubble={props => <CustomBubble {...props} />}
      renderSend={props => <CustomSendButton {...props} />}
      renderActions={ props => <CurstomAction {...props} />}
      placeholder='Digite sua mensagem...'
    />

  </View>
  );
}
