import {Image} from 'react-native'//Importacao dos componentes do react-native

export default function ImageProps({source, style}) {
    return (
        <Image source={source} style={style}/>
    )
};