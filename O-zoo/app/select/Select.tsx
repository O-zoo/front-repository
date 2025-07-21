// app/select/SelectScreen.tsx
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import CustomText from '../../components/CustomText';
import Footer from '../../components/Footer';

const SelectScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
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
