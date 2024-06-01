import React, { useEffect, useState } from "react"; //Importacao do useState e do useEffect
import { useNavigation } from "@react-navigation/native"; //Importacao do useNavigation
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, Text, View, ScrollView, FlatList } from "react-native"; //Importacao dos componentes do react-native



import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

import Styles from "../styles/StyleSheet"; // Importacao do Styles

import Txt from "../components/TextComponent"; // Importacao do Txt
import ImageProps from "../components/ImageComponent"; // Importacao da ImageProps
import InputProps from "../components/InputComponent"; // Importação do InputProps
import Rodape from "../partials/Rodapé"; //Importacao do Rodape

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
        style={{ width: 50, height: 50, position: "relative", top: 65 }}
      />
      <View style={Styles.linhald}>
        <Text style={Styles.textossaldo}>{item.text}</Text>
        <Text style={Styles.textosbeges}>{item.name}</Text>
      </View>
    </View>
  );
}

export default function Extrato({route}) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    fetchUser();
  }, []);

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
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
    PromptBold: require("../assets/fonts/Prompt-Bold.ttf")
  });

  if (!loaded) {
    return null;
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

      <View style={Styles.linhaabx}>
        <Text style={Styles.data}>03/05/2024</Text>
      </View>

      <View style={{ flex: 1, marginLeft: 30 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <Rodape />
    </View>
  );
}
