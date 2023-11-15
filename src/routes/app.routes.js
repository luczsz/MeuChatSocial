import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { theme } from "../global/theme";
import HeaderMenu from "../components/HeaderMenu";

const AppStack = createNativeStackNavigator();
const TopStack = createMaterialTopTabNavigator();
 
import Home from "../pages/app/Home";
import Community from "../pages/app/Community";
import Account from "../pages/app/Account";
import Friends from "../pages/app/Friends";
import Solicitation from "../pages/app/Solicitation";
import ChatSolo from "../pages/app/ChatSolo";
import Profile from "../pages/app/Profile";

import Chats from "../pages/app/Community/chat";

export default function AppRoutes(){


    function TopMenu(){
        return(
            <TopStack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    color: theme.colors.three, // Define a cor do título para azul
                },
                tabBarStyle:{
                    backgroundColor: theme.colors.one,
                    borderTopWidth: 0,
                },
                
                
                tabBarActiveTintColor: theme.colors.three,
                tabBarInactiveTintColor: theme.colors.white,
                tabBarIndicatorStyle: {
                    backgroundColor: theme.colors.three, // Cor do indicador quando a guia está ativa
                    height: 3, // Altura do indicador
                  },
            }}
            >
                <TopStack.Screen name="Amigos" component={Friends} />
                <TopStack.Screen name="Solicitações" component={Solicitation} />
            </TopStack.Navigator>
        )
    };

    return(
        <AppStack.Navigator>
            <AppStack.Screen
                name="Inicio"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
           
            <AppStack.Screen
                name="Comunidade"
                component={Chats}
                options={{
                    headerShown: false,
                }}
            />
            
            <AppStack.Screen
                name="Conta"
                component={Account}
                options={{
                    headerShown: false,
                }}
            />
            
            <AppStack.Screen
                name="Chat"
                component={ChatSolo}
                options={{
                    headerShown: false,
                }}
            />

            <AppStack.Screen
                name="Perfil"
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
           
            <AppStack.Screen
                name="Friends"
                component={TopMenu}
                options={{
                    headerShown: true,
                    headerTitle: () => <HeaderMenu/> ,
                    headerTintColor: theme.colors.three,
                    headerStyle:{
                        height: 200,
                        backgroundColor: theme.colors.one,

                    },
                    
                }}
            />
        </AppStack.Navigator>

    );
}
