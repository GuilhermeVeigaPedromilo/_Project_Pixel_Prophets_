import React, { useState } from "react";//Importacao do React e do useState
import { View, Modal, TextInput, Text, Pressable, Alert, ScrollView } from "react-native";//Importacao dos componentes do react-native
import axios from "axios";//Importacao do axios
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

import { useFonts } from "expo-font";//Importacao do useFonts

import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps

import Styles from "../styles/StyleSheet";//Importacao do Styles

const API_URL = 'http://10.144.170.39:3000';//Constante da URL

export default function LoginModal({ visibleB, OnPressCloseB }) {

  const [nome, setNome] = useState(null);//Define o nome
  const [cpf, setCpf] = useState(null);//Define o cpf
  const [email, setEmail] = useState(null);//Define o email
  const [senha, setSenha] = useState(null);//Define a senha
  const [confsenha, setConfSenha] = useState(null);//Define o confsenha
  const navigation = useNavigation();//Define o iaon

  //Constante do Cadastro
  const handleRegister = async () => {
    const newUser = { nome, senha, email, cpf, };
    if (nome === "" || cpf === "" || email === "" || senha === "") {
      return Alert.alert(
        "The Pixel Bank",
        "Cadastro inválido: Insira todas as informações",
        [
          {
            text: "OK",
          },
        ]
      );
    } else if (confsenha != senha) {
      return Alert.alert(
        "The Pixel Bank",
        "A senha esta diferente ",
        [
          {
            text: "OK",
          },
        ]
      );
    } else {
      try {
        const response = await axios.post(`${API_URL}/Cadastro`, newUser);
        if (response.status == 201) {
          return Alert.alert(
            "The Pixel Bank",
            "Cadastro inválido: Estas informações ja constam no sistema",
            [
              {
                text: "OK",
              },
            ]
          );
        } else {
          console.log(`Cadastro realizado: ${nome} - ${senha} - ${email} - ${cpf}`)
          return Alert.alert(
            "The Pixel Bank",
            "Cadastro concluído: Agradecemos por sua escolha",
            [
              {
                text: "OK",
                OnPress: navigation.navigate('Splash'),
              },
            ]
          );
        }
      } catch (err) {
        console.log(err, "Erro")
      }

    }
  };

  //Constante das Fontes
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleB}>
        <View style={{ backgroundColor: "#F0EDE9", flex: 1 }}>
          <ScrollView>
            <View style={Styles.section}>
              <View>
                <Pressable onPress={OnPressCloseB}>
                  <ImageProps
                    source={require("../assets/images/setinha.png")}
                    style={{ margin: 20 }}
                  />
                </Pressable>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ImageProps
                  source={require("../assets/images/LogoBlue.png")}
                  style={Styles.ImgLogo}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={nome}
                      onChangeText={setNome}
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>NOME COMPLETO</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={cpf}
                      onChangeText={setCpf}
                      keyboardType="numeric"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>CPF</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email"
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>E-MAIL</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={senha}
                      onChangeText={setSenha}
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>SENHA</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <TextInput
                      style={Styles.formInput}
                      value={confsenha}
                      onChangeText={setConfSenha}
                    />
                    <View style={{ backgroundColor: "#F0EDE9" }}>
                      <Text style={Styles.formLabel}>CONFIRMAR SENHA</Text>
                    </View>
                  </View>
                  <View style={Styles.formGroup}>
                    <Btn
                      TouchStyle={[
                        Styles.frtButtons,
                        { backgroundColor: "#2F2C79", marginRight: 10 },
                      ]}
                      letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
                      children="Cadastrar"
                      OnPress={handleRegister}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
