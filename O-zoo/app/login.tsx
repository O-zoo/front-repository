import React from 'react';
import { View, Button, StyleSheet, Linking, Platform } from 'react-native';
import * as LinkingExpo from 'expo-linking';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async () => {
    const kakaoLoginUrl = 'https://o-zoo-back.onrender.com/authorize';

    // 모바일 브라우저로 카카오 로그인 플로우 시작
    await Linking.openURL(kakaoLoginUrl);
  };

  // 딥링크 처리
  React.useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { queryParams } = LinkingExpo.parse(event.url);
      if (queryParams?.login === 'success' && queryParams?.token) {
        // 로그인 성공: main 화면으로 이동
        router.replace({
          pathname: '/main',
          params: {
            login: 'success',
            token: queryParams.token,
          },
        } as any);
      }
    };

    // 이벤트 리스너 등록
    const sub = Linking.addEventListener('url', handleDeepLink);
    // 앱이 백그라운드에서 시작될 경우 대응
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });
    return () => sub.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      <Button title="카카오 로그인" onPress={handleKakaoLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
});
