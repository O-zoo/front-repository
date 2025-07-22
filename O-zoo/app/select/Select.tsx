// app/select/SelectScreen.tsx
import React from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomText from '../../components/CustomText';
import Footer from '../../components/Footer';

const SelectScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable style={styles.homeButton} onPress={() => { router.push("/home/Home");}}>
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text> 
      </Pressable>

      <View style={styles.container}>
        <CustomText style={styles.title}>뽑기 화면</CustomText>
      </View>
      <Footer navigation={navigation} style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default SelectScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 40, // 상태바 높이 감안
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
