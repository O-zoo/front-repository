import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, View, Modal, Pressable, Text, FlatList } from 'react-native';
import Footer from '../../../components/Footer';
import CustomText from '../../../components/CustomText';
import { router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';

const TreasureScreen = () => {
  const params = useLocalSearchParams();
  const names = params.names ? JSON.parse(params.names as string) : [];

    const [fontsLoaded] = useFonts({
        'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
        });

  const [isOpened, setIsOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [randomNames, setRandomNames] = useState<string[]>([]);

  const handleOpenBox = () => {
    setIsOpened(true);

    // 이름 섞기
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setRandomNames(shuffled);

    // 1초 후 모달 열기
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  if (!fontsLoaded) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
        </View>;
      }
      
  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <CustomText style={styles.title}>보물상자를 열어보세요!</CustomText>

        <Pressable onPress={handleOpenBox}>
          <Image
            source={
              isOpened
                ? require('../../../assets/images/openedbox.png')
                : require('../../../assets/images/box.png')
            }
            style={styles.boxImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* 결과 모달 */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> !!!! 결과 !!!! </Text>
            <FlatList
              data={randomNames}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Text style={styles.resultText}>
                  {index + 1}. {item}
                </Text>
              )}
            />
            <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.homeButton} onPress={() => { router.push("/home/Home");}}>
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text> 
      </Pressable>
      <Pressable style={styles.ReButton} onPress={() => { router.push("/select/Select");}}>
        <Text style={styles.ReButtonText}>다시하기</Text> 
      </Pressable>
      <Footer style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default TreasureScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Cafe24Ssurround',
    color: '#fff',
    marginBottom: 20,
  },
  boxImage: {
    width: 300,
    height: 300,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 250,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Cafe24Ssurround',
    marginBottom: 30,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Cafe24Ssurround',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Cafe24Ssurround',
    color: '#000',
  },
  homeButton: {
    position: 'absolute',
    bottom:200,
    padding: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontFamily: 'Cafe24Ssurround',
    color: '#000',
  },
  ReButton: {
    position: 'absolute',
    bottom:150,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  ReButtonText: {
    fontSize: 16,
    fontFamily: 'Cafe24Ssurround',
    color: '#000',
  },
});
