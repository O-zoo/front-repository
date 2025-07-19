import { Text, Pressable, Button, View, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import tabTypeZustand from '../../store/tabType';

const styles = StyleSheet.create({
    container: (
        flex: 1,
        backgroundColor: "01112B",
        justifyContent: 'center',
        alignItems: 'center'
    )
})

const Footer = ({ navigation, style }) =>{
    const tabType = tabTypeZustand((state)=>state.tabType)
    const setTabType = tabTypeZustand((state)=>state.setTabType)

    return (
        <View style={{...style, width: '100%', flexDirection: 'row'}}>
            
        </View>
    )
}