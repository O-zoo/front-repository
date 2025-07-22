import React from 'react';
import { Modal, View, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import { useFonts } from 'expo-font';

interface FortuneModalProps {
  visible: boolean;
  onClose: () => void;
  zodiac?: string; // 별자리 (예: 염소자리)
}

const FortuneModal: React.FC<FortuneModalProps> = ({ visible, onClose, zodiac = '염소자리' }) => {
//   const [fontsLoaded] = useFonts({
//     Cafe24Classic: require('../../../assets/fonts/Cafe24Classictype-v1.1.ttf'),
//   });

//   if (!fontsLoaded) {
//     return null; // 폰트 로딩 대기
//   }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ImageBackground
          source={require('../../../assets/images/papirus.png')}
          style={styles.papirus}
          resizeMode="contain"
        >
          <Text style={styles.title}>오늘의 운세</Text>
          <Text style={styles.subtitle}>({zodiac})</Text>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>접기</Text>
          </Pressable>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default FortuneModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  papirus: {
    width: 270,
    height: 450,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom:60,
  },
  title: {
    position: 'absolute',
    top: 100,
    fontFamily: 'Cafe24Classic',
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    position: 'absolute',
    top: 140,
    fontFamily: 'Cafe24Classic',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 50,
    position:'absolute',
    bottom:5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: 'Cafe24Classic',
    fontSize: 16,
  },
});
