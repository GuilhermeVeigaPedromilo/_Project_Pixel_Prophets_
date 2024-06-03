import React, { useState, useEffect,  } from "react";
import { Text, View, Pressable, FlatList, ImageBackground, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import Styles from "../styles/StyleSheet";

import ImageProps from "../components/ImageComponent";
import Rodape from "../partials/Rodapé"; //Importacao do Rodape

const API_URL = 'http://192.168.1.68:3000';//Constante da URL


export default function Home({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

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
    if (isFocused){
    fetchUser();}
  }, [isFocused]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      // Se necessário, você pode fazer algo com a resposta
    } catch (err) {
      console.log(err);
      navigation.navigate("Login");
    }
  };

  const flatData = [
    {
      key: "1",
      image: "cash",
      text: "Pagar",
      rota: () => navigation.navigate("Transferencia")
    },
    {
      key: "2",
      image: "card",
      text: "Cartões",
      rota: () => navigation.navigate("Cartoes"),
    },
    {
      key: "3",
      image: "receipt",
      text: "Extrato",
      rota: () => navigation.navigate("Extrato"),
    },
    {
      key: "4",
      image: "wallet",
      text: "Poupança",
      rota: () => navigation.navigate("Poupanca"),
    },
  ];

  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!respUser) {
    return <Text>Erro ao carregar dados do usuário</Text>;
  }

  return (
    <View style={{ flex: 1,alignItems: "center", flexDirection: "column",   }}>
   
        <View style={Styles.quadradocontainer}>
          <View style={{ flexDirection: "row" }}>
            <ImageProps
              source={require("../assets/images/saldo.png")}
              style={{ width: 30, height: 30, marginLeft: "4%", marginTop: "3%" }}
            />

            <Text style={{ color: "white", marginLeft: "3%", marginTop: "4%", fontFamily: "Prompt" }}>
              Saldo disponível
            </Text>
          </View>

          <View style={{ width: "98%", marginTop: 30, marginLeft: "5%" }}>
            <Text style={{ color: "white", fontSize: 30, fontFamily: "Prompt" }}>{`R$${respUser.Saldo}`}</Text>
          </View>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={flatData}
          horizontal
          renderItem={({ item }) => (
            <Pressable
              style={[Styles.quadradocontainer2, { width: 150, height: 100 }]}
              onPress={item.rota}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name={item.image} margim size={28} color="#F0EDE9" />
              </View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 10,
                  marginTop: "2%",
                  fontFamily: "Prompt"
                }}
              >
                {item.text}
              </Text>
            </Pressable>
          )}
        />

        <Text style={{ color: "#000020", textAlign: "center", fontSize: 20, fontFamily: "Prompt", marginTop: "5%" }}>
          Cartão
        </Text>

        <View
          style={{
            width: "96%",
            height: 3,
            backgroundColor: "#171A4A",
            marginBottom: "4%",
            borderRadius: 10,
            marginTop: "2%",
          }}
        ></View>
        <View style={{ width: '100%', height: '30%', padding: "2%", marginBottom: '15%' }} >
          <ImageBackground
            source={require("../assets/images/cartaozica.png")}
            style={{ height: '100%', width: "100%" }}
          >
            <Text style={{ color: 'white', fontSize: 22, marginLeft: '6.5%', marginTop: "2%" }}>{respUser.numConta}</Text>
            <Text style={{ color: 'white', fontSize: 22, marginLeft: '6.5%', marginTop: "25%" }}>{respUser.nome}</Text>
          </ImageBackground>
        </View>
    
      <Rodape />
    </View>
  );
}
