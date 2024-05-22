import React, { useEffect, useState } from "react";//Importacao do React, useState e do useEffect
import { Button, Text, View, Modal } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Txt from "../components/TextComponent"; // Importacao do Txt
import ImageProps from "../components/ImageComponent"; // Importacao da ImageProps

export default function Perfil() {
  return (
    <View style={Styles.container}>
      <View style={Styles.centro}>
      <ImageProps
        source={require("../assets/images/LogoBlue.png")}
        style={Styles.ImgLogo}
      />
      <Txt Texto="Seu perfil" TextStyle={Styles.textos} />
      </View>
    </View>
  );
}
