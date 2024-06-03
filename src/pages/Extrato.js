import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, FlatList } from "react-native";

const API_URL = 'http://192.168.0.177:3000';

import { useFonts } from "expo-font";
import Styles from "../styles/StyleSheet";

import ImageProps from "../components/ImageComponent";
import Rodape from "../partials/Rodapé";

export default function Extrato({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [extrato, setExtrato] = useState([]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const { cpfUser, senhaUser, respUser } = JSON.parse(session);
          setCpfUser(cpfUser);
          setSenhaUser(senhaUser);
          setRespUser(respUser);
          await SelectExtrato(respUser.nome);
        }
      } catch (error) {
        console.log('Failed to load session', error);
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const SelectExtrato = async (nome) => {
    try {
      const response = await axios.get(`${API_URL}/SelectExtrato`, {
        params: { nome },
        withCredentials: true,
      });
      setExtrato(response.data);
    } catch (err) {
      console.log('SELECT ERROR: ', err);
    }
  };

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
    PromptBold: require("../assets/fonts/Prompt-Bold.ttf")
  });

  if (!loaded) {
    return null;
  }

  function renderItem({ item }) {
    return (
      <View>
        <ImageProps
          source={require("../assets/images/Iconzinho.png")}
          style={{ width: 50, height: 50, position: "relative", top: 65 }}
        />
        <View style={Styles.linhald}>
          <Text style={Styles.textossaldo}>{item.Valor > 0 ? `Foi recebido + R$ ${item.Valor}` : `Foi pago - R$ ${Math.abs(item.Valor)}`}</Text>
          <Text style={Styles.textosbeges}>{item.nomeSaida === respUser.nome ? item.nomeEntrada : item.nomeSaida}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.centro}>
        <ImageProps
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
        <Text style={Styles.textos}>Extrato</Text>
      </View>

      <View style={Styles.linhaabx}>
        <Text style={Styles.textossaldo}>Saldo em conta:</Text>
        <Text style={Styles.saldo}>{`R$ ${respUser.Saldo}`}</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 30 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={extrato}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      <Rodape />
    </View>
  );
}
