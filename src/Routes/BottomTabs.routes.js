import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import Home from "../pages/Home"; // Importacao da Pagina Home

import Transferencia from "../pages/Transferencia"; // Importacao da Pagina Transferencia

import Extrato from "../pages/Extrato"; // Importacao da Pagina Extrato

import Configuracoes from "../pages/Configuracoes";

import {
  TransferenciaConfirmacao,
  TransferenciaConclusao,
} from "../partials/Transferencia";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function RotasTabs() {
  return (
      <Tab.Navigator >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ 
            headerShown: false,
            tabBarStyle: {backgroundColor: '#171A4A'},
            tabBarActiveTintColor: '#E8C39E', 
            tabBarInactiveTintColor: 'white',
            tabBarLabel: "",
            tabBarIcon: ({color}) => {
              return <Ionicons margim size={28} color={color} name="home"/>;
            },}}
        />
        <Tab.Screen
          name="Transferencia"
          component={Transferencia}
          options={{ 
            headerShown: false, 
            tabBarStyle: {backgroundColor: '#171A4A'}, 
            tabBarActiveTintColor: '#E8C39E',
            tabBarInactiveTintColor: 'white',
            tabBarLabel: "",
            tabBarIcon: ({color}) => {
              return <Ionicons name="cash" margim size={28} color={color} />;

            },}}
        />
        <Tab.Screen
          name="Extrato"
          component={Extrato}
          options={{ 
            headerShown: false, 
            tabBarStyle: {backgroundColor: '#171A4A'}, 
            tabBarActiveTintColor: '#E8C39E',
            tabBarInactiveTintColor: 'white',
            tabBarLabel: "",
            tabBarIcon: ({color}) => {
              return <Ionicons name="document-text" margim size={28} color={color} />;
            },}}
        />
        <Tab.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{ 
            headerShown: false, 
            tabBarStyle: {backgroundColor: '#171A4A'}, 
            tabBarActiveTintColor: '#E8C39E',
            tabBarInactiveTintColor: 'white',
            tabBarLabel: "",
            tabBarIcon: ({color}) => {
              return <Ionicons name="cog" margim size={28} color={color} />;
            },}}
        />
      </Tab.Navigator>
  );
}

