import React, { useEffect, useState } from "react"; //Importacao do useState e do useEffect
import { Button, Text, View, ScrollView } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles
import Txt from "../components/TextComponent"; // Importacao do Component Text
import ImageProps from "../components/ImageComponent"; // Importacao do Componente Imagem
import InputProps from "../components/InputComponent"; // Importação do Componente Text Input

export default function Extrato() {
  return (
    <ScrollView >
    <View style={Styles.container}>
      <ImageProps
        source={require("../assets/images/LogoBlue.png")}
        style={Styles.ImgLogo}
      />
      <Txt Texto="Extrato" TextStyle={Styles.textos} />

      <View style={Styles.linhaabx}>
        <Txt Texto="Saldo em conta:" TextStyle={Styles.textossaldo}/>
        <Txt Texto="R$ 28.000,00" TextStyle={Styles.saldo}/>
      </View>

      <View style={Styles.linhaabx}>
        
        <Txt Texto="03/05/2024" TextStyle={Styles.data}/>
      </View>

      <View style={Styles.linhald}>
        <Txt Texto="Foi recebido + R$ 300,00" TextStyle={Styles.textossaldo}/>
        <Txt Texto="Ciclano Pereira S" TextStyle={Styles.textosbeges}/>
      </View>

      <View style={Styles.linhald}>
        <Txt Texto="Foi recebido + R$ 25,00:" TextStyle={Styles.textossaldo}/>
        <Txt Texto="Beltrano Colossenses J" TextStyle={Styles.textosbeges}/>
      </View>

      <View style={Styles.linhald}>
        <Txt Texto="Foi pago - R$ 12,90:" TextStyle={Styles.textossaldo}/>
        <Txt Texto="Mercadinho Rosalina" TextStyle={Styles.textosbeges}/>
      </View>
    </View>
    </ScrollView>
  );
}
