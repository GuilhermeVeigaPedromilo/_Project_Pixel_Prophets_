import React, { useEffect, useState } from "react"; //Importacao do useState e do useEffect
import { Button, Text, View, ScrollView, FlatList } from "react-native"; //Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation

import Styles from "../styles/StyleSheet"; // Importacao do Styles
import Txt from "../components/TextComponent"; // Importacao do Component Text
import ImageProps from "../components/ImageComponent"; // Importacao do Componente Imagem
import InputProps from "../components/InputComponent"; // Importação do Componente Text Input

const data = [
  { id: "1", text: "Foi recebido + R$ 300,00", name: "Ciclano Pereira S" },
  { id: "2", text: "Foi recebido + R$ 25,00", name: "Beltrano Colossenses J" },
  { id: "3", text: "Foi pago - R$ 12,90", name: "Mercadinho Rosalina" },
  { id: "4", text: "Foi recebido + R$ 300,00", name: "Ciclano Pereira S" },
  { id: "5", text: "Foi recebido + R$ 25,00", name: "Beltrano Colossenses J" },
  { id: "6", text: "Foi pago - R$ 12,90", name: "Mercadinho Rosalina" },
  
  // Adicione mais itens conforme necessário
];

function renderItem({ item }) {
  return (
    <View>
      <ImageProps
        source={require("../assets/images/Iconzinho.png")}
        style={{ width: 50, height: 50, position: "relative", top: 65,  }}
      />
      <View style={Styles.linhald}>
        <Text style={Styles.textossaldo}>{item.text}</Text>
        <Text style={Styles.textosbeges}>{item.name}</Text>
      </View>
    </View>
  );
}

export default function Extrato() {
  return (
    <View style={Styles.container}>
      <View style={Styles.centro}>
        <ImageProps
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
        <Txt Texto="Extrato" TextStyle={Styles.textos} />
      </View>

      <View style={Styles.linhaabx}>
        <Txt Texto="Saldo em conta:" TextStyle={Styles.textossaldo} />
        <Txt Texto="R$ 28.000,00" TextStyle={Styles.saldo} />
      </View>

      <View style={Styles.linhaabx}>
        <Txt Texto="03/05/2024" TextStyle={Styles.data} />
      </View>

      <View style={{ flex: 1, marginLeft: 30 }}>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
