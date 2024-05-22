import React, {useState, useEffect} from "react";//Importacao do React, do useState e do useEffect
import { Text, View, Pressable, FlatList } from "react-native"; //Importacao dos componentes do react-native
import axios from "axios";//Importacao do axios

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

import Styles from "../styles/StyleSheet"; //Importacao do Styles

import ImageProps from "../components/ImageComponent"; //Importacao do ImageProps

const API_URL = 'http://10.144.170.66:3000';//Constante da URL

export default function Home({navigation}) {
  const [user, setUser] = useState(null);


  useEffect(() => {
      fetchUser();
  }, []);

  const fetchUser = async () => {
      try {
          const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
          setUser(JSON.stringify(response.data));
          console.log(`${JSON.stringify(response.data)}`)
          console.log(user);
      } catch (err) {
          console.log(err);
          navigation.navigate('Login');
      }
  };

  const handleLogout = () => {
      setUser(null);
      navigation.navigate('Login');
  };


  const flatData = [
    {
      key: "1",
      image: "cash",
      text: "Pagar",
    },
    {
      key: "2",
      image: "card",
      text: "Cartões",
    },
    {
      key: "3",
      image: "receipt",
      text: "Extrato",
    },
    {
      key: "4",
      image: "wallet",
      text: "Poupança",
    },
  ];

  const [loaded] = useFonts({
    "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
        <View style={Styles.quadradocontainer}>
          <View style={{ flexDirection: "row" }}>
            <ImageProps
              source={require("../assets/images/saldo.png")}
              style={{ width: 30, height: 30, marginLeft: 15, marginTop: 10 }}
            />

            <Text style={{ color: "white", marginLeft: 10, marginTop: 15, fontFamily: "Prompt" }}>
            Saldo disponível
            </Text>
          </View>

          <View style={{ width: "98%", marginTop: 30, marginLeft: "2%" }}>
            <Text style={{ color: "white", fontSize: 30, fontFamily: "Prompt" }}>R$ 28.000,00</Text>
          </View>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={flatData}
          horizontal
          renderItem={({ item }) => (
            <Pressable
              style={[Styles.quadradocontainer2, { width: 150, height: 100 }]}
              onPress={() => navigation.navigate("Cartoes")}
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
                  marginTop: 10,
                  fontFamily: "Prompt"
                }}
              >
                {item.text}
              </Text>
            </Pressable>
          )}
        />

        <Text style={{ color: "#000020", textAlign: "center", fontSize: 20, fontFamily: "Prompt" }}>
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

        <ImageProps
          source={require("../assets/images/cartaozica.png")}
          style={{
            width: "98%",
            height: "32%",
            borderRadius: 18,
            marginBottom: "7%",
          }}
        />
      </View>
    </View>
  );
}
