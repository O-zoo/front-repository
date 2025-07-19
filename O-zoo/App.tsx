import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';  // useFonts 훅 사용

import HomeScreen from './app/home/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  // 폰트 로딩
  const [fontsLoaded] = useFonts({
    Cafe24Ssurround: require('./assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  // 폰트 로딩 중이면 화면 렌더링 안 함
  if (!fontsLoaded) {
    return null; // 스플래시 화면이 보이게 두거나, 로딩 인디케이터를 넣어도 됨
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;