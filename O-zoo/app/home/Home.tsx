import React from 'react';
import { View, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Footer from '../components/Footer';
import CustomText from '../components/CustomText';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // 배경 이미지
      style={styles.background}
      resizeMode="cover"
    >
      {/* 상단 문구 */}
      <View style={styles.headerTextContainer}>
        <CustomText style={styles.headerText}>
          새 대결을 시작하고 알을 깨워보세요!
        </CustomText>
      </View>

      {/* 중앙 알 이미지 */}
      <View style={styles.eggContainer}>
        <Image
          source={require('../../assets/images/egg.png')}
          style={{width:100, height:200}}
          resizeMode="contain"
        />
      </View>

      {/* 하단 버튼 */}
      <Pressable>
        <Image
          source={require('../../assets/icons/newgame.png')}
          style={{ width: 24, height: 24, marginRight: 6 }}
          resizeMode="contain"
        />
      </Pressable>

      {/* Footer */}
      <Footer navigation={navigation} style={styles.footer} />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTextContainer: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  eggContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
});
