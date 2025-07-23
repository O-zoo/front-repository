import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal } from 'react-native';
import { useFonts } from 'expo-font';

interface WINProps {
  visible: boolean;
  onClose: () => void;
}

const WIN: React.FC<WINProps> = ({ visible, onClose }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* 상단 영역 */}
          <View style={styles.header}>
            <Text style={styles.headerText}>완료된 내기</Text>
          </View>

          {/* YOU WIN! 텍스트 + 아이콘 */}
          <View style={styles.winContainer}>
            <Text style={styles.winText}>YOU WIN!</Text>
            <Image
              source={require('../../../assets/icons/win_badge.png')} // 승리 뱃지 아이콘 (예시)
              style={styles.winIcon}
              resizeMode="contain"
            />
          </View>

          {/* 내기 정보 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>아이스크림 내기</Text>
            <Text style={styles.subText}>2025년 7월 20일까지</Text>
            <Text style={styles.subText}>은주연 : nn kg까지 살빼기</Text>
            <Text style={styles.subText}>심승훈 : 72kg까지 근육 찌우기</Text>
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
            source={require('../../../assets/images/watermelon.jpeg')}
            style={styles.product}
            resizeMode="contain"
          />
          <Text style={styles.claimText}>독촉하러가기 &gt;</Text>

          {/* 이긴 사람 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>이긴 사람</Text>
            <Text style={styles.winner}>은주연(나)</Text>
          </View>

          {/* 닫기 버튼 */}
          <Pressable style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>돌아가기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default WIN;

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
  headerText: { fontFamily: 'Cafe24Ssurround', fontSize: 16, color: '#000' },
  winContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  winText: {
    fontSize: 30,
    fontFamily: 'Cafe24Ssurround',
    color: 'red',
    marginRight: 8,
  },
  winIcon: {
    width: 40,
    height: 40,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'flex-start',
  },
  title: { fontSize: 18,  marginBottom: 4, fontFamily: 'Cafe24Ssurround',},
  subText: { fontSize: 14, color: '#444', fontFamily: 'Cafe24Ssurround',},
  participants: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  participant: { alignItems: 'center' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  name: { fontSize: 12, color: '#000',fontFamily: 'Cafe24Ssurround', },
  product: {
    width: 200,
    height: 100,
    marginVertical: 10,
    marginTop:-10,
  },
  claimText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Cafe24Ssurround',
  },
  winner: {
    color: 'red',
    fontFamily: 'Cafe24Ssurround',
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  backButtonText: { color: '#fff', fontFamily: 'Cafe24Ssurround', },
});
