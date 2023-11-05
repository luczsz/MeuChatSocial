import React, { useState, useEffect, useContext} from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth';

import { styles } from './style';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../global/theme';

import * as ImagePicker from 'expo-image-picker';

//Importando a base
import {  ref as dbRef, set, getDatabase, onValue, child } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { auth, database, storage } from '../../../services/firebaseConnectio';

export default function ImageProfile() {

  const navigation = useNavigation();
  const route = useRoute();
  const { nome, email, senha } = route.params;
  const addImage = 'https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png';
  const { signUp, loading } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState('');

  // Solicita permissão para acessar a galeria quando o componente é montado
  useEffect( () => {

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos da permissão para acessar a galeria para fazer isso funcionar!');
      }
    })

  },[]);


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

    const storagePath = `profiles/${nome}`;
    const imageRef = storageRef(storage, storagePath);

    try {
      const uploadTask = uploadBytesResumable(imageRef, blob);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress, if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading image: ', error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUrl(downloadURL);
            // Do something with the download URL, like saving it to the database
          });
        }
      );
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };


  //Função para adicionar usuarios
  function addUser(){
    signUp(nome, email, senha, url);
  };


 return (
   <View style={styles.container} >
        <View style={styles.header} >
          <TouchableOpacity onPress={ () => navigation.goBack()} >
           <Feather name='arrow-left' size={30} color={theme.colors.three} />
          </TouchableOpacity>
        </View>
        <View style={styles.content} >
          <TouchableOpacity activeOpacity={0.8} onPress={ () => chooiceImage()} >

              {url == null ?
                <Image source={{uri: addImage}} style={styles.logo} />
                :
                <Image source={{uri: url}}  style={styles.logo} />
              }
            
          </TouchableOpacity>
        </View>
        <View style={styles.button} >
          
            <TouchableOpacity style={styles.next} onPress={ () => addUser() } >

                {loading ?
                  <ActivityIndicator size={'large'} color={theme.colors.white} />
                  :
                  <Text style={styles.nextText} >Cadastrar</Text>     
                }
            </TouchableOpacity>
      
        </View>
   </View>
  );
}
