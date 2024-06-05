import React from "react";//Importacao do React
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";//Importacao dos componentes do react-native
import {  DrawerContentScrollView,  DrawerItemList,} from "@react-navigation/drawer";//Importacao do DrawerContentScrollView e do DrawerItemList,

import { useFonts } from "expo-font";//Importacao do useFonts

export default function CustomDrawer(props) {
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <DrawerContentScrollView {...props}>
      {/* Cabeçalho Personalizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Perfil")}>
          <Image
            source={require("../assets/images/LogoPB.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pixel Bank</Text>
      </View>

      {/* Itens do Menu Personalizados */}
      <DrawerItemList {...props} labelStyle={styles.drawerItemLabel} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    fontSize: 30,
    color: "#fff",
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 0, // Redefinindo o espaçamento padrão
    fontFamily: "Prompt",
  },
});
