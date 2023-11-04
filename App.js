import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import AuthProvaider from './src/context/auth';


import Routes from './src/routes';


export default function App() {

  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvaider>
        <StatusBar style='light' />
        <Routes/>
      </AuthProvaider>
    </NavigationContainer>
  );
}
