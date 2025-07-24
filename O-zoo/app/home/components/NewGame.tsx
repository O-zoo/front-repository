import { useFonts } from 'expo-font';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, Linking, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface NewGameProps {
  visible: boolean;
  onClose: () => void;
}

const NewGame: React.FC<NewGameProps> = ({ visible, onClose }) => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [friends, setFriends] = useState('');
  const [price, setPrice] = useState('');
  const [price_url, setPriceUrl] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";
 
  const loadName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setName(storedName);
        console.log(`name set to : ${storedName}`);
      }
    } catch (error) {
      console.error('이름 불러오기 에러:', error);
    }
  };
  loadName();

  const registerBet = async () => {
    await loadName();
    let priceUrl = '';
    try {
          const res = await fetch(`${BACKEND_DOMAIN}/search/naver/product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              keyword: price
            }),
          });
          const data = await res.json();
          console.log(`got data : ${data.product_image}, ${data.success}`);
          if (data.success) {
            await setPriceUrl(data.product_image);
            priceUrl = data.product_image;
          }
        } catch (e) {
          console.log(`error while fetching price image : ${e}`);
          return;
        }
    try {
      const members = (friends + `, ${name}`).split(',').map(friend => friend.trim());
      console.log(`registering bet with title: ${title}, desc: ${desc}, friends: ${members}, price: ${price_url}, date: ${date}`);
      const res = await fetch(`${BACKEND_DOMAIN}/api/bet/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title : title,
          content: desc,
          members: members,
          price: priceUrl,
          price_name: price,
          end: date,
        }),
      });
      const data = await res.json();
      console.log(`got bet data : ${JSON.stringify(data)}`)
      if (data.success) {
        Alert.alert('내기 등록 성공', '내기가 성공적으로 등록되었습니다.');
      }
    } catch (e) {
      console.log(`error while fetching user info : ${e}`);
      return;
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
            value={title}
            onChangeText={setTitle}
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
            placeholder="심드렁"
            value={friends}
            onChangeText={setFriends}
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
          <TextInput
            style={styles.input}
            placeholder="수박바"
            value={price}
            onChangeText={setPrice}
          />

          {/* 완료 버튼 */}
          <Pressable style={styles.completeButton} onPress={
            async () => {
              await registerBet();
              handleComplete();
            }
            }>
            <Text style={styles.completeButtonText}>등록하기</Text>
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
    maxHeight: 550,
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
  completeButton: {
    marginTop: 30,
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
