import React, { useEffect, useState } from "react";  //Importacao do useState e do useEffect
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation
import { Button, Text, View, Pressable } from "react-native"; //Importacao dos componentes do react-native

import { Ionicons } from "@expo/vector-icons"; //Importacao do Ionicons
import { useFonts } from "expo-font";//Importacao do useFonts

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Txt from "../components/TextComponent"; // Importacao do Component Text
import ImageProps from "../components/ImageComponent"; // Importacao do Componente Imagem
import InputProps from "../components/InputComponent"; // Importação do Componente Text Input

export default function Configuracoes({navigation}) {
  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      
        <View style={Styles.centro}>
          <ImageProps
            source={require("../assets/images/LogoBlue.png")}
            style={Styles.ImgLogo}
          />
        <Text style={Styles.textos}>Configurações</Text>
        </View>
        <View style={{width: "100%" }}>
        <View style={Styles.linhaabx}>
          <Pressable style={{ flexDirection: "row" }}
           onPress={() => navigation.navigate("Perfil")}>
            <Ionicons size={28} color="#E8C39E" name="person" />
            <Text  style={Styles.textosconfig}>Perfil de usuário</Text>
          </Pressable>
        </View>

        <View style={Styles.linhaabx}>
          <Pressable style={{ flexDirection: "row" }}
           onPress={() => navigation.navigate("Preferencia")}>
            <Ionicons size={28} color="#E8C39E" name="extension-puzzle" />
            <Text  style={Styles.textosconfig}>Preferências</Text>
          </Pressable>
        </View>

        <View style={Styles.linhaabx}>
          <Pressable style={{ flexDirection: "row" }}
           onPress={() => navigation.navigate("Privacidade")}>
            <Ionicons size={28} color="#E8C39E" name="shield-checkmark" />
            <Text  style={Styles.textosconfig}>Privacidade e segurança</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
