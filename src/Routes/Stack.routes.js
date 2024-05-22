// Arquivo Stack.routes.js
import React, {useState, useEffect} from "react";//Importacao do useState e do useEffect
import { createNativeStackNavigator } from "@react-navigation/native-stack";//Importacao do createNativeStackNavigator
import AsyncStorage from "@react-native-async-storage/async-storage";//Importacao do AsyncStorage
import axios from "axios";//Importacao do axi

import Perfil from "../pages/Perfil";//Importacao da pagina Perfil
import Login from "../pages/Login"//Importacao da pagina Login
import DrawerRoutes from "./Drawer.routes";//Importacao do Drawer
import Cartoes from "../pages/Cartoes";//Importacao da pagina Cartoes
import Splash from '../pages/Splash';//Importacao do Splash
import Preferencias from "../pages/Preferências";//Importacao da pagina Preferencias
import Privacidade from "../pages/Privacidade";//Importacao da pagina Privacidade

const Stack = createNativeStackNavigator();

export default function StackRoutes() {

  return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cartoes"
          component={Cartoes}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Preferência"
          component={Preferencias}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Privacidade"
          component={Privacidade}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerTabs"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
