// Arquivo Stack.routes.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Perfil from "../pages/Perfil";
import Login from "../pages/Login"
import DrawerRoutes from "./Drawer.routes";
import Cartoes from "../pages/Cartoes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
      <Stack.Navigator initialRouteName="Splash">
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
          name="DrawerTabs"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
