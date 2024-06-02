import React, {useState, useEffect} from "react";//Importacao do React
import { View, Modal, Text, Pressable, Image} from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

const API_URL = 'http://192.168.43.51:3000';//Constante da URL


import { useFonts } from "expo-font";//Importacao do useFonts

import Styles from "../styles/StyleSheet";//Importacao do Styles

import Btn from "../components/ButtonComponent";//Importacao do Btn
import ImageProps from "../components/ImageComponent";//Importacao da ImageProps
import InputProps from "../components/InputComponent";//Importacao do InputProps
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "axios";

function TransferenciaConfirmacao({ visible, OnPress }) {
  const navigation = useNavigation();



  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={Styles.container}>
          <ImageProps
            source={require("../assets/images/LogoBlue.png")}
            style={Styles.ImgLogo}
          />
          <Txt Texto="Faça login" TextStyle={Styles.textos} />
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
      </Modal>
    </View>
  );
}

function TransferenciaConclusao({route}) {
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

  const DeletarConaSelect = async () => {
    try {
      const session = await AsyncStorage.removeItem('userContaSession');
      console.log('Select Delete');
      navigation.navigate('Transferencia');
    }
    catch (err)
    {console.log('Erro delete: ', err)}
  }

  return (
        <View style={Styles.container}>
          <View style={Styles.section}>
            <View>
              <Pressable onPress={DeletarConaSelect}>
                <Image
                  source={require("../assets/images/setinha.png")}
                  style={{ margin: 20 }}
                />
              </Pressable>
            </View>

            <View style={{alignItems: 'center', margin: '10%', gap: 30}} >
            <ImageProps
          source={require("../assets/images/LogoBlue.png")}
          style={Styles.ImgLogo}
        />
              <View style={{width: '95%'}} >
              <Text style={{fontSize: 25,}} >{respUserConta}<Text style={{fontSize: 12}}>{` (${respUserSelect.nome})`}</Text></Text>
              <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
              </View>
              <View style={{width: '95%'}} >
              <Text style={{fontSize: 25}} >{`R$${respValTransfe}`}</Text>
              <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
              </View>
              <View style={{width: '95%'}} >
              <Text style={{fontSize: 25}} >Data: <Text style={{fontSize: 20}}>{currentDate}</Text></Text>
              <View style={{ backgroundColor: 'black', width: '100%', height: 1, }}></View>
              </View>
              </View>
              <View style={[Styles.formGroup, {alignItems: 'center'}]}>
                <ButtonComponent
                  TouchStyle={[Styles.frtButtons, { backgroundColor: "#2F2C79", marginRight: 10 }]}
                  letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
                  children="Pagar"
                />
              </View>
            </View>
          </View>
  );
}

export { TransferenciaConfirmacao, TransferenciaConclusao };
