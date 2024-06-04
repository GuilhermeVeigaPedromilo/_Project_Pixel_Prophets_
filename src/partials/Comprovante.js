import React, { useState, useEffect } from "react";//Importacao do React
import { View, Modal, Text, Pressable, Image } from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

const API_URL = 'http://192.168.0.189:3000';//Constante da URL


import { useFonts } from "expo-font";//Importacao do useFonts

import Styles from "../styles/StyleSheet";//Importacao do Styles

import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps
import InputProps from "../components/InputComponent";//Importacao do InputProps
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function Comprovante({route}) {
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [cpfUser, setCpfUser] = useState('');
    const [senhaUser, setSenhaUser] = useState('');
    const [respUser, setRespUser] = useState('');
    const [respUserConta, setRespUserConta] = useState('');
    const [respValTransfe, setRespValTransfe] = useState("");
    const [respUserSelect, setRespUserSelect] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
  
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
          const session = await AsyncStorage.removeItem('userContaSession',);
          console.log('DeleteCont');
        }
        catch (err) { console.log('Erro delete: ', err) }
      }

      const DeletarSessionUser = async () => {
        try {
          const session = await AsyncStorage.removeItem('userSession',);
          console.log('DeleteCont');
        }
        catch (err) { console.log('Erro delete: ', err) }
      }

      const runExtrato = async () => {
        const numContaEntrada = respUser.numConta
        const numContaSaida = respUserSelect.numConta
        const Valor = respValTransfe
        const nomeEntrada = respUser.nome
        const nomeSaida = respUserSelect.nome
        const Data = currentDate
        try {
            const arquivado = await axios.post(`${API_URL}/Comprovante`, 
                {numContaEntrada, numContaSaida, Valor, nomeEntrada, nomeSaida, Data}
            )
            console.log('Arquivado com sucesso: ', arquivado)
        }
        catch (err) {
            console.log('Erro para arquivar o comprovante')
        }
      }

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
        <View style={Styles.section}>
          <View>
            <Pressable onPress={RestartAsync}>
              <Image
                source={require("../assets/images/setinha.png")}
                style={{ margin: 20 }}
              />
            </Pressable>
          </View>
  
          <View style={{ alignItems: 'center', margin: '10%', gap: 20 }} >
            <ImageProps
              source={require("../assets/images/LogoBlue.png")}
              style={{width: 100, height: 60,}}
            />
            <Text>Transferência finalizada</Text>
           <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 15, }} >Valor de transferência: <Text style={{fontWeight: 'bold' }} >{`R$${respValTransfe}`}</Text></Text>
            </View>
            <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 15, }} >Depositado por: <Text style={{fontWeight: 'bold' }} >{respUser.nome}</Text></Text>
            </View>
            <View style={{ width: '95%' }} >
              <Text style={{ fontSize: 15, }} >Destino: <Text style={{fontWeight: 'bold' }} >{respUserConta}</Text></Text>
            </View>
            <View style={{ width: '95%' }} >
            <Text style={{ fontSize: 15, }} >Proprietário da conta destino: <Text style={{fontWeight: 'bold' }} >{respUserSelect.nome}</Text></Text>
            </View>
            <View style={{ width: '95%' }} >
              <Text style={{ fontSize: 15 }} >Data: <Text style={{ fontWeight: 'bold'}}>{currentDate}</Text></Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  export default Comprovante;