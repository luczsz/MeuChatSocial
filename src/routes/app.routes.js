import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator();

import Home from "../pages/app/Home";
import Community from "../pages/app/Community";

export default function AppRoutes(){
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
                component={Community}
                options={{
                    headerShown: false,
                }}
            />
        </AppStack.Navigator>

    );
}
