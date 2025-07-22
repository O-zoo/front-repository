import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './app/home/Home';
import RankingScreen from './app/ranking/Ranking';
import RecordsScreen from './app/records/Records';
import SelectScreen from './app/select/Select';

const Stack = createNativeStackNavigator();

// 앱 시작 시 스플래시 화면을 자동으로 숨기지 않게 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // 폰트 로딩
        await Font.loadAsync({
          'Cafe24Ssurround': require('./assets/fonts/Cafe24Ssurround-v2.0.ttf'),
        });
        console.log('폰트 로딩 완료');
      } catch (err) {
        console.warn('폰트 로딩 오류:', err);
      } finally {
        setFontsLoaded(true); // 폰트 로딩 상태 업데이트
        SplashScreen.hideAsync(); // 스플래시 화면 숨김
      }
    };
    loadAssets();
  }, []);

  if (!fontsLoaded) {
    // 폰트 로딩 중이면 스플래시 화면이 유지되도록 null 반환
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Records" component={RecordsScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
