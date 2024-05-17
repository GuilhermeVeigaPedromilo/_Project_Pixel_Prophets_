// Arquivo Stack.routes.js
import React, {useState, useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Perfil from "../pages/Perfil";
import Login from "../pages/Login"
import DrawerRoutes from "./Drawer.routes";
import Cartoes from "../pages/Cartoes";
import Splash from '../pages/Splash';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  
  const [userToken, setUserToken] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const tokenSalvo = await AsyncStorage.getItem("token");
    if (tokenSalvo !== null) {
      console.log(`Sessão confirmada = ${tokenSalvo}`)
      setUserToken(true);
    }
  }

  const limparAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage limpo com sucesso!");
      setUserToken(true);
    } catch (error) {
      console.log("Erro ao limpar AsyncStorage:", error);
    }
  };

  const handleLogout = () => {
    limparAsyncStorage();
  };

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
          initialParams={{setUserToken: setUserToken}}
        />

        <Stack.Screen
          name="Home"
          component={DrawerRoutes}
          options={{ headerShown: false }}
          initialParams={{handleLogout: handleLogout}}
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
          name="DrawerTabs"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
