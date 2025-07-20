import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Main = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [text, setText] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null); // 생일 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 모달 상태

  const token = typeof params.token === "string" ? params.token : null;

  useEffect(() => {
    if (!token) return;
    if (params.login === "success" && typeof token === "string") {
      // 로그인 성공
      AsyncStorage.setItem("kakao_access_token", token);
    }

    // Express 백엔드의 /profile 엔드포인트에서 사용자 정보 불러오기
    fetch(`${BACKEND_DOMAIN}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [token]);

  if (!profile) {
    return <Text>사용자 정보를 불러오는 중...</Text>;
  }
  console.log(profile);
  

  const { properties, kakao_account } = profile;

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setBirthday(date);
    hideDatePicker();
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')} // 배경 이미지
      style={styles.background}
      resizeMode="cover"
    >

    <View style={styles.container}>
      <Image source={{ uri: properties?.profile_image }} style={styles.avatar} />
      <Text style={styles.name}> 안녕하세요 {properties?.nickname}님,</Text>
      <View style={{backgroundColor:"#ffcc00", width:300, borderTopLeftRadius:10, borderTopRightRadius:10, padding: 10, alignItems:'center'}}>
        <Text style={{fontSize: 20, fontWeight:'bold'}}>이길 준비 되셨나요?!</Text>
      </View>
      <View style={styles.CustomBox}>
        <Text style={{fontSize:20, marginTop:-10}}>닉네임을 입력해주세요.</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 잔망정인"
          value={text}
          onChangeText={setText}
        />
        <Text style={{fontSize:20, marginTop:20}}>생일을 입력해주세요.</Text>
        <Pressable style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.dateButtonText}>
            {birthday ? birthday.toLocaleDateString() : "생일 선택하기"}
          </Text>
          <Text style={{color:"gray"}}>▼</Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Pressable style={styles.HomeButton} onPress={() => router.push("/home/Home")}>
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={async () =>{
          await AsyncStorage.removeItem("kakao_access_token");
          fetch(`${BACKEND_DOMAIN}/logout`).then(() => router.replace("/login"));
        }}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </Pressable>


        {/* <Button title="로그아웃" onPress={async () => {
          await AsyncStorage.removeItem("kakao_access_token");
          fetch(`${BACKEND_DOMAIN}/logout`).then(() => router.replace("/login"));
        }} /> */}
      </View>
    </View>
    </ImageBackground>
  );
};
export default Main;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: { flex: 1, alignItems: "center", justifyContent: "flex-start", marginTop:40 },
  avatar: { width: 70, height: 70, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color:"#fff" },
  button: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop:10,
    borderColor:"#939393",
    borderWidth:1,
  },
  HomeButton: {
    backgroundColor: "#FFCC00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop:30,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop:5,
    color:"#000",
  },
  CustomBox: {
    padding: 30,
    width: 300,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dateButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:"#fff",
    padding:8,
    justifyContent: "space-between",
    flexDirection:"row",
    alignItems: "center",
    marginTop:5,
  },
  dateButtonText: {
    fontSize: 13,
    color: "gray",
  },
});
