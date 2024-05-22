import React from "react";//Importacao do React
import { createDrawerNavigator } from "@react-navigation/drawer";//Importacao do createDrawerNavigator

import RotasTabs from "./BottomTabs.routes";//Importacao do Tabs
import CustomDrawer from "../components/CustomDrawer";//Importacao do CustomDrawer
import {  DrawerContentScrollView,  DrawerItemList} from "@react-navigation/drawer";//Importacao do DawerContentScrollView e do DrawerItemList

import Configuracoes from "../pages/Configuracoes";//Importacao da pagina Configuracoes
import Ajuda from "../pages/Ajuda"; //Importacao da Pagina Ajuda
import Perfil from "../pages/Perfil"; // Importacao da Pagina Perfil

import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons
import { useFonts } from "expo-font";//Importacao do useFonts

const Drawer = createDrawerNavigator();

function CustomDrawerIcon({ color, iconName }) {
  return <Ionicons size={28} color={color} name={iconName} />;
}


export default function RotasDrawer() {

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        drawerStyle: { backgroundColor: "#171A4A" },
        drawerActiveBackgroundColor: "#F0EDE9",
        drawerActiveTintColor: "#171A4A",
        drawerInactiveBackgroundColor: "#171A4A",
        drawerInactiveTintColor: "#F0EDE9",
        headerTitleStyle: { color: "white" },
        headerStyle: { backgroundColor: "#171A4A" },
        headerTintColor: "#F0EDE9",
        headerTitle: "Olá, Pixel Prophets",
        drawerIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Perfil":
              iconName = "person";
              break;
            case "Configurações":
              iconName = "settings";
              break;
            case "Ajuda":
              iconName = "help-circle";
              break;
            default:
              iconName = "information-circle";
          }
          return <CustomDrawerIcon color={color} iconName={iconName} />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={RotasTabs} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Configurações" component={Configuracoes} />
      <Drawer.Screen name="Ajuda" component={Ajuda} />
    </Drawer.Navigator>
  );
}
