import React, {useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../global/theme';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';


export default function MensageSend({ data }) {
  const { type, mensage, username, mensageImage } = data;

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  function redirect(data){
    navigation.navigate('Perfil', data);
  }

  const MessageSend = () => {
    return (
      <View style={styles.containerSend} >
        
        <View style={styles.send}>
          <Text style={styles.userName} >{username}</Text>
          {mensageImage === 'null'? <></> : <Image source={{uri: mensageImage}} style={styles.images} /> }
          <Text style={styles.textMensage} >{mensage}</Text>
        </View>
        <TouchableOpacity onPress={() => redirect(data)} >
          <Image source={{uri: data.image}} style={styles.imgs} />
        </TouchableOpacity>

        </View>
    );
  };

  const MessageReceived = () => {
    return (
      <View style={styles.containerReceived} >
        
        <TouchableOpacity onPress={() => redirect(data)} >
          <Image source={{uri: data.image}} style={styles.imgs} />
        </TouchableOpacity>

        <View style={styles.reseived}>
          <Text style={styles.userNameReceived} >{username}</Text>
          {mensageImage === 'null'? <></> : <Image source={{uri: mensageImage}} style={styles.images} /> }
          <Text style={styles.textMensage} >{mensage}</Text>
        </View>

      </View>
    );
  };

  return <>{type === user.id ? <MessageSend /> : <MessageReceived />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bubble: {
    backgroundColor: "#007AFF", // Cor do balão da mensagem "Send"
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%", // Largura máxima do balão da mensagem
  },

  userName:{
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.one,
  },
  userNameReceived:{
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.three,
  },
  textMensage:{
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.white,
    marginTop: 6,
  },

  containerSend:{
    marginBottom: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },

  containerReceived:{
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },

  send: {
    backgroundColor: theme.colors.three, // Cor do balão da mensagem "Send"
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%", // Largura máxima do balão da mensagem
  },
  
  reseived: {
    backgroundColor: theme.colors.two, // Cor do balão da mensagem "Send"
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
    maxWidth: "80%", // Largura máxima do balão da mensagem
  },

  imgs:{
    width: 50,
    height: 50,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: theme.colors.three,
  },

  images:{
    width: 280,
    height: 300,
    marginTop: 10,
    
  }
});
