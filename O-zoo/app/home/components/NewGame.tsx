import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Linking, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface NewGameProps {
  visible: boolean;
  onClose: () => void;
}

const NewGame: React.FC<NewGameProps> = ({ visible, onClose }) => {
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
    const url = 'https://gift.kakao.com'; // 카카오 선물하기 웹페이지
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

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* 상단 타이틀 */}
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>새 대결 생성</Text>
        </View>

        {/* 내용 */}
        <View style={styles.content}>
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

          {/* 무엇을 걸까요? */}
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

          {/* 닫기 버튼 */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </Pressable>
        </View>
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
  content: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginTop: 17,
    marginBottom: 5,
    color: '#000',
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
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
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    width: "100%",
  },
  closeButtonText: { color: '#fff' },
});
