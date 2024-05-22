import React from "react";//Importacao do React
import { NavigationContainer } from "@react-navigation/native";//Importacao do NavigationContainer

import RotasDrawer from "./Drawer.routes";//Importacao das RotasDrawer
import RotasTabs from "./BottomTabs.routes";//Importacao das RotasTabs
import StackRoutes from "./Stack.routes";//Importacao do StackRoute

export default function AllRoutes() {
  return (
    <NavigationContainer>
        <StackRoutes/>
    </NavigationContainer>
  );
}
