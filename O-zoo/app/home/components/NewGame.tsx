import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Linking, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface NewGameProps {
  visible: boolean;
  onClose: () => void;
}

const NewGame: React.FC<NewGameProps> = ({ visible, onClose }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  /** 카카오페이 실행 */
  const handleKakaoPay = async () => {
    const url = 'kakaotalk://pay'; 
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('카카오페이를 실행할 수 없습니다.');
    }
  };

  /** 카카오 선물하기 */
  const handleKakaoGift = async () => {
    const url = 'https://gift.kakao.com';
    await Linking.openURL(url);
  };

  /** 인스타 스토리 열기 */
  const handleInstagramStory = async () => {
    const url = 'instagram://story-camera'; 
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('인스타그램 스토리를 열 수 없습니다.');
    }
  };

  const handleComplete = () => {
    Alert.alert("완료", "대결이 생성되었습니다!");
    onClose();
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* 상단 타이틀 */}
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontFamily: 'Cafe24Ssurround' }}>새 대결 생성</Text>
        </View>

        {/* ScrollView로 감싸서 스크롤 가능 */}
        <ScrollView style={styles.scrollContent} contentContainerStyle={{ alignItems: 'center' }}>
          <Text style={styles.label}>내기 이름이 무엇인가요?</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 다이어트 대결"
            value={text}
            onChangeText={setText}
          />

          <Text style={styles.label}>어떤 내기인가요?</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            maxLength={30}
            placeholder="내기를 설명해주세요."
            value={desc}
            onChangeText={setDesc}
            multiline
          />

          <Text style={styles.label}>누구와 함께하나요?</Text>
          <TextInput
            style={styles.input}
            placeholder="심승훈"
            value={text}
            onChangeText={setText}
          />

          <Text style={styles.label}>기한을 설정해주세요</Text>
          <Pressable style={styles.dateButton} onPress={showDatePicker}>
            <Text style={styles.dateButtonText}>
              {date ? date.toLocaleDateString() : "날짜 선택하기"}
            </Text>
            <Text style={{ color: "gray" }}>▼</Text>
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.label}>무엇을 걸까요?</Text>
          <View style={styles.betContainer}>
            <Pressable style={styles.betButton} onPress={handleKakaoPay}>
              <Text style={styles.betButtonText}>돈 (카카오페이) 〉</Text>
            </Pressable>
            <Pressable style={styles.betButton} onPress={handleKakaoGift}>
              <Text style={styles.betButtonText}>선물 (카카오선물하기) 〉</Text>
            </Pressable>
            <Pressable style={styles.betButton} onPress={handleInstagramStory}>
              <Text style={styles.betButtonText}>자존심 (인스타 스토리) 〉</Text>
            </Pressable>
          </View>

          {/* 완료 버튼 */}
          <Pressable style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>완료</Text>
          </Pressable>

          {/* 닫기 버튼 */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NewGame;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: "#ffcc00",
    width: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  scrollContent: {
    width: 300,
    maxHeight: 600,
    padding:20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 5,
    color: '#000',
    alignSelf: 'flex-start',
    fontFamily: 'Cafe24Ssurround',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 0,
    color: "#000",
    width: "100%",
  },
  dateButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
  dateButtonText: {
    fontSize: 14,
    color: "gray",
  },
  betContainer: {
    width: '100%',
    marginTop: 5,
  },
  betButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  betButtonText: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Cafe24Ssurround',
  },
  completeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 5,
    alignItems: 'center',
    width: "100%",
  },
  completeButtonText: {
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: "100%",
  },
  closeButtonText: { color: '#fff', fontFamily: 'Cafe24Ssurround' },
});
