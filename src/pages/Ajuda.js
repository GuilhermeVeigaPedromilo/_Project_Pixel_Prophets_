import React, { useEffect, useState } from "react"; //Importacao do useState e do useEffect
import { Button, Text, View, Modal } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Txt from "../components/TextComponent"; // Importacao do Component Text
import ImageProps from "../components/ImageComponent"; // Importacao do Componente Imagem
import InputProps from "../components/InputComponent"; // Importação do Componente Text Input

export default function Ajuda() {
  
  return (
    <View style={Styles.container}>
      <View style={Styles.centro}>
      <ImageProps
        source={require("../assets/images/LogoBlue.png")}
        style={Styles.ImgLogo}
      />
      <Txt Texto="Ajuda" TextStyle={Styles.textos} />
      </View>
    </View>
  );
}
