import { View, ImageBackground, Text, Alert } from "react-native"; //importação dos componentes do react-native
import React, { useState, useEffect } from "react"; //importação do React, useState e do useEffect
import axios from "axios";//importação do axios

import Btn from "../components/ButtonComponent"; //importação do Btn
import LoginModal from "../partials/Login"; //importação do LoginModal
import CadastroModal from "../partials/Cadastro"; //importação do CadastroModal

import Styles from "../styles/StyleSheet"; //importação do Styles

import { useFonts } from "expo-font";//importação do useFonts
import { StatusBar } from "expo-status-bar";//importação do StatusBar
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://10.144.170.39:3000';//Constante da URL

export default function First({ navigation }) {
  const [visibleA, setVisibleA] = useState(false);
  const [visibleB, setVisibleB] = useState(false);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);

  // Pega as informações e verifica se existem no banco, para o Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/Login`,
        { cpf, senha },
        { withCredentials: true }
      );

      // Salvar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('userSession', JSON.stringify({
        cpfUser: cpf,
        senhaUser: senha,
        respUser: response.data
      }));
      console.log(JSON.stringify(response.data))
      setVisibleA(false);
      navigation.navigate("RotasDrawer", {
        screen: "Home",
        params: { cpfUser: cpf, senhaUser: senha, respUser: response.data },
      });

    } catch (err) {
      setError("Invalid credentials");
    }
  };
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <StatusBar backgroundColor="#F0EDE9" />
      <ImageBackground
        source={require("../assets/images/Fundo1.png")}
        style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
      >
        <View style={Styles.firstFooter}>
          <Btn
            TouchStyle={[
              Styles.frtButtons,
              { backgroundColor: "#F5E2CF", marginRight: 10 },
            ]}
            letras={[Styles.firstButtons, { color: "#2F2C79" }]}
            children="Entrar"
            OnPress={() => setVisibleA(true)}
          />

          <Btn
            TouchStyle={[
              Styles.frtButtons,
              { backgroundColor: "#2F2C79", marginLeft: 10 },
            ]}
            letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
            children="Criar conta"
            OnPress={() => setVisibleB(true)}
          />
        </View>

        <LoginModal
          setCpf={setCpf}
          setSenha={setSenha}
          handleLogin={handleLogin}
          visibleA={visibleA}
          OnPressCloseA={() => setVisibleA(false)}
          OnPress={() => {
            navigation.navigate("Home");
          }}
          error={error ? error : null}
        />

        <CadastroModal
          visibleB={visibleB}
          OnPressCloseB={() => setVisibleB(false)}
        />
      </ImageBackground>
    </View>
  );
}
