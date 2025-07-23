import React from 'react';
import { useFonts } from 'expo-font';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

interface MyPageProps {
  visible: boolean;
  onClose: () => void;
  nickname: string;
  birthday: string;
  winRate: number;
}

const MyPage: React.FC<MyPageProps> = ({ visible, onClose, nickname, birthday, winRate }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>마이페이지</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>닉네임</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>{nickname}</Text>
          </View>

          <Text style={styles.label}>생일</Text>
          <View style={styles.inputBox}>
            <Text style={styles.text}>{birthday}</Text>
          </View>

          <Text style={styles.label}>나의 승률</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{winRate}%</Text>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  header: {
    backgroundColor: '#ffcc00',
    width: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  content: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    fontFamily: 'Cafe24Ssurround',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 10,
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  inputBox: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 5,
    fontFamily: 'Cafe24Ssurround',
  },
  text: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Cafe24Ssurround',
  },
  circle: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 12,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cafe24Ssurround',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ffcc00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#000',
    fontWeight: 'bold',
  },
    closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: "100%",
  },
  closeButtonText: { color: '#fff', fontFamily: 'Cafe24Ssurround'},
});
