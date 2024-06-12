import {Image} from 'react-native'//importação dos componentes do react-native

export default function ImageProps({source, style}) {
    return (
        <Image source={source} style={style}/>
    )
};