import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { InteractionManager } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      try {
        const token = await AsyncStorage.getItem("kakao_access_token");
        const name = await AsyncStorage.getItem("userName");
        if(name){
          console.log(`got name : ${name}`);
          router.replace(`/home/Home`);
          // router.replace(`/main`);
        }
        else if (token) {
          // 자동 로그인 처리
          console.log(`got token : ${token}`)
          router.replace(`/main?token=${encodeURIComponent(token)}`);
        } else {
          //await AsyncStorage.removeItem("kakao_access_token");
          router.replace('/login');
        }
      } catch (error) {
        console.error('자동 로그인 실패:', error);
        router.replace('/login');
      }
    });

    return () => task.cancel();
  }, [router]);

  return null;
}


