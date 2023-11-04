import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AuthStack = createNativeStackNavigator();

import Splash from '../pages/auth/Splash';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ImageProfile from '../pages/auth/ImageProfile';
import { theme } from '../global/theme';



export default function AuthRoutes() {
 return (
        <AuthStack.Navigator>

            <AuthStack.Screen 
              name='Splash' 
              component={Splash}
              options={{
                headerShown: false,
              }} 
            />

            <AuthStack.Screen 
              name='Login' 
              component={SignIn} 
              options={{
                headerShown: false,
              }}
            />
            
            <AuthStack.Screen 
              name='Cadastro' 
              component={SignUp}
              options={{
                 headerShown: false,
              }} 
            />

            <AuthStack.Screen name='Profile' component={ImageProfile} />
        </AuthStack.Navigator>
  );
}
