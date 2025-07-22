import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font'; // useFonts 훅 사용
import * as SplashScreen from 'expo-splash-screen'; // 스플래시 화면 제어를 위해 추가

// 스플래시 화면이 자동으로 숨겨지지 않도록 방지
// 앱 로딩이 완료될 때까지 스플래시 화면을 유지합니다.
SplashScreen.preventAutoHideAsync();

import HomeScreen from './app/home/Home';
import RankingScreen from './app/ranking/Ranking';
import RecordsScreen from './app/records/Records';
import SelectScreen from './app/select/Select';

const Stack = createNativeStackNavigator();

const App = () => {
  // 폰트 로딩
  // 'Cafe24Ssurround'라는 이름으로 폰트를 로드합니다.
  // 이 이름은 CustomText 컴포넌트나 다른 곳에서 fontFamily 스타일로 사용됩니다.
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('./assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  // 폰트가 로드되면 스플래시 화면 숨기기
  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 폰트가 로드되지 않았다면 아무것도 렌더링하지 않습니다.
  // 이 동안 Expo 스플래시 화면이 표시됩니다.
  if (!fontsLoaded) {
    return null;
  }

  // 폰트 로드가 완료되면 내비게이션 컨테이너를 렌더링합니다.
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Ranking" component={RankingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Records" component={RecordsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Select" component={SelectScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
