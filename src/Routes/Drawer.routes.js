import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import RotasTabs from "./BottomTabs.routes";

import Configuracoes from "../pages/Configuracoes";

import Ajuda from "../pages/Ajuda"; //Importacao da Pagina Ajuda

import Perfil from "../pages/Perfil"; // Importacao da Pagina Perfil

import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

function CustomDrawerIcon({ color, iconName }) {
  return <Ionicons size={28} color={color} name={iconName} />;
}
export default function RotasDrawer() {
  const fulano = "Fulano";
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
        headerTitle: "Oi",
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
