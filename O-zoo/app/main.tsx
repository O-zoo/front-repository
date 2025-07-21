import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Main = async () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [text, setText] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null); // 생일 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 모달 상태

  var token = typeof params.token === "string" ? params.token : null;
  const refreshToken = typeof params.refresh === "string" ? params.refresh : null;
  const expires_in = 7200;

  const now = Date.now();
  const tokenExpiresAt = parseInt(await AsyncStorage.getItem("token_expires_at") || "0");

  if (now>tokenExpiresAt) {
    fetch(`${BACKEND_DOMAIN}/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          refreshToken: refreshToken,
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        const new_token = data.access_token;
        token = new_token;
        AsyncStorage.setItem("kakao_access_token", new_token);
      })
      .catch(() => setProfile(null));
  }

  useEffect(() => {
    if (!token) return;
    if (params.login === "success" && typeof token === "string") {
      // 로그인 성공
      AsyncStorage.setItem("kakao_access_token", token);
      if (typeof refreshToken === "string") {
        AsyncStorage.setItem("kakao_refresh_token", refreshToken);
        AsyncStorage.setItem("token_expires_at", String(Date.now() + expires_in * 1000));
      }
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

  const { id, properties, kakao_account } = profile;

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setBirthday(date);
    hideDatePicker();
  };

  const registerUser = async () => {
    if (!text || !birthday) {
      alert("닉네임과 생일을 모두 입력해주세요.");
      return;
    }
    console.log(`name:${text}, birth:${birthday}`);

    try {
      const response = await fetch(`${BACKEND_DOMAIN}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: text,
          birth: birthday.toISOString().split('T')[0], // 'YYYY-MM-DD' 포맷
          profile_img: properties.profile_image,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("등록 성공! 🎉");
        // 필요한 경우 다음 화면 이동
        router.push("/home/Home");
      } else {
        alert("등록 실패😢: " + result.message || "알 수 없는 오류");
      }
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
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
          placeholderTextColor="gray"
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

        <Pressable style={styles.HomeButton} onPress={() => {
          registerUser;
          router.push("/home/Home");
        }}>
          <Text style={styles.buttonText}>완료</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={async () =>{
          await AsyncStorage.removeItem("kakao_access_token");
          fetch(`${BACKEND_DOMAIN}/logout`).then(() => router.replace("/login"));
        }}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </Pressable>
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
