import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

export default function MainScreen() {
  const params = useLocalSearchParams();
  const login = params?.login;
  const token = params?.token;
  const [responseText, setResponseText] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (login === 'success' && token) {
      setLoginSuccess(true);
      // Optional: 토큰을 AsyncStorage 등 로컬에 저장
    }
  }, [login, token]);

  // API 요청 예시
  const serverBaseUrl = 'https://o-zoo-back.onrender.com';

  const handleApiRequest = async (endpoint: string) => {
    try {
      const res = await axios.get(
        `${serverBaseUrl}${endpoint}`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setResponseText(JSON.stringify(res.data, null, 2));
    } catch (error) {
      const err = error as Error;
      setResponseText('API 호출 에러: ' + err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>카카오 로그인 및 API 예제</Text>
      <View style={styles.statusSection}>
        {loginSuccess ? (
          <Text style={{ color: 'green', fontSize: 18 }}>✅ 로그인 성공!</Text>
        ) : (
          <Text style={{ color: 'red', fontSize: 18 }}>🚪 아직 로그인하지 않았습니다.</Text>
        )}
        {token && <Text style={{ marginTop: 10 }}>🔐 토큰: {token}</Text>}
      </View>
      <View style={styles.buttonGroup}>
        <Button title="내 프로필 조회" onPress={() => handleApiRequest('/profile')} />
        <Button title="로그아웃" onPress={() => handleApiRequest('/logout')} />
        <Button title="연결 끊기" onPress={() => handleApiRequest('/unlink')} />
      </View>
      <Text style={styles.sectionTitle}>API 응답 결과</Text>
      <Text style={styles.responseBox}>{responseText}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 12 },
  statusSection: { alignItems: 'center', marginVertical: 12 },
  buttonGroup: { gap: 10, marginBottom: 20 },
  responseBox: { minHeight: 80, borderColor: '#ccc', borderWidth: 1, padding: 10, fontSize: 14, textAlignVertical: 'top' },
});
