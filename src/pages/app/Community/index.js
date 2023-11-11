import React, {useState, useEffect, useContext, useRef, useLayoutEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, ActivityIndicator, Keyboard, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';
import { format } from 'date-fns';

import { GiftedChat } from 'react-native-gifted-chat';


import { styles, styled } from './style';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import { conversas } from '../../../components/list';
import MensageSend from '../../../components/MensageSend';
import * as ImagePicker from 'expo-image-picker';

//base de dados
import {ref , set, getDatabase, onValue, child  } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { auth, database, storage } from '../../../services/firebaseConnectio';



export default function Community() {

    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [dados, setDados] = useState([]);
    const [scroll, setScroll] = useState(false);
    
    const [id, setId] = useState(null);
    const [type, setType] = useState(null);
    const [username, setUsername] = useState(null);
    const [image, setImage] = useState(null);
    const [mensagem, setMensagem] = useState(null);
    const [mensageImage, setMensageImage] = useState(null);
    const [progress, setProgress] = useState('');

    const [open, setOpen] = useState(false);
    const [assets, setAssets] = useState(false);
    const [loading, setLoading] = useState(false);

    const timestamp = format(new Date(), 'T');
    const FlatListRef = useRef(null);

    const ChoiceImage = 'https://wallpaperaccess.com/full/2224374.jpg'
    
    useEffect( () => {

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Desculpe, precisamos da permissão para acessar a galeria para fazer isso funcionar!');
            }
          })

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
                    time: dados.time,
                };
                
                setDados( oldArray => [...oldArray, list]);
                //console.log(list);
                setScroll(true);
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


    //Ramdom id 
    function generationID(){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newRandomId = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            newRandomId += chars.charAt(randomIndex);
          }
      
          setId(newRandomId);
    };
    
    //Adicionar mensagem
    async function sendMensage() {
    
        const dataRef = ref(database, `chatComunidade/${id}`);
    
        let data = {
            id: id,
            type: user.id, //uri do user !== uri do enviado
            username: user.nome,
            image: user.url, 
            mensage: mensagem || 'null',
            mensageImage: mensageImage || 'null',
            time: timestamp,
        };
    
        set(dataRef, data)
        .then( () => {
            setMensagem('');
            Keyboard.dismiss();
            setAssets(false);
            generationID();
        })
        .catch( (error) => {
            Keyboard.dismiss();
            alert('Deu erro' + error);
        })
  
    };

    const sortedMessages = Object.values(dados).sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10));


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
            setImage(uri);
            uploadImageToFirebaseStorage(uri);
            setLoading(true);

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
            setMensageImage(downloadURL);
            // Do something with the download URL, like saving it to the database
            });
        }
        );
    } catch (error) {
        console.error('Error uploading image: ', error);
    }
    };

 return (
   <View style={styles.container} >
        <View style={styles.header} >
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            <Text style={styles.title} >Comunidade</Text>          
        </View>

        <ImageBackground source={{uri: ChoiceImage }}  style={styles.content} >

            {scroll ? 
                <>
                    <Text style={{color: 'white'}}>SEM LISTA</Text>   
                    <GiftedChat
                        messages={sortedMessages}
                        user={{
                            _id: 1,
                          }}    
                    />
                
                </>
                :
                <ActivityIndicator size={'large'} color={theme.colors.white} />

            }



        </ImageBackground>

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
            <TouchableOpacity onPress={() => setOpen(false)} style={styled.containerModal} >
                <View style={styled.card} >
                   <TouchableOpacity activeOpacity={0.7} onPress={ () => setOpen(false)} >
                        
                        <Text style={styled.menuItemText} >Adicionar uma foto</Text>
                   </TouchableOpacity>

                   { loading ? 
                    <>
                        {progress === '100%' ? 
                            <>
                                <Image source={{uri: mensageImage}} style={{width: 200, height: 200, alignSelf: 'center'}} /> 

                                <TouchableOpacity style={styled.menuItem} activeOpacity={0.7} onPress={ () => setOpen(false)} >
                                    <FontAwesome name='send-o' size={25} color={theme.colors.white} />
                                    <Text style={styled.menuItemText} >SUA IMAGEM FOI ENVIADA</Text>
                                </TouchableOpacity>
                                <Text style={{color: 'red', marginBottom: 10,}} >CLIQUE NO BOTÃO ACIMA E DIGITE UM TEXTO PARA SUA IMAGEM OU ABERTE EM ENVIAR PARA ENVIAR SUA IMAGEM</Text>
                            </>
                            : 
                            <>
                                <ActivityIndicator size={'large'} color={theme.colors.three} />
                                <Text> Carregando imagem </Text> 
                            </>
                            
                            }
                    </>
                   :
                   <>
                    <TouchableOpacity style={styled.menuItem} activeOpacity={0.7} onPress={ () => chooiceImage()} >
                            <Feather name='camera' size={30} color={theme.colors.white} />
                            <Text style={styled.menuItemText} >Adicionar uma foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styled.menuItem} activeOpacity={0.7} onPress={ () => { alert('Error 1203'), setOpen(false) }} >
                            <FontAwesome name='microphone' size={30} color={theme.colors.white} />
                            <Text style={styled.menuItemText} >Adicionar um audio</Text>
                    </TouchableOpacity>
                   </>
                    }
                   
                </View>
            </TouchableOpacity>
        </Modal>

   </View>
  );
}
