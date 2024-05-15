import React, { useState, useEffect } from "react"; //Importacao do useState e do useEffect
import { View, Modal, TextInput, Text, Pressable, Alert, ScrollView } from "react-native"; //Importacao dos componentes do react-native
import axios from "axios"; //Importacao do axios

import { useNavigation } from "@react-navigation/native"; 
import { useFonts } from "expo-font";

IP = "10.144.170.78"

import Btn from "../components/ButtonComponent"; // Importacao do componente Btn
import ImageProps from "../components/ImageComponent"; // Importacao do componente ImageProps

import Styles from "../styles/StyleSheet"; //Importacao do Styles

export default function LoginModal({ visibleB, OnPressCloseB }) {
  ;
  const navigation = useNavigation();

  // Banco de dados:
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const numConta = `${cpf}`

  const atualizarDados = async () => {
    try {
      if(nome === ''){
        alert('Cadastro inválido: Insira todos os dados solicitados')
      }else if(cpf === ''){
        alert('Cadastro inválido: Insira todos os dados solicitados')
      }else if(email === ''){
        alert('Cadastro inválido: Insira todos os dados solicitados')
      }else if(senha === ''){
        alert('Cadastro inválido: Insira todos os dados solicitados')
      }else{
        await axios.post(`http://${IP}:3000/Cadastro`, {
          nome,
          cpf,
          email,
          senha,
          numConta,
        });
      }
      
      
    } catch (error) {
      console.error("Erro ao inserir dados", error);
      Alert.alert("Erro ao inserir dados");
    }
  };

const [loaded] = useFonts({
  "Prompt": require("../assets/fonts/Prompt-Regular.ttf"),
});

if (!loaded) {
  return null;
}

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visibleB}>
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
          <View style={{  justifyContent: "center", alignItems: "center", }}>
            <ImageProps
              source={require("../assets/images/LogoBlue.png")}
              style={Styles.ImgLogo}
            />

            <View style={{ alignItems: "center", }} >
              <View style={Styles.formGroup} >
                <TextInput style={Styles.formInput} Placeholder="NOME COMPLETO" value={nome} onChange={setNome} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>NOME COMPLETO</Text>
                </View>
              </View>
          
              <View style={Styles.formGroup}>
                <TextInput style={Styles.formInput} Placeholder="CPF" value={cpf} onChange={setCpf} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>CPF</Text>
                </View>
              </View>

              <View style={Styles.formGroup} >
                <TextInput style={Styles.formInput} Placeholder="E-MAIL" value={email} onChange={setEmail} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>E-MAIL</Text>
                </View>
              </View>
          
              <View style={Styles.formGroup}>
                <TextInput style={Styles.formInput} Placeholder="SENHA" value={senha} onChange={setSenha} />
                <View style={{ backgroundColor: "#F0EDE9" }}>
                  <Text style={Styles.formLabel}>SENHA</Text>
                </View>
              </View>

              <View style={Styles.formGroup}>
                <TextInput style={Styles.formInput} Placeholder="CONFIRMAR SENHA" />
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
                  OnPress={atualizarDados}
                />
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", }}>
              <ImageProps
                source={require("../assets/images/LogoBlue.png")}
                style={Styles.ImgLogo}
              />

              <View style={{ alignItems: "center", }} >
                <View style={Styles.formGroup}>
                  <TextInput
                    style={Styles.formInput}
                    value={nome}
                    onChangeText={setNome} // Corrigido para onChangeText
                  />
                  <View style={{ backgroundColor: "#F0EDE9" }}>
                    <Text style={Styles.formLabel}>NOME COMPLETO</Text>
                  </View>
                </View>
                <View style={Styles.formGroup}>
                  <TextInput
                    style={Styles.formInput}
                    value={cpf}
                    onChangeText={setCpf} // Corrigido para onChangeText
                  />
                  <View style={{ backgroundColor: "#F0EDE9" }}>
                    <Text style={Styles.formLabel}>CPF</Text>
                  </View>
                </View>
                <View style={Styles.formGroup}>
                  <TextInput
                    style={Styles.formInput}
                    value={email}
                    onChangeText={setEmail} // Corrigido para onChangeText
                  />
                  <View style={{ backgroundColor: "#F0EDE9" }}>
                    <Text style={Styles.formLabel}>E-MAIL</Text>
                  </View>
                </View>
                <View style={Styles.formGroup}>
                  <TextInput
                    style={Styles.formInput}
                    value={senha}
                    onChangeText={setSenha} // Corrigido para onChangeText
                  />
                  <View style={{ backgroundColor: "#F0EDE9" }}>
                    <Text style={Styles.formLabel}>SENHA</Text>
                  </View>
                </View>


                <View style={Styles.formGroup}>
                  <TextInput style={Styles.formInput} Placeholder="CONFIRMAR SENHA" />
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
                    OnPress={atualizarDados}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}