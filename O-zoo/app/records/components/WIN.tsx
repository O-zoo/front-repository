import { useFonts } from 'expo-font';
import React from 'react';
import { Image, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface WINProps {
  visible: boolean;
  onClose: () => void;
  bet: any;
}

const WIN: React.FC<WINProps> = ({ visible, onClose, bet }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });
  const keyword = bet.price_name;
  const giftUrl = `https://gift.kakao.com/search/result?query=${encodeURIComponent(keyword)}&searchType=search_typing_keyword`;

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
            <Text style={styles.title}>{bet.name}</Text>
            <Text style={styles.subText}>{bet.content}</Text>
          </View>

          {/* 참여자 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>참여자</Text>
            <View style={styles.participants}>
              {bet.members.map((member:any, idx:any) => (
                <View key={idx} style={styles.participant}>
                  <Image source={{ uri: member.profile_img }} style={styles.avatar} />
                  <Text style={styles.name}>{member.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 걸려있는 상품 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>걸려있는 상품</Text>
          </View>
          <Image
            source={{ uri: bet.price_url }}
            style={styles.product}
            resizeMode="contain"
          />
          <Pressable onPress={() => Linking.openURL(giftUrl)}>
            <Text style={styles.claimText}>독촉하러가기 &gt;</Text>
          </Pressable>

          {/* 이긴 사람 */}
          <View style={styles.infoBox}>
            <Text style={styles.title}>이긴 사람</Text>
            <Text style={styles.winner}>{bet.winner.name}</Text>
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
