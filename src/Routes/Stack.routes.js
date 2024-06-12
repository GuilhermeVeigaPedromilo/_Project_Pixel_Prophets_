// Arquivo Stack.routes.js
import React, { useState, useEffect } from "react";//importação do useState e do useEffect
import { createNativeStackNavigator } from "@react-navigation/native-stack";//importação do createNativeStackNavigator
import AsyncStorage from "@react-native-async-storage/async-storage";//importação do AsyncStorage
import axios from "axios";//importação do axios
import { NavigationContainer } from "@react-navigation/native";

import Perfil from "../pages/Perfil";//importação da pagina Perfil
import Login from "../pages/Login"//importação da pagina Login
import RotasDrawer from "./Drawer.routes";//importação do Drawer
import Cartoes from "../pages/Cartoes";//importação da pagina Cartoes
import Splash from '../pages/Splash';//importação do Splash
import Preferencias from "../pages/Preferências";//importação da pagina Preferencias
import Privacidade from "../pages/Privacidade";//importação da pagina Privacidade
import Extrato from "../pages/Extrato";//importação da pagina Extrato
import Transferencia from "../pages/Transferencia";//importação da pagina Transferencia
import Ajuda from "../pages/Ajuda";//importação da pagina Ajuda
import Configuracoes from "../pages/Configuracoes";//importação da pagina Configuracoes
import Poupanca from "../pages/Poupanca";//importação da pagina Poupanca
import { TransferenciaConclusao } from "../partials/Transferencia";
import Comprovante from "../partials/Comprovante";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {

  return (
    <NavigationContainer>
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
          name="Preferencias"
          component={Preferencias}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Poupanca"
          component={Poupanca}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacidade"
          component={Privacidade}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transferencia"
          component={Transferencia}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransferenciaConclusao"
          component={TransferenciaConclusao}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Extrato"
          component={Extrato}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Comprovante"
          component={Comprovante}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Ajuda"
          component={Ajuda}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="Configurações"
          component={Configuracoes}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="RotasDrawer"
          component={RotasDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}