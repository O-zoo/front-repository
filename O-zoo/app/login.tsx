import React from "react";
import { Button, View, StyleSheet, Image } from "react-native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Login = () => {
  const signInWithKakao = async () => {
    const token = await AsyncStorage.getItem("kakao_access_token");
    if (token) {
      // 자동 로그인 처리
      console.log(`got token : ${token}`)
    } 
    // 백엔드 API에서 카카오 OAuth2 인증 시작
    Linking.openURL(`${BACKEND_DOMAIN}/authorize`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png",
        }}
        style={styles.logo}
      />
      <Button title="카카오 로그인" onPress={signInWithKakao} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 200, height: 50, marginBottom: 20 },
});

export default Login;
