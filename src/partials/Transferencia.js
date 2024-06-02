import React, {useState, useEffect} from "react";//Importacao do React
import { View, Modal, Text, Pressable, Image} from "react-native";//Importacao dos componentes do react-native
import { useNavigation } from "@react-navigation/native";//Importacao do useNavigation

const API_URL = 'http://192.168.15.132:3000';//Constante da URL


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

function TransferenciaConclusao({
  visible,
  ValorTransfe,
  numContaDestino,
  OnPressClose,
}) {

    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [cpfUser, setCpfUser] = useState('');
    const [senhaUser, setSenhaUser] = useState('');
    const [respUser, setRespUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
    <Modal animationType="slide" transparent={true} visible={visible}>
    <View style={Styles.container}>
    <View style={Styles.section}>
      <View>
        <Pressable onPress={OnPressClose}>
          <Image
            source={require("../assets/images/setinha.png")}
            style={{ margin: 20 }}
          />
        </Pressable>
      </View>


      <View style={Styles.formEverything} >
      <Text>{}</Text> {/*Puxar informações da conta destino*/}
        <Text>{ValorTransfe}</Text>
        <View style={Styles.formGroup}>
          <ButtonComponent
            TouchStyle={[ Styles.frtButtons, { backgroundColor: "#2F2C79", marginRight: 10 }]}
            letras={[Styles.firstButtons, { color: "#F5E2CF" }]}
            children="Entrar"
            
          />
        </View>
      </View>
    </View>
  </View>
  </Modal>
  </View>
  );
}

export { TransferenciaConfirmacao, TransferenciaConclusao };
