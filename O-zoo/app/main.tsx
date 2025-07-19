import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Main = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Express 백엔드의 /profile 엔드포인트에서 사용자 정보 불러오기
    fetch(`${BACKEND_DOMAIN}/profile`, {
      method: "GET",
      credentials: "include", // 세션 쿠키 필요 시(WebView는 불가, 딥링크 방식이면 세션 대신 토큰 공유 필요)
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  if (!profile) {
    return <Text>사용자 정보를 불러오는 중...</Text>;
  }

  const { properties, kakao_account } = profile;

  return (
    <View style={styles.container}>
      <Image source={{ uri: properties?.profile_image }} style={styles.avatar} />
      <Text style={styles.name}>👋 {properties?.nickname} 님</Text>
      <Text>📧 {kakao_account?.email}</Text>
      <Button title="로그아웃" onPress={() => {
        fetch(`${BACKEND_DOMAIN}/logout`).then(() => router.replace("/login"));
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
});

export default Main;
