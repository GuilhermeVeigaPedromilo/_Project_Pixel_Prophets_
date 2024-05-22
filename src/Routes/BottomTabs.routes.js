import React from "react";//Importacao do React
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";//Importacao do createBottomTabNavigation

import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

import Styles from "../styles/StyleSheet";//Importacao do Styles

import Home from "../pages/Home"; // Importacao da Pagina Home

import Transferencia from "../pages/Transferencia"; // Importacao da Pagina Transferencia

import Extrato from "../pages/Extrato"; // Importacao da Pagina Extrato

import Cartoes from "../pages/Cartoes";//Importacao da pagina Cartoes

import {
  TransferenciaConfirmacao,
  TransferenciaConclusao,
} from "../partials/Transferencia";

const Tab = createBottomTabNavigator();

export default function RotasTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#171A4A" },
          tabBarActiveTintColor: "#F5E2CF",
          tabBarInactiveTintColor: "#F0EDE9",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <Ionicons margim size={28} color={color} name="home" />;
          },
        }}
      />
      <Tab.Screen
        name="Transferência"
        component={Transferencia}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#171A4A" },
          tabBarActiveTintColor: "#F5E2CF",
          tabBarInactiveTintColor: "#F0EDE9",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="cash" margim size={28} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cartoes"
        component={Cartoes}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#171A4A" },
          tabBarActiveTintColor: "#F5E2CF",
          tabBarInactiveTintColor: "#F0EDE9",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="card" margim size={28} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Extrato"
        component={Extrato}
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#171A4A" },
          tabBarActiveTintColor: "#F5E2CF",
          tabBarInactiveTintColor: "#F0EDE9",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="receipt" margim size={28} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
