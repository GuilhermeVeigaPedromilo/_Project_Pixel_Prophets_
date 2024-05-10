import React, { useEffect, useState } from "react";  //Importacao do useState e do useEffect
import { Button, Text, View, TouchableOpacity } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles
import Txt from "../components/TextComponent"; // Importacao do Component Text
import ImageProps from "../components/ImageComponent"; // Importacao do Componente Imagem
import InputProps from "../components/InputComponent"; // Importação do Componente Text Input

export default function Configuracoes() {
  return (
    <View style={Styles.container}>
      <ImageProps
        source={require("../assets/images/LogoBlue.png")}
        style={Styles.ImgLogo}
      />
      <Txt Texto="Configurações" TextStyle={Styles.textos} />

      <View style={Styles.linhaabx}>
        <TouchableOpacity>
        <Txt Texto="Perfil de usuário" TextStyle={Styles.textosconfig}/>
        </TouchableOpacity>
      </View>

      <View style={Styles.linhaabx}>
      <TouchableOpacity>
        <Txt Texto="Preferências" TextStyle={Styles.textosconfig}/>
        </TouchableOpacity>
      </View>

      <View style={Styles.linhaabx}>
      <TouchableOpacity >
        <Txt Texto="Privacidade e segurança" TextStyle={Styles.textosconfig}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
