import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AuthStack = createNativeStackNavigator();

import Splash from '../pages/auth/Splash';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ImageProfile from '../pages/auth/ImageProfile';



export default function AuthRoutes() {
 return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='Splash' component={Splash} />
            <AuthStack.Screen name='Login' component={SignIn} />
            <AuthStack.Screen name='Cadastro' component={SignUp} />
            <AuthStack.Screen name='Profile' component={ImageProfile} />
        </AuthStack.Navigator>
  );
}
