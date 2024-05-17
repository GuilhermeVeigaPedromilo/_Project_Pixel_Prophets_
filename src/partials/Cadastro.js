import React, { useState } from "react";
import { View, Modal, TextInput, Text, Pressable, Alert, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const IP = "10.144.170.22"; // Confirir toda vez que iniciar o projeto

import Btn from "../components/ButtonComponent";
import ImageProps from "../components/ImageComponent";
import Styles from "../styles/StyleSheet";

export default function LoginModal({ visibleB, OnPressCloseB }) {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setConfSenha] = useState("");

  const InserirDados = () => {
    if (nome === "" || cpf === "" || email === "" || senha === "") {
      Alert.alert("Cadastro inválido", "Insira todos os dados solicitados");
    }else if(confsenha != senha) {
      Alert.alert('A senha esta diferente');
    } else {
      axios.post(`http://${IP}:3000/Cadastro`, {
          nome,
          cpf,
          email,
          senha,
        })
        .then(() => {
          Alert.alert(
            "Cadastro realizado",
            "Seu cadastro foi realizado com sucesso!",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
              },
            ]
          );
        })
        .catch((error) => {
          console.error("Erro ao inserir dados", error);
          Alert.alert("Erro ao inserir dados");
        });
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleB}>
        <ScrollView>
          <View style={Styles.section}>
            <View>
              <Pressable onPress={OnPressCloseB}>
                <ImageProps
                  source={require("../assets/images/setinha.png")}
                  style={{ marginTop: 20 }}
                />
              </Pressable>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ImageProps
                source={require("../assets/images/LogoBlue.png")}
                style={Styles.ImgLogo}
              />
              <View style={{ alignItems: "center" }} >
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
                    keyboardType="password"
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
                    keyboardType="password"
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
                    letras={[
                      Styles.firstButtons,
                      { color: "#F0EDE9" },
                    ]}
                    children="Entrar"
                    OnPress={InserirDados}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  
  )}