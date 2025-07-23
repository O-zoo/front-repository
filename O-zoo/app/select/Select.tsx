import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Pressable, Text, TextInput, ScrollView, Alert } from 'react-native'; // Alert 추가
import { useLocalSearchParams, useRouter } from 'expo-router';
import CustomText from '../../components/CustomText';
import Footer from '../../components/Footer';
import { useFonts } from 'expo-font';

const SelectScreen = () => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const [names, setNames] = useState<string[]>([]);

  const handleSelect = (count: number) => {
    setSelectedCount(count);
    setNames(Array(count).fill('')); // 선택한 수만큼 이름 배열 초기화
  };

  const handleChangeName = (text: string, index: number) => {
    const updated = [...names];
    updated[index] = text;
    setNames(updated);
  };

  const handleGoTreasure = () => {
    if (!selectedCount) {
      Alert.alert("알림", "참여할 인원 수를 선택해주세요.");
      return;
    }
    if (names.some(name => name.trim() === "")) {
      Alert.alert("알림", "모든 이름을 입력해주세요.");
      return;
    }
    router.push({
      pathname: "/select/components/Treasure",
      params: { names: JSON.stringify(names) },
    });
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 홈 버튼 */}
      <Pressable style={styles.homeButton} onPress={() => { router.push("/home/Home"); }}>
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
      </Pressable>

      {/* 메인 컨테이너 */}
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
        >
        <CustomText style={styles.title}>몇 명이 뽑기에 참여하나요?</CustomText>

        {/* 1~6 토글 버튼 */}
        <View style={styles.toggleContainer}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Pressable
              key={num}
              style={[
                styles.toggleButton,
                selectedCount === num && styles.toggleButtonActive,
              ]}
              onPress={() => handleSelect(num)}
            >
              <Text style={styles.toggleText}>{num}</Text>
            </Pressable>
          ))}
        </View>

        {/* 이름 입력 박스 */}
        {selectedCount && (
          <View style={{ marginTop: 20, width: '80%' }}>
            <CustomText style={styles.label}>뽑을 순서대로 이름을 입력해주세요.</CustomText>
            {Array.from({ length: selectedCount }, (_, i) => (
              <TextInput
                key={i}
                style={styles.input}
                placeholder={`이름 ${i + 1}`}
                value={names[i]}
                onChangeText={(text) => handleChangeName(text, i)}
              />
            ))}
          </View>
        )}

        {/* 뽑으러가기 버튼 */}
        <Pressable style={styles.submitButton} onPress={handleGoTreasure}>
          <Text style={styles.submitButtonText}>뽑으러가기</Text>
        </Pressable>
      </ScrollView>
      <Footer style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default SelectScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Cafe24Ssurround',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 140,
    paddingBottom: 300,
  },
  container: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cafe24Ssurround',
    color: '#fff',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#ffcc00',
    borderColor: '#ffcc00',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Cafe24Ssurround',
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:50,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Cafe24Ssurround',
    color: '#000',
  },
});
