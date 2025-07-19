import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

const Main = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);

  const token = typeof params.token === "string" ? params.token : null;

  useEffect(() => {
    if (!token) return;

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
