import { TouchableOpacity, Text } from "react-native";//Importacao dos componentes do react-native

export default function Btn({
  children,
  TouchStyle,
  OnPress, 
  letras
}) {
  return (
    <TouchableOpacity onPress={OnPress} style={TouchStyle}>
      <Text style={letras}>{children}</Text>
    </TouchableOpacity>
  );
}
