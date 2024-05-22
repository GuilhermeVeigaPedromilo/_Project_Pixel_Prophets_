import React, { useEffect, useState } from "react";//Importacao do React, useEffect e do useState
import {
  Button,
  Text,
  View,

  FlatList,
  Image,
  ScrollView,
} from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

import Styles from "../styles/StyleSheet";//Importacao do Styles

import Txt from "../components/TextComponent";//Importacao do Txt
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps

export default function Settings() {

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={Styles.Header}>
        <View></View>
        <Txt
          Texto={"Olá, fulano"}
          TextStyle={{
            color: "white",
            fontSize: 30,
            marginLeft: 10,
            marginBottom: 10
          }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", display: 'flex', flexDirection: 'column' }}> 
      
        <View style={Styles.quadradocontainer}>
      </View>
      
  
      <RdpComponente />
    </View>
    </View>
  );
}
