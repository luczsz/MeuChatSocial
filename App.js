import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Ubuntu_400Regular, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';


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
      <StatusBar style='light' />
      <Routes/>
    </NavigationContainer>
  );
}
