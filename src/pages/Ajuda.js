import React, { useEffect, useState } from "react"; //Importacao do useState e do useEffect
import { Image, Text, View, Modal } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import { Ionicons } from "@expo/vector-icons"; //Importacao do Ionicons

export default function Ajuda() {
  
  return (
    <View style={Styles.container}>
      <View style={{ alignItems: "center"}}>
        <Image
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
        <Text style={Styles.textosCard}>Ajuda</Text>
      </View>

      <View style={Styles.viewconstrucao}>
        <Text style={Styles.textosCard}>Página em construção</Text>
        <Ionicons name="build-outline" margim size={100} color="#171A4a" />
      </View>
    </View>
  );
}
