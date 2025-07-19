import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { InteractionManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      try {
        console.log("trying auto login")
        const token = await AsyncStorage.getItem("kakao_access_token");
        if (token) {
          // 자동 로그인 처리
          console.log(`got token : ${token}`)
          router.replace(`/main?token=${encodeURIComponent(token)}`);
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('자동 로그인 처리 중 오류:', error);
        router.replace('/login');
      }
    });

    return () => task.cancel();
  }, [router]);

  return null;
}


