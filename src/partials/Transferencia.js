import React from "react";
import { View, Modal } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Btn from "../components/ButtonComponent";
import Styles from "../styles/StyleSheet";
import ImageProps from "../components/ImageComponent";
import Txt from "../components/TextComponent";
import InputProps from "../components/InputComponent";

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
  OnPress,
  ValorTransfe,
  NumeroConta,
}) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={Styles.container}>
          <Txt Texto={`Número da conta: ${NumeroConta}`} style={{ fontFamily: "Prompt" }} />
          <Txt Texto={`Valor da transferência: R$${ValorTransfe}`} style={{ fontFamily: "Prompt" }} />
          <Btn OnPress={OnPress} children="Concluir" />
        </View>
      </Modal>
    </View>
  );
}

export { TransferenciaConfirmacao, TransferenciaConclusao };
