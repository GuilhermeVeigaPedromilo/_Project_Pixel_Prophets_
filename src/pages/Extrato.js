import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, FlatList, ScrollView } from "react-native";

const API_URL = 'http://10.144.170.39:3000'; // Constante do URL

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";//importação do Ionicons

import Styles from "../styles/StyleSheet";
import ImageProps from "../components/ImageComponent";
import Rodape from "../partials/Rodapé";

export default function Extrato({ route }) {
    const navigation = useNavigation();
    const [respUser, setRespUser] = useState({});
    const [extratoEntrada, setExtratoEntrada] = useState([]);
    const [extratoSaida, setExtratoSaida] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Função utilizada para pegar os dados do usuário para imprimir na tela.
        const loadSession = async () => {
            try {
                const session = await AsyncStorage.getItem('userSession');
                if (session) {
                    const { respUser } = JSON.parse(session);
                    setRespUser(respUser);
                    await loadExtratos(respUser.nome); // Capturar dado "nome" para imprimir.
                }
            } catch (error) {
                console.log('Failed to load session', error);
            } finally {
                setLoading(false);
            }
        };
        loadSession();
    }, []);

    // Função usada para pegar o extrato e o nome, tanto do "pagante" tanto com o do que recebeu. Também é puxado a data.
    const loadExtratos = async (nome) => {  
        try {
            const responseEntrada = await axios.get(`${API_URL}/SelectExtratoEntrada`, { // Quem recebeu
                params: { nome },
                withCredentials: true,
            });
            setExtratoEntrada(responseEntrada.data); // Dados da Flatlist

            const responseSaida = await axios.get(`${API_URL}/SelectExtratoSaida`, { // Quem pagou
                params: { nome },
                withCredentials: true,
            });
            setExtratoSaida(responseSaida.data);
        } catch (err) {
            console.log('Erro ao carregar extratos:', err);
        }
    };
 
    // Usar fontes 
    const [loaded] = useFonts({
        Prompt: require("../assets/fonts/Prompt-Regular.ttf"),
        PromptBold: require("../assets/fonts/Prompt-Bold.ttf")
    });

    if (!loaded) {
        return null;
    }
 // Função do Flatlist puxando os dados já chamados anteriormente, {nomeSaida, nomeEntrada, Data,} Dados já chamados anteriormente
    function renderItem(item) {
        return (
            <View style={{ alignContent: "center", width: "100%" }}>
                <ImageProps
                    source={require("../assets/images/Iconzinho.png")}
                    style={{ width: 50, height: 50, position: "relative", top: 65 }}
                />
                <View style={Styles.linhald}>
                    <Text style={Styles.textosextrato}>{`Foi ${item.tipo === 'entrada' ? 'pago' : 'recebido'} R$ ${item.Valor}`}</Text>
                    <Text style={Styles.textosbeges}>{item.tipo === 'entrada' ? item.nomeSaida : item.nomeEntrada}</Text>
                    <Text style={{ fontFamily: 'Prompt', color: 'gray' }} >{item.Data}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.centro}>
                <ImageProps
                    source={require("../assets/images/LogoBlue.png")}
                    style={Styles.ImgLogo}
                />
                <Text style={Styles.textos}>Extrato</Text>
            </View>

            <View style={Styles.linhaabx}>
                <Text style={Styles.textossaldo}>Saldo em conta:</Text>
                <Text style={Styles.saldo}>{`R$ ${respUser.Saldo}`}</Text>
            </View>

            <ScrollView>
                <View style={{ flex: 1, alignContent: 'center' }}>
                    <View style={{ width: "100%", borderBottomColor: "#E8C39E", borderBottomWidth: 2 }}>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Ionicons name="arrow-redo-outline" margim size={30} color="red" />
                            <Text style={Styles.textosextrato}>O que foi Pago:</Text>
                        </View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={extratoEntrada}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => renderItem({ ...item, tipo: 'entrada' })}
                            style={{ marginBottom: "7%" }}
                        />
                    </View>

                    <View style={{ width: "100%", marginTop: "3%" }}>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Ionicons name="arrow-undo-outline" margim size={30} color="green" />
                            <Text style={Styles.textosextrato}>O que foi Recebido:</Text>
                        </View>
                        
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={extratoSaida}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => renderItem({ ...item, tipo: 'saida' })}
                        />
                    </View>
                </View>
            </ScrollView>
            <Rodape />
        </View>
    );
}
