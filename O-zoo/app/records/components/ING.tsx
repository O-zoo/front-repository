import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';

interface INGProps {
  visible: boolean;
  onClose: () => void;
}

const ING: React.FC<INGProps> = ({ visible, onClose }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  const [until, setUntil] = useState<number>(0);
  const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";


  useEffect(() => {
    const getBetInfo = async (content: String) => {
      try {
        const res = await fetch(`${BACKEND_DOMAIN}/api/bet/findByContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });

        const data = await res.json();
        console.log(`got data : ${data.title} ${data.content}, ${data.members}, ${data.start}, ${data.end}, ${data.price}`);

        if (data.success) {
          const endDate = new Date(data.end);
          const secondsLeft = Math.max(0, Math.floor((endDate.getTime() - Date.now()) / 1000));
          setUntil(secondsLeft);

          await AsyncStorage.setItem("endDate", data.end);
        }
      } catch (e) {
        console.log(`error while fetching user info : ${e}`);
        return;
      }
    };
    getBetInfo();

  }, []);
  


  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* 상단 제목 */}
          <View style={styles.header}>
            <Text style={styles.headerText}>진행중인 내기</Text>
          </View>

          {/* 내기 정보 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>아이스크림 내기</Text>
            <Text style={styles.subText}>2025년 7월 20일까지 뭐뭐하기</Text>
          </View>

          {/* 참여자 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>참여자</Text>
            <View style={styles.participants}>
              {['은챙이(나)', '심슨', '욜깅'].map((name, idx) => (
                <View key={idx} style={styles.participant}>
                  <View style={styles.avatar} />
                  <Text style={styles.name}>{name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 걸려있는 상품 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>걸려있는 상품</Text>
          </View>
            <Image
              source={require('../../../assets/images/watermelon.jpeg')} // 수박바 이미지
              style={styles.product}
              resizeMode="contain"
            />

          {/* 남은 시간 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>남은 시간</Text>
            {until > 0 ? (
              <CountDown
                size={18}
                until={until}
                onFinish={() => alert('Finished')}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#000', fontFamily: 'Cafe24Ssurround' }}
                timeLabelStyle={{ color: '#444', fontFamily: 'Cafe24Ssurround', fontSize: 12 }}
                separatorStyle={{ color: '#000' }}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{ d: '일', h: '시', m: '분', s: '초' }}
                showSeparator
              />
            ) : (
              <Text style={styles.subText}>종료됨</Text>
            )}
          </View>

          {/* 닫기 버튼 */}
          <Pressable style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ING;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center', // 세로 가운데
    alignItems: 'center',     // 가로 가운데
  },
  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 15,
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#FFD700',
    width: '100%',
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
  },
  headerText: { fontSize: 16, color: '#000', fontFamily: 'Cafe24Ssurround' },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'flex-start',
  },
  title: { fontSize: 18, marginBottom: 4, fontFamily: 'Cafe24Ssurround' },
  subText: { fontSize: 14, color: '#444', fontFamily: 'Cafe24Ssurround' },
  participants: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
    fontFamily: 'Cafe24Ssurround',
    
  },
  participant: { alignItems: 'center', fontFamily: 'Cafe24Ssurround', },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  name: { fontSize: 12, color: '#000', fontFamily: 'Cafe24Ssurround', },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    color: '#000',
  },
  product: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },
  timeHighlight: { color: 'red', fontSize: 16,fontFamily: 'Cafe24Ssurround', },
  backButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: "90%",
  },
  backButtonText: { color: '#fff', fontFamily: 'Cafe24Ssurround', },
});
function fetchData() {
  throw new Error('Function not implemented.');
}

