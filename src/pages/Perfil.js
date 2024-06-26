import React, { useState, useEffect } from "react";//importação do React, do useState e do useEffect
import { Text, View, Image, Pressable, FlatList, ImageBackground, ActivityIndicator, ScrollView } from "react-native";//importação dos componentes do react native
import axios from "axios";//importação do axios
import { useNavigation, useIsFocused } from "@react-navigation/native";//importação do useNavigation e do useIsFocused
import AsyncStorage from "@react-native-async-storage/async-storage";//importação do AsyncStorage

import { useFonts } from "expo-font";//importação do useFonts

import Styles from "../styles/StyleSheet";//importação do Styles

import ImageProps from "../components/ImageComponent";//importação do ImageProps
import Rodape from "../partials/Rodapé";//importação do Rodape
import Line from "../components/LineComponent";

const API_URL = 'http://10.144.170.39:3000'; // Constante da URL

export default function Perfil({ route }) {
  const navigation = useNavigation();//Define o navigation
  const [user, setUser] = useState(null);//Define o user
  const [cpfUser, setCpfUser] = useState('');//Define o cpfUser
  const [senhaUser, setSenhaUser] = useState('');//Defne o senhaUser
  const [respUser, setRespUser] = useState('');//Define o respUser
  const [loading, setLoading] = useState(true);//Define o loading

  //Constante do useEffect
  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const { cpfUser, senhaUser, respUser } = JSON.parse(session);
          setCpfUser(cpfUser);
          setSenhaUser(senhaUser);
          setRespUser(respUser);
        }
      } catch (error) {
        console.log('Failed to load session', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  //Constante das Fontes
  const [loaded] = useFonts({ "Prompt": require("../assets/fonts/Prompt-Regular.ttf") });

  if (!loaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!respUser) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View style={Styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={Styles.section}>
        <Pressable onPress={() => navigation.navigate('Configuracoes')}>
            <Image
              source={require("../assets/images/setinha.png")}
              style={{ margin: 20 }}
            />
          </Pressable>
          <View style={{ alignItems: 'center', margin: '1%', }} >
            <ImageProps
              source={require("../assets/images/LogoBlue.png")}
              style={Styles.ImgLogo}
            />
            <Text style={Styles.textosCard}>Perfil</Text>
            <Line />

            {/* Comprovante  */}
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Nome do usuário: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUser.nome}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >CPF: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUser.cpf}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Número da conta: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUser.cpf}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >E-mail: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUser.email}</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Rodape />
    </View>
  );
}
