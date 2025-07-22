import React, { useEffect, useId, useState } from 'react';
import { View, Text, TextInput, Pressable, Button, Image, ImageBackground, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Main = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 핵심 상태들 useState로 관리
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number>(0);
  const [profile, setProfile] = useState<any>(null);
  const [text, setText] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  // URL 파라미터반영 → AsyncStorage와 싱크
  useEffect(() => {
    const initialize = async () => {
      try {
        let urlToken = typeof params.token === 'string' ? params.token : null;
        let urlRefresh = typeof params.refresh === 'string' ? params.refresh : null;
        let urlExpires = typeof params.expires_in === 'string' ? parseInt(params.expires_in) : null;

        // AsyncStorage에서 기존 값 불러옴
        const storedToken = await AsyncStorage.getItem("kakao_access_token");
        const storedRefresh = await AsyncStorage.getItem("kakao_refresh_token");
        const storedExpiresAt = await AsyncStorage.getItem("token_expires_at");

        // URL 파라미터 및 AsyncStorage의 최신값 반영
        const newToken = urlToken || storedToken;
        const newRefresh = urlRefresh || storedRefresh;
        const newExpiresAt = urlExpires
          ? Date.now() + urlExpires * 1000
          : storedExpiresAt
            ? parseInt(storedExpiresAt)
            : 0;
        console.log(newExpiresAt);

        setToken(newToken);
        setRefreshToken(newRefresh);
        setTokenExpiresAt(newExpiresAt);

        // 저장
        if (newToken) await AsyncStorage.setItem("kakao_access_token", newToken);
        if (newRefresh) await AsyncStorage.setItem("kakao_refresh_token", newRefresh);
        if (newExpiresAt) await AsyncStorage.setItem("token_expires_at", String(newExpiresAt));
      } catch (e) {
        console.log("초기화 에러:", e);
      }
    };
    initialize();
  }, [params.token, params.refresh, params.expires_in]); // 파라미터 변동 시 재실행

  // 토큰 만료 관리 및 갱신→프로필 fetch
  useEffect(() => {
    const maintainAccessToken = async () => {
      if (!token || !refreshToken) { setLoading(false); return; }
      console.log("inside maintainAccessToken");
      if (Date.now() > tokenExpiresAt) {
        // 만료됨: refresh 시도
        console.log(`expired! now : ${Date.now()}, expires : ${tokenExpiresAt}`);
        try {
          const res = await fetch(`${BACKEND_DOMAIN}/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ refreshToken }),
          });
          const data = await res.json();
          if (data.access_token) {
            console.log(`has access token : ${data.access_token}`);
            setToken(data.access_token);
            await AsyncStorage.setItem("kakao_access_token", data.access_token);
            // expires_in 값도 반영
            const updatedExpiresAt = Date.now() + (data.expires_in || 7199) * 1000;
            setTokenExpiresAt(updatedExpiresAt);
            await AsyncStorage.setItem("token_expires_at", String(updatedExpiresAt));
          } else {
            throw new Error("refresh 실패");
          }
        } catch (e) {
          setProfile(null);
          setLoading(false);
          Alert.alert('재로그인 필요', '세션이 만료되었습니다. 다시 로그인 해주세요.');
          router.replace('/login');
          return;
        }
      }
      // 프로필 fetch 시도
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_DOMAIN}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("프로필 정보를 불러오지 못했습니다.");
        const prof = await res.json();
        await AsyncStorage.setItem("id", String(prof.id));
        await AsyncStorage.setItem("profile_img", prof.properties.profile_image);
        setProfile(prof);
      } catch (e) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    maintainAccessToken();
  }, [token, refreshToken, tokenExpiresAt]);

  // 닉네임/생일 입력 및 등록 API
  const registerUser = async () => {
    if (!text || !birthday) {
      Alert.alert("입력 필요", "닉네임과 생일 모두 입력해주세요.");
      return;
    }
    console.log("got name & birth")
    try {
      const tokenValue = await AsyncStorage.getItem("kakao_access_token");
      const userId = await AsyncStorage.getItem("id");
      const userImg = await AsyncStorage.getItem("profile_img");
      const res = await fetch(`${BACKEND_DOMAIN}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenValue}`,
        },
        body: JSON.stringify({
          id: userId,
          name: text,
          profile_img: userImg,
          birth: birthday.toISOString().split('T')[0] 
        }),
      });
      const result = await res.json();
      console.log(`got res from register user, ${result}`)
      if (res.ok) {
        Alert.alert('등록 성공', '회원등록이 완료되었습니다!');
        router.push("/home/Home");
      } else {
        Alert.alert('등록 실패', result.message || "에러가 발생했습니다.");
      }
    } catch (e) {
      Alert.alert('네트워크 오류', '등록 중 오류가 발생했습니다.');
    }
  };

  // 렌더
  if (loading) {
    return <Text>사용자 정보를 불러오는 중...</Text>;
  }
  if (!profile) {
    return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>
        사용자 정보 조회 실패. 다시 로그인 해주세요.
      </Text>
      <Pressable
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.removeItem("kakao_access_token");
          await AsyncStorage.removeItem("kakao_refresh_token");
          await AsyncStorage.removeItem("token_expires_at");
          fetch(`${BACKEND_DOMAIN}/logout`).then(() => router.replace("/login"));
        }}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
      </Pressable>
    </View>
  );
  }

  const { properties } = profile;
 
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
          registerUser();
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
