import React, { useState, useEffect } from "react";//importação do React
import { View, Modal, Text, Pressable, Image, ScrollView } from "react-native";//importação dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//importação do useNavigation
import AsyncStorage from "@react-native-async-storage/async-storage";//importação do AsyncStorage
import axios from "axios";//importação do axios

const API_URL = 'http://10.144.170.39:3000';//Constante da URL

import { useFonts } from "expo-font";//importação do useFonts

import Styles from "../styles/StyleSheet";//importação do Styles

import Btn from "../components/ButtonComponent";//importação do Btn
import ImageProps from "../components/ImageComponent";//importação da ImageProps
import InputProps from "../components/InputComponent";//importação do InputProps
import ButtonComponent from "../components/ButtonComponent";//importação do ButtonComponent

function Comprovante({ route }) {
  const navigation = useNavigation();//Define o navigation
  const [user, setUser] = useState('');//Define o user
  const [cpfUser, setCpfUser] = useState('');//Define o cpfUser
  const [senhaUser, setSenhaUser] = useState('');//Define o senhaUser
  const [respUser, setRespUser] = useState('');//Define o respUser
  const [respUserConta, setRespUserConta] = useState('');//Define o respUserConta
  const [respValTransfe, setRespValTransfe] = useState("");//Define o respValTransfe
  const [respUserSelect, setRespUserSelect] = useState('');//Define o respUserSelect
  const [loading, setLoading] = useState(true);//Define o loading
  const [currentDate, setCurrentDate] = useState('');//Define o currentDate

  //Constante das Fontes
  const [loaded] = useFonts({
    Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //Constante do useEffect
  useEffect(() => {
    const loadSession = async () => { //Função para mostrar todos os dados do usuário
      try {
        const session = await AsyncStorage.getItem('userSession');
        if (session) {
          const { cpfUser, senhaUser, respUser } = JSON.parse(session);
          setCpfUser(cpfUser); //Onde setCpfUser é setado como cpfUser
          setSenhaUser(senhaUser); //Onde setSenhaUser é setado como senhaUser
          setRespUser(respUser); //Onde setRespUser é setado como respUser);
        }
        loadContaSelect
      } catch (error) {
        console.log('Failed to load session', error);//Caso o comprovante haja um erro de dados aparecera esse erro
      } finally {
        setLoading(false); //Define loading como falso
      }
    };
    const loadContaSelect = async () => { //Função para mostrar todos os dados da conto onde você transferiu
      try {
        const session = await AsyncStorage.getItem('userContaSession');
        if (session) {
          const { respUserConta, respValTransfe, respUserSelect } = JSON.parse(session);
          setRespUserConta(respUserConta); //Onde setRespUserConta é setado como respUserConta
          setRespValTransfe(respValTransfe); //Onde setRespValTransfe é setado como respValTransfe
          setRespUserSelect(respUserSelect); //Onde setRespUserSelect é setado como respUserSelect);
        }
      } catch (errorB) {
        console.log('Failed to load session', errorB); //Caso o comprovante haja um erro de dados aparecera esse erro
      } finally {
        setLoading(false); //Define loading como falso
      }
    };

    loadSession();
    loadContaSelect();
    setCurrentDate(new Date().toLocaleString()); // Set the current date and time
  }, []);

  //Constante para a apagar a conta selecionada
  const DeletarContaSelect = async () => {
    try {
      const session = await AsyncStorage.removeItem('userContaSession',);
      console.log('DeleteCont');
    }
    catch (err) { console.log('Erro delete: ', err) }
  }

  //Constante para log-out
  const DeletarSessionUser = async () => {
    try {
      const session = await AsyncStorage.removeItem('userSession',);
      console.log('DeleteCont');
    }
    catch (err) { console.log('Erro delete: ', err) }
  }

// Função que envia os dados para gerar o comprovante e armazenar o extrato
  const runExtrato = async () => {
    const numContaEntrada = respUser.numConta
    const numContaSaida = respUserSelect.numConta
    const Valor = respValTransfe
    const nomeEntrada = respUser.nome
    const nomeSaida = respUserSelect.nome
    const Data = currentDate
    try {
      const arquivado = await axios.post(`${API_URL}/Comprovante`,
        { numContaEntrada, numContaSaida, Valor, nomeEntrada, nomeSaida, Data }
      )
      console.log('Arquivado com sucesso: ', arquivado)
    }
    catch (err) {
      console.log('Erro para arquivar o comprovante')
    }
  }

  // RestartAsync -- Inicia as duas consultas ao mesmo tempo
  const RestartAsync = async () => {
    try {
      runExtrato()
      await Promise.all([DeletarContaSelect(), DeletarSessionUser()])
      console.log('RestartAsync');
      navigation.navigate("Home");
    }
    catch (err) { console.log('Erro restart: ', err) }
  }

  return (
    <View style={Styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={Styles.section}>
          <View>
            <Pressable onPress={RestartAsync}>
              <Image
                source={require("../assets/images/setinha.png")}
                style={{ marginTop: "12%", marginLeft: "4%" }}
              />
            </Pressable>
          </View>

          <View style={{ alignItems: 'center', margin: '1%', gap: 20 }} >
            <ImageProps
              source={require("../assets/images/LogoBlue.png")}
              style={Styles.ImgLogo}
            />
            <Text style={Styles.textosCard}>Transferência finalizada</Text>

            {/* Comprovante  */}
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Valor de transferência: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{`R$${respValTransfe}`}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Depositado por: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUser.nome}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Conta de Destino: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUserConta}</Text></Text>
              </View>
              <View style={Styles.linhaComprovante} >
                <Text style={Styles.textosComprovante} >Depositado para: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }} >{respUserSelect.nome}</Text></Text>
              </View>
              <View style={[Styles.linhaComprovante, { borderBottomWidth: 0 }]} >
                <Text style={Styles.textosComprovante} >Data: <Text style={{ fontWeight: 'bold', color: "#2F2C79" }}>{currentDate}</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Comprovante;