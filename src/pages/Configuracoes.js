import { Image, View } from "react-native";
import Styles from "../styles/StyleSheet";

export default function SettingsApp() {

  return (
    <View style={Styles.container} >
      <Image style={Styles.ImgLogo} source={require('../assets/images/LogoBlue.png')} />
    </View>
  );
}