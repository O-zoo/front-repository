import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { useFonts } from 'expo-font';

interface OVERProps {
  visible: boolean;
  onClose: () => void;
}

const OVER: React.FC<OVERProps> = ({ visible, onClose }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  const participants = ['은챙이(나)', '심슨', '욜깅'];
  const [winner, setWinner] = useState<string | null>(null); // 선택된 이긴 사람

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
      </View>
    );
  }

  const handleComplete = () => {
    if (winner) {
      console.log(`선택된 이긴 사람: ${winner}`);
      // 여기에 API 요청 등 완료 처리 로직 추가 가능
      onClose();
    } else {
      alert('이긴 사람을 선택해주세요!');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* 상단 영역 */}
          <View style={styles.header}>
            <Text style={styles.headerText}>완료된 내기</Text>
          </View>

          {/* 내기 정보 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>술배</Text>
            <Text style={styles.subText}>2025년 7월 20일까지 어쩌구</Text>
          </View>

          {/* 걸려있는 상품 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>걸려있는 상품</Text>
          </View>
          <Image
            source={require('../../../assets/images/watermelon.jpeg')}
            style={styles.product}
            resizeMode="contain"
          />

          {/* 이긴 사람 선택 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>이긴 사람을 선택해주세요</Text>
            <View style={styles.winnerSelectContainer}>
              {participants.map((name) => (
                <Pressable
                  key={name}
                  style={[
                    styles.winnerButton,
                    winner === name && styles.winnerButtonSelected,
                  ]}
                  onPress={() => setWinner(name)}
                >
                  <Text
                    style={[
                      styles.winnerButtonText,
                      winner === name && styles.winnerButtonTextSelected,
                    ]}
                  >
                    {name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* 완료 버튼 */}
          <Pressable style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>완료</Text>
          </Pressable>

          {/* 닫기 버튼 */}
          <Pressable style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default OVER;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
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
  title: { fontSize: 18, fontFamily: 'Cafe24Ssurround', marginBottom: 4 },
  subText: { fontSize: 14, color: 'gray', fontFamily: 'Cafe24Ssurround' },
  product: {
    width: 200,
    height: 100,
    marginVertical: 10,
    marginTop: -10,
  },
  claimText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Cafe24Ssurround',
  },
  winnerSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  winnerButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  winnerButtonSelected: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  winnerButtonText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  winnerButtonTextSelected: {
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  completeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  completeButtonText: {
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  backButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  backButtonText: { color: '#fff', fontFamily: 'Cafe24Ssurround' },
});
