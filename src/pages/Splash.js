import { StyleSheet } from "react-native";//importação do StyleSheet
import { Video, ResizeMode } from "expo-av";//importação dos componentes do expo-av
import { CommonActions, useNavigation } from "@react-navigation/native";//importação do CmmonActions e do useNavigation
import { useEffect } from "react";//importação do useEffect

export default function Splash() {
  const navigation = useNavigation();//Define o navigation

  //Constante do useEffect
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }]
      }))
    }, 5500);
  }, [])

  return (
    <Video
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      source={require("../assets/videos/Splash.mp4")}
      isLooping={true}
      shouldPlay={true}
    />
  );
}