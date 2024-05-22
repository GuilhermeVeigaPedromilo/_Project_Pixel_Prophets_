import { TextInput } from "react-native";//Importacao dos componentes do react-native

export default function InputProps({
  style,
  placeholder,
  keyboardType,
  onChangeText,
  value,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={value}
    />
  );
}
