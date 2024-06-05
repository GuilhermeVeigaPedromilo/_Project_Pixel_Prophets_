import React, { useState, useEffect } from "react";//Importacao do React, do useState e do useEffect
import { Text, View, Pressable, FlatList, ImageBackground, ActivityIndicator } from "react-native";//Importacao dos componentes do react native
import axios from "axios";//Importacao do axios
import { useNavigation, useIsFocused } from "@react-navigation/native";//Importacao do useNavigation e do useIsFocused
import AsyncStorage from "@react-native-async-storage/async-storage";//Importacao do AsyncStorage

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

import Styles from "../styles/StyleSheet";//Importacao do Styles

import ImageProps from "../components/ImageComponent";//Importacao do ImageProps
import Rodape from "../partials/Rodapé";//Importacao do Rodape

const API_URL = 'http://10.144.170.31:3000'; // Constante da URL

export default function Home({ route }) {
  const navigation = useNavigation();//Define o navigation
  const [cpfUser, setCpfUser] = useState(null);//Define o cpfUser
  const [senhaUser, setSenhaUser] = useState(null);//Define o senhaUser
  const [respUser, setRespUser] = useState(null);//Define o respUser
  const [loading, setLoading] = useState(true);//Define o loading
  const isFocused = useIsFocused();//Define o isFocused

  //Constante do useEffect
  useEffect(() => {
    const clearSession = async () => {
      try {
        await AsyncStorage.removeItem('userSession');
        console.log('Sessão do usuário removida.');
      } catch (err) {
        console.log('Erro ao remover sessão:', err);
      }
    };

    if (isFocused) {
      clearSession();
      fetchUser();
    }
  }, [isFocused]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
      const userData = response.data;

      // Atualizar os estados
      setCpfUser(userData.cpfUser);
      setSenhaUser(userData.senhaUser);
      setRespUser(userData);

      // Salvar as novas informações no AsyncStorage
      const session = JSON.stringify({ cpfUser: userData.cpfUser, senhaUser: userData.senhaUser, respUser: userData });
      await AsyncStorage.setItem('userSession', session);
      console.log('Informações do usuário salvas.');
    } catch (err) {
      console.log('Erro ao buscar usuário:', err);
      navigation.navigate("Login");
    } finally {
      setLoading(false);
    }
  };

  //Constante do Flatlist
  const flatData = [
    { key: "1", image: "cash", text: "Pagar", rota: () => navigation.navigate("Transferencia") },
    { key: "2", image: "card", text: "Cartões", rota: () => navigation.navigate("Cartoes") },
    { key: "3", image: "receipt", text: "Extrato", rota: () => navigation.navigate("Extrato") },
    { key: "4", image: "wallet", text: "Poupança", rota: () => navigation.navigate("Poupanca") }
  ];

  //Constante das Fontes
  const [loaded] = useFonts({ "Prompt": require("../assets/fonts/Prompt-Regular.ttf") });

  if (!loaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!respUser) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
      <View style={Styles.quadradocontainer}>
        <View style={{ flexDirection: "row" }}>
          <ImageProps source={require("../assets/images/saldo.png")} style={{ width: 30, height: 30, marginLeft: "4%", marginTop: "3%" }} />
          <Text style={{ color: "white", marginLeft: "3%", marginTop: "4%", fontFamily: "Prompt" }}>Saldo disponível</Text>
        </View>
        <View style={{ width: "98%", marginTop: 30, marginLeft: "5%" }}>
          <Text style={{ color: "white", fontSize: 30, fontFamily: "Prompt" }}>{`R$${respUser.Saldo}`}</Text>
        </View>
      </View>

{/* Começo Flatlist  */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={flatData}
        horizontal
        renderItem={({ item }) => (
          <Pressable  onPress={item.rota}>
            <View  style={[Styles.quadradocontainer2, { width: 200, height: 120, flexDirection: 'column' }]}>
              <Ionicons name={item.image} size={32} color="#F0EDE9" />
              <Text style={{ color: "white", textAlign: "center", fontSize: 20, fontFamily: "Prompt" }}>
              {item.text}
            </Text>
            </View>
            
          </Pressable>
        )}
      />

{/* Fim da Flatlist */}

      <Text style={{ color: "#000020", textAlign: "center", fontSize: 20, fontFamily: "Prompt", marginTop: "3%" }}>Cartão</Text>
      <View style={{ width: "96%", height: 3, backgroundColor: "#171A4A", marginBottom: "4%", borderRadius: 10, marginTop: "2%" }}></View>
      <View style={{ width: '100%', height: '30%', padding: "2%", marginBottom: '15%' }} >
        <ImageBackground source={require("../assets/images/cartaozica.png")} style={{ height: '98%', width: "100%" }}>
          <Text style={{ color: 'white', fontSize: 22, marginLeft: '6.5%', marginTop: "2%" }}>{respUser.numConta}</Text>
          <Text style={{ color: 'white', fontSize: 22, marginLeft: '6.5%', marginTop: "25%" }}>{respUser.nome}</Text>
        </ImageBackground>
      </View>

      <Rodape />
    </View>
  );
}
