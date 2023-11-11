import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text, View, Modal, TextInput, Image } from 'react-native';
import { GiftedChat, Bubble, Send, Actions } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database, storage} from '../config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styleModal';
import { getUnixTime } from 'date-fns';


export default function Chat(){

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(0);

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


const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              marginRight: 10
            }}
            onPress={onSignOut}
          >
            <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
          </TouchableOpacity>
        )
      });
    }, [navigation]);

  useLayoutEffect(() => {

      const collectionRef = collection(database, 'chats');
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
    
    //Enviar mensagem para o firestone     
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      );
      // setMessages([...messages, ...messages]);
      const { _id, createdAt, text, user, image } = messages[0];    
      addDoc(collection(database, 'chats'), {
        _id,
        createdAt,
        text,
        user,
      });
    }, []);

    //Enviar as imagem como tests
    const sendImageLink = useCallback((imageLink) => {
      const newMessage = {
        _id: getUnixTime(new Date()), // Cria um ID único baseado no timestamp Unix
        createdAt: new Date(), // Define a data de criação como o momento atual
        text: '', // Deixa o texto vazio, pois é uma imagem
        user: {
          _id: auth?.currentUser?.email, // ID único do usuário (pode ser qualquer valor único para sua aplicação)
          avatar: 'https://i.pravatar.cc/300', // URL do avatar do usuário
        },
        image: imageLink, // Adiciona o link da imagem à mensagem
      };
    
      // Atualiza as mensagens no estado local
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage])
      );
    
      // Adiciona a nova mensagem ao banco de dados
      addDoc(collection(database, 'chats'), newMessage);
      setOpen(false);
    }, [setMessages]); // Certifica-se de incluir todas as dependências necessárias
    

    //Customizar as bolhas de chat
    const CustomBubble = (props) => {
      return (
        <Bubble
          {...props}
          timeTextStyle={{
            right: { color: 'white' },
            left: { color: 'black' }
          }}
          wrapperStyle={{
            right: {
              backgroundColor: '#4caf50', // Cor da bubble para mensagens enviadas pelo usuário
              
            },
            left: {
              backgroundColor: '#2196f3', // Cor da bubble para mensagens recebidas
            },
          }}
        />
      );
    };

    //Customizar o botão de enviar
    const CustomSendButton = (props) => {
      return (
        <Send 
          {...props}
          containerStyle={{justifyContent: 'center', right: 2}}
        >
          <TouchableOpacity style={{ marginRight: 10, marginBottom: 5 }}>
            <AntDesign name="arrowup" size={24} color="#007BFF" />
          </TouchableOpacity>
        </Send>
      );
    };

    //Customizar a imagem 
    const CurstomAction = (props) =>{
      return(
        <Actions
          {...props}
          containerStyle={{ justifyContent: 'center', right: 2, }}
          options={{
            'Escolher Imagem': () => {chooiceImage(), generationID()}, // Função para lidar com a escolha de imagens
            'Adicionar um áudio': () => addImage(), // Função para lidar com a escolha de audios
          }}
          icon={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name='paperclip' size={20} color={'#c4c4c4'} />
            </View>
          )}
        />
      )
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
          uploadImageToFirebaseStorage(uri);

      } else {
          console.log('Seleção de imagem cancelada ou sem assets.');
      }
      } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      }
    };

    // Função para enviar a imagem 
    const uploadImageToFirebaseStorage = async (uri) => {
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
  


    return (
      <>
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={true}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#e4e4e4',
          }}
          
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
          renderBubble={props => <CustomBubble {...props} />}
          renderSend={props => <CustomSendButton {...props} />}
          renderActions={ props => <CurstomAction {...props} />}
          placeholder='Digite sua mensagem...'
        />


        <Modal
          visible={open}
          animationType='slide'
          onRequestClose={ () => setOpen(false)}
        >
          <View style={styles.container}>
            <View style={styles.header} >
              <TouchableOpacity onPress={ () => setOpen(false)} >
                <AntDesign name='close' size={30} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={styles.content} >
               <Text> {progress} </Text>
               <Text> {imageUri} </Text>
               <Image
                source={{uri: imageUri}}
                style={{ width: 200, height: 200}}
               />
            </View>
            <View style={styles.mensage} >
               <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="emailAddress"
                  autoFocus={true}
               />
            </View>
          </View>
        </Modal>
        

      </>
    )};
