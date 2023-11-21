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
    


 return (
   <View style={styles.container} >
        <View style={styles.header} >
            
            <TouchableOpacity onPress={ () => navigation.goBack()} >
                <Feather name='arrow-left' size={30} color={theme.colors.three} />
            </TouchableOpacity>
            
            <Text style={styles.title} > {username} </Text>        
            
            <Image source={{ uri: image }} style={styles.logo} />

        </View>
        <Text style={{color: 'white'}} > ABERTO + {id} </Text>

   </View>
  );
}
