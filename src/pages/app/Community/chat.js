import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext
} from 'react'; 
import { TouchableOpacity, Text, View, Modal, TextInput, Image, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, Send, Actions } from 'react-native-gifted-chat';
import { auth, stone, database, storage } from '../../../services/firebaseConnectio';
import { collection, query, onSnapshot, orderBy, getFirestore, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../../context/auth';
import { theme } from '../../../global/theme';
import { useNavigation } from '@react-navigation/native';
import { getUnixTime } from 'date-fns';

import { styles, styling } from './style';

export default function Chats() {

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(0);

    const [messageImage, setMessageImage] = useState('');
    const [load, setLoad] = useState(false);

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

     //Customizar as Actions 
     const CurstomAction = (props) =>{
      return(
        <Actions
          {...props}
          containerStyle={{ justifyContent: 'center', right: 2, }}
          options={{
            'Escolher Imagem': () => {chooiceImage(), generationID()}, // Função para lidar com a escolha de imagens
            'Adicionar um áudio': () => alert('Suspeso, em desenvolvimento'), // Função para lidar com a escolha de audios
          }}
          icon={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name='paperclip' size={20} color={theme.colors.three} />
            </View>
          )}
        />
      )
    };

     //Gerar id aleatorio
     function generationID(){
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let newRandomId = '';

      for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          newRandomId += chars.charAt(randomIndex);
        }
    
        setId(newRandomId);
     };

    // Função para chamar a camera
    async function chooiceImage() {
      try {
      let results = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
      });
  
      if (!results.canceled && results.assets && results.assets.length > 0) {
          const uri = results.assets[0].uri;
          setOpen(true);
          setImage(uri);

      } else {
          console.log('Seleção de imagem cancelada ou sem assets.');
      }
      } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      }
    };

     // Função para enviar a imagem 
    const uploadImageToFirebaseStorage = async (uri) => {
      setLoad(true);
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const storagePath = `chatComunidade/${id}`;
      const imageRef = storageRef(storage, storagePath);
  
      try {
          const uploadTask = uploadBytesResumable(imageRef, blob);
  
          uploadTask.on('state_changed',
          (snapshot) => {
              // Handle progress, if needed
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(`${progress}%`);
          },
          (error) => {
              // Handle unsuccessful uploads
              console.error('Error uploading image: ', error);
          },
          () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setImageUri(downloadURL);
              sendImageLink(downloadURL);
              // Do something with the download URL, like saving it to the database
              });
          }
          );
      } catch (error) {
          console.error('Error uploading image: ', error);
      }
    };

    //Enviar as imagem para o firestone
    const sendImageLink = useCallback((imageLink) => {
      const firestone = getFirestore();
      const newMessage = {
        _id: getUnixTime(new Date()), // Cria um ID único baseado no timestamp Unix
        createdAt: new Date(), // Define a data de criação como o momento atual
        text: messageImage, // Deixa o texto vazio, pois é uma imagem
        user: {
          _id: user.email, // ID único do usuário (pode ser qualquer valor único para sua aplicação)
          avatar: user.url, // URL do avatar do usuário
        },
        image: imageLink, // Adiciona o link da imagem à mensagem
      };
    
      // Atualiza as mensagens no estado local
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage])
      );
    
      // Adiciona a nova mensagem ao banco de dados
      addDoc(collection(firestone, 'chats'), newMessage);
      setOpen(false);
      setLoad(false);
    }, [setMessages]); // Certifica-se de incluir todas as dependências necessárias

    const handleAvatarPress = (user) => {
      let list = {
        username: user.nome,
        id: user.keyUser,
        image: user.avatar,
        email: user.email,

      }
      console.log(user);
      navigation.navigate('Perfil', list);
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
        nome: user.nome,
        email: user.email,
        keyUser: user.id,
      }}
      renderBubble={props => <CustomBubble {...props} />}
      renderSend={props => <CustomSendButton {...props} />}
      renderActions={ props => <CurstomAction {...props} />}
      placeholder='Digite sua mensagem...'
      onPressAvatar={handleAvatarPress} // A função que será chamada ao pressionar o avatar
 
    />

    <Modal
      visible={open}
      animationType='slide'
      onRequestClose={ () => setOpen(false)}
    >
      <View style={styling.containerModal} >
         
          <View style={styling.header} >
            <TouchableOpacity  onPress={ () => setOpen(false)  }  >
              <Feather name='x' size={25} color={theme.colors.three} />
            </TouchableOpacity>
          </View>
          
          <View style={styling.content} >
            <Text> {messageImage} </Text>
            <Image style={styling.image} source={{ uri: image }} />

          </View>
          
          <View style={styling.input} >
            <TextInput 
              placeholder='Digite sua mensagem aqui'
              style={styling.inputs}
              placeholderTextColor={'white'}
              autoCorrect={false}
              autoCapitalize='none'
              value={messageImage}
              onChangeText={ (text) => setMessageImage(text)}
            />
            <TouchableOpacity onPress={ () => uploadImageToFirebaseStorage(image) } style={{backgroundColor: theme.colors.one, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 12,}} >

                {load ? 
                  <ActivityIndicator size={'large'} color={theme.colors.three} />
                  :
                  <Feather name='send' size={25} color={theme.colors.three}  />
                }
              
            </TouchableOpacity>

          </View>

      </View>
    </Modal>

  </View>
  );
}
