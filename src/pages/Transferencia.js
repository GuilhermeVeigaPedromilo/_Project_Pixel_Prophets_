import React, { useEffect, useState } from "react";//Importacao do React, useState e do useEffect
import { TextInput, Button, View, Alert, Text } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

import Txt from "../components/TextComponent";//Importacao do Txt
import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps

import { TransferenciaConclusao } from "../partials/Transferencia";//Importacao da TransferenciaConclusao

import { useFonts } from "expo-font";//Importacao do useFonts

import Styles from "../styles/StyleSheet";//Importacao do Styles

import * as LocalAuthentication from "expo-local-authentication";//Importacao do LocalAuthentication

export default function Transferencia() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false); // Define visible state
  const [NumConta, setNumCont] = useState("");
  const [ValTransfe, setValTransfe] = useState("");
  const navigation = useNavigation();

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
  }, []);

  function handleLogout() {
    setIsAuthenticated(false);
    navigation.navigate("Home");
  }

  const TransfFinalizada = () => {
    return Alert.alert("Transferência finalizada", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={Styles.container}>
      <View style={{ alignItems: "center" }}>
        <ImageProps
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />

        <View style={{ width: 300 }}>
          <Txt
            Texto="Para quem você deseja fazer o transferência?"
            TextStyle={Styles.textos}
          />
        </View>

        <View style={Styles.formGroup}>
          <TextInput style={Styles.formInput} Placeholder="CPF" />
          <View style={{ backgroundColor: "#F0EDE9" }}>
            <Text style={[Styles.formLabel, { fontSize: 11, fontFamily: "Prompt", }]}>
              CPF, CELULAR, E-MAIL OU CHAVE ALEATÓRIA
            </Text>
          </View>
          <ImageProps
            source={require("../assets/images/QRCode.png")}
            style={{ width: 300, height: 118, borderRadius: 10, marginTop: 50 }}
          />
        </View>

        <Btn
          OnPress={() => setVisible(true)}
          TouchStyle={[
            Styles.frtButtons,
            { backgroundColor: "#2F2C79", marginRight: 10 },
          ]}
          letras={[Styles.firstButtons, { color: "#F5E2CF", fontFamily: "Prompt" }]}
          children="Continuar"        />

        <TransferenciaConclusao
          visible={visible}
          NumeroConta={NumConta}
          ValorTransfe={ValTransfe}
          OnPress={() => TransfFinalizada()}
        />
      </View>
    </View>
  );
}
