import React, { useEffect, useState } from "react";//Importacao do React, useState e do useEffect
import { TextInput, Pressable, View, Alert, Text } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation
import axios from "axios"; //Importacao do axios

const API_URL = 'http://192.168.15.132:3000';//Constante da URL


import Rodape from "../partials/Rodapé"; //Importacao do Rodape
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps

import { TransferenciaConclusao } from "../partials/Transferencia";//Importacao da TransferenciaConclusao

import { useFonts } from "expo-font";//Importacao do useFonts
import { Ionicons } from "@expo/vector-icons";//Importacao do Ionicons

import Styles from "../styles/StyleSheet";//Importacao do Styles

import * as LocalAuthentication from "expo-local-authentication";//Importacao do LocalAuthentication
import AsyncStorage from "@react-native-async-storage/async-storage";//Importacao do AsyncStorage
import Btn from "../components/ButtonComponent";

export default function Transferencia({route}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false); // Define visible state
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Authetication with FACEId and FingerPrint

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled);

    if (!isBiometricEnrolled) {
      return Alert.alert(
        "Login",
        "Não foi encontrada a biometria. Insira a senha da sua conta",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("TransferenciaConfirmacao"),
          },
        ]
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Coloque sua digital",
      fallbackLabel: "Erro, biometria incorreta",
    });
  }

  useEffect(() => {
    verifyAvailableAuthentication();
    handleAuthentication();
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

  function handleLogout() {
    setIsAuthenticated(false);
    navigation.navigate("Home");
  }

{ /* const TransfFinalizada = () => {
    return Alert.alert("Transferência finalizada", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };*/}

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const [ValTransfe, setValTransfe] = useState("");  
  const [numConta, setNumContDestino] = useState("");

  const [error, setError] = useState('');

  const SelectConta = async () => {
    try {
         const response = await axios.post(
        `${API_URL}/SelectConta`,
        { numConta },
        { withCredentials: true }
      );
          console.log(`SelectConta: ${JSON.stringify(response)}`)
           // Salvar dados do usuário no AsyncStorage
           await AsyncStorage.setItem('userContaSession', JSON.stringify({
            respUserConta: numConta,
            respUserSelect: response.data,
          }));
          setVisible(true);
        } catch (err) {
          setError('Conta inexistente')
          console.log('Erro, conta inexistente')
        }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.transferpagina}>
        <ImageProps
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
        <Text>{error}</Text>
        <View style={Styles.formGroup}>
          <TextInput style={Styles.formInput} onChangeText={setNumContDestino} keyboardType="numeric" />
          <View style={{ backgroundColor: "#F0EDE9" }} >
            <Text style={[Styles.formLabel, { fontSize: 11, fontFamily: "Prompt", }]}>
              INSIRA O NÚMERO DA CONTA 
            </Text>
          </View>
        </View>
        <View style={Styles.formGroup}>
          <TextInput style={Styles.formInput} onChangeText={setValTransfe} keyboardType="numeric"/>
          <View style={{ backgroundColor: "#F0EDE9" }}>
            <Text style={[Styles.formLabel, { fontSize: 11, fontFamily: "Prompt", }]}>
              INSIRA O VALOR PARA TRANSFERÊNCIA 
            </Text>
          </View>
        </View>

        <Btn
        OnPress={SelectConta}
          TouchStyle={[
            Styles.frtButtons,
            { backgroundColor: "#2F2C79", marginRight: 10 },
          ]}
          letras={[Styles.firstButtons, { color: "#F5E2CF", fontFamily: "Prompt" }]}
          children="Continuar"        />

        <TransferenciaConclusao
          visible={visible}
          ValorTransfe={ValTransfe}
          OnPressClose={() => setVisible(false)}
          
        />
      
      </View>
      <Rodape />
    </View>
  );
}


