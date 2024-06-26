import React, { useState, useEffect } from "react";//importação do React
import { createDrawerNavigator } from "@react-navigation/drawer";//importação do createDrawerNavigator
import CustomDrawer from "../components/CustomDrawer";//importação do CustomDrawer
const API_URL = 'http://10.144.170.39:3000';//Constante da URL
import Configuracoes from "../pages/Configuracoes";//importação da pagina Configuracoes
import Ajuda from "../pages/Ajuda"; //importação da Pagina Ajuda
import Perfil from "../pages/Perfil"; // importação da Pagina Perfil
import Login from "../pages/Login"//importação da pagina Login
import { Ionicons } from "@expo/vector-icons";//importação do Ionicons
import { useFonts } from "expo-font";//importação do useFonts
import Home from "../pages/Home";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Drawer = createDrawerNavigator();

function CustomDrawerIcon({ color, iconName }) {
  return <Ionicons size={28} color={color} name={iconName} />;
}

export default function RotasDrawer() {

  const navigation = useNavigation()

  const [user, setUser] = useState(null);

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const logout = await axios.get(`${API_URL}/logout`)
    } catch (err) {
      console.log('Não foi possível sair da sua conta');
    }
  };

  const DeslogarSessionUser = async () => {
    try {
      const sessionlogout = await AsyncStorage.removeItem('userSession',);
    }
    catch (err) { console.log('Erro ao sair da conta: ', err) }
  }

  const Logout = async () => {
    try {
      const logout = await Promise.all([handleLogout(), DeslogarSessionUser()]);
      console.log('Conta deslogada totalmente', logout);
      navigation.navigate('Login');
    } catch (err) {
      console.log('Erro: ', err)
    }
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
            case Configuracoes:
              iconName = "settings";
              break;
            case "Ajuda":
              iconName = "help-circle";
              break;
            default:
              iconName = "log-out";
          }
          return <CustomDrawerIcon color={color} iconName={iconName} />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={Home} />
      {/*<Drawer.Screen name="Perfil" component={Perfil} />*/}
      <Drawer.Screen name="Configuracoes" component={Configuracoes} />
      <Drawer.Screen name="Ajuda" component={Ajuda} />
      <Drawer.Screen name="Sair" component={Logout} />
      {/* <Drawer.Screen name="Sair" component={handleLogout} />*/}
    </Drawer.Navigator>
  );
}
