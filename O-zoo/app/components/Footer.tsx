import React from 'react';
import { Text, Pressable, Button, View, StyleSheet, Image } from 'react-native';
import CustomText from './CustomText';
import tabTypeZustand from '../../store/tabType';


const Footer = ({ navigation, style }) =>{
    const tabType = tabTypeZustand((state)=>state.tabType)
    const setTabType = tabTypeZustand((state)=>state.setTabType)

    const tabs = [
        { key: 'Records', label: '전적', icon: require('../../assets/icons/records.png') },
        { key: 'Select', label: '뽑기', icon: require('../../assets/icons/select.png') },
        { key: 'Ranking', label: '랭킹', icon: require('../../assets/icons/ranking.png') },
    ];

    return (
        <View style={{...style, width: '100%', flexDirection: 'row', backgroundColor: "#01112B"}}>
            {tabs.map((tab) => (
                <Pressable
                    key={tab.key}
                    style={{ width:'33%', height:70, justifyContent:'center', alignItems:'center' }}
                    onPress = {() => {
                        setTabType(tab.key);
                        navigation.navigate(tab.key);
                    }}
                >
                    <Image
                        source={tab.icon}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: tabType === tab.key ? '#FFCC00' : '#fff',
                            marginBottom: 4,
                        }}
                        resizeMode="contain"
                    />
                    <CustomText style={{ color: tabType === tab.key ? "#FFCC00" : "#fff"}}>
                        {tab.label}
                    </CustomText>
                </Pressable>
            ))}
        </View>
    );
};

export default Footer;