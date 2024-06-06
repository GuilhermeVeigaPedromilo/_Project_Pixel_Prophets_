import React, { useState, useEffect } from "react";//Importacao do React
import { View, Text, Pressable, Image, Alert,  } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation
import axios from "axios";//Importacao do axios
import AsyncStorage from "@react-native-async-storage/async-storage";//Importacao do AsyncStorage

const API_URL = 'http://192.168.0.189:3000';//Constante da URL

import { useFonts } from "expo-font";//Importacao do useFonts

import Styles from "../styles/StyleSheet";//Importacao do Styles

import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps
import InputProps from "../components/InputComponent";//Importacao do InputProps
import ButtonComponent from "../components/ButtonComponent";//Importacao do ButtonComponent

function TransferenciaConfirmacao({ }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState(null);

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
        loadContaSelect
      } catch (error) {
        console.log('Failed to load session', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);
  
  return (
    <View>
        <View style={Styles.container}>
          <ImageProps
            source={require("../assets/images/LogoBlue.png")}
            style={Styles.ImgLogo}
          />
          <Text Texto="Faça login" TextStyle={Styles.textos} />
          <View style={Styles.caixas}>
            <ImageProps
              style={Styles.imagesicones}
              source={require("../assets/images/People.jpg")}
            />
          </View>
          <View style={Styles.caixas}>
            <ImageProps
              style={Styles.imagesicones}
              source={require("../assets/images/Cadeado.png")}
            />
            <InputProps InputStyle={Styles.caixasenha} Placeholder="Senha" />
            <Btn
              TouchStyle={[
                Styles.frtButtons,
                { backgroundColor: "#F5E2CF", marginRight: 10 },
              ]}
              letras={[Styles.firstButtons, { color: "#2F2C79" }]}
              children="Concluir"
              OnPress={() => navigation.navigate('Transferencia')}
            />
          </View>
        </View>
    </View>
  );
}

function TransferenciaConclusao({ route }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [cpfUser, setCpfUser] = useState('');
  const [senhaUser, setSenhaUser] = useState('');
  const [respUser, setRespUser] = useState(null);
  const [respUserConta, setRespUserConta] = useState('');
  const [respValTransfe, setRespValTransfe] = useState("");
  const [respUserSelect, setRespUserSelect] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [visible, setVisible] = useState(false);

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
        loadContaSelect
      } catch (error) {
        console.log('Failed to load session', error);
      } finally {
        setLoading(false);
      }
    };
    const loadContaSelect = async () => {
      try {
        const session = await AsyncStorage.getItem('userContaSession');
        if (session) {
          const { respUserConta, respValTransfe, respUserSelect } = JSON.parse(session);
          setRespUserConta(respUserConta);
          setRespValTransfe(respValTransfe);
          setRespUserSelect(respUserSelect);
        }
      } catch (errorB) {
        console.log('Failed to load session', errorB);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
    loadContaSelect();
    setCurrentDate(new Date().toLocaleString()); // Set the current date and time
  }, []);

  const DeletarContaSelect = async () => {
    try {
      const session = await AsyncStorage.removeItem('userContaSession');
      console.log('Select Delete');
      navigation.navigate('Transferencia');
    }
    catch (err) { console.log('Erro delete: ', err) }
  }

  async function updateUserA() {
    const Saldo = parseFloat(respUser.Saldo) - parseFloat(respValTransfe)
    try {
      const response = await axios.put(
        `${API_URL}/updateUserA/${respUser.id}`,
        { Saldo }
      );
      console.log(`UPDATE SALDO: ${respUser.id}`)
    } catch (error) {
      console.log(`Erro ao atualizar SaldoA: ${error}`);
    }
  }

  async function updateUserB() {
    const Saldo = parseFloat(respUserSelect.Saldo) + parseFloat(respValTransfe)
    try {
      const response = await axios.put(
        `${API_URL}/updateUserB/${respUserSelect.id}`,
        { Saldo }
      );
      console.log(`UPDATE SALDO: ${respUserSelect.id}`)
    } catch (error) {
      console.log(`Erro ao atualizar SalsoB: ${error}`);
    }
  }

  const runFunctions = async () => {
    try {
      await Promise.all([updateUserA()], [updateUserB()]);
      console.log('Sucesso Transferência')
      navigation.navigate("Comprovante");
    } catch {
      console.log('Erro ao atualizar saldo');
    }
  }

  const Concluir = () => {
    return Alert.alert(
      `${respUser.nome}`,
      "Tem certeza que deseja concluir a transferência?",
      [
        {
          text: "CANCEL",
          onPress: DeletarContaSelect,
        },
        {
          text: "OK",
          onPress: runFunctions,
        },
      ]
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.section}>
        <View>
          <Pressable onPress={DeletarContaSelect}>
            <Image
              source={require("../assets/images/setinha.png")}
              style={{ margin: 20 }}
            />
          </Pressable>
        </View>

        <View style={{ alignItems: 'center', margin: '10%', gap: 30 }} >
          <ImageProps
            source={require("../assets/images/LogoBlue.png")}
            style={Styles.ImgLogo}
          />
          <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 25, }} >{respUserConta}<Text style={{ fontSize: 12 }}>{` (${respUserSelect.nome})`}</Text></Text>
            <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
          </View>
          <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 25 }} >{`R$${respValTransfe}`}</Text>
            <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
          </View>
          <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 25 }} >Data: <Text style={{ fontSize: 20 }}>{currentDate}</Text></Text>
            <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
          </View>
        </View>
        <View style={[Styles.formGroup, { alignItems: 'center' }]}>
          <ButtonComponent
            TouchStyle={[Styles.frtButtons, { backgroundColor: "#2F2C79", marginRight: 10 }]}
            letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
            children="Pagar"
            OnPress={Concluir}
          />
        </View>
      </View>
    </View>
  );
}

export { TransferenciaConfirmacao, TransferenciaConclusao };
