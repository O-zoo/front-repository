import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomText from '../../components/CustomText';
import Footer from '../../components/Footer';
import Fortune from './components/Fortune';
import MyPage from './components/MyPage';
import NewGame from './components/NewGame';

const HomeScreen =  () => {
  const [fontsLoaded] = useFonts({
    'Cafe24Ssurround': require('../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });

  const [newGameVisible, setNewGameVisible] = useState(false);
  const [myPageVisible, setMyPageVisible] = useState(false);
  const [fortuneVisible, setFortuneVisible] = useState(false); // Fortune 모달 상태
  const [id, setId] = useState('');
  const [nickname, setNickName] = useState('은챙이');
  const [birthday, setBirthday] = useState('');
  const [winRate, setWinrate] = useState('');
  const [luck, setLuck] = useState('');
  const [dragonStage, setDragonStage] = useState(0);
  
  const router = useRouter();
  const params = useLocalSearchParams();

  const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

  useEffect(() => {
    const loadId = async () => {
      try {
        const storedId = await AsyncStorage.getItem('id');
        if (storedId) {
          setId(storedId);
          console.log(`id set to : ${storedId}`);
          getUserInfo(storedId);
        }
      } catch (error) {
        console.error('Id 불러오기 에러:', error);
      }
    };

    const getUserInfo = async (id: String) => {
      try {
        const res = await fetch(`${BACKEND_DOMAIN}/api/user/findById`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        console.log(`got data : ${data.name} ${data.profile_img}, ${data.birth}, ${data.wins}, ${data.losses}, ${data.exp}, ${data.score}`);

        if (data.loginSuccess) {
          await AsyncStorage.setItem("userName", data.name);
          await AsyncStorage.setItem("profile_img", data.profile_img);
          await AsyncStorage.setItem("userBirth", data.birth);
          await AsyncStorage.setItem("wins", String(data.wins));
          await AsyncStorage.setItem("losses", String(data.losses));
          await AsyncStorage.setItem("exp", String(data.exp));
          await AsyncStorage.setItem("score", String(data.score));

          // 승률 계산
          let rate = 0;
          if (data.wins + data.losses === 0) {
            rate = 0;
          } else {
            rate = Number(((data.wins / (data.wins + data.losses)) * 100).toFixed(0));
          }
          setNickName(data.name);
          setBirthday(data.birth);
          getTodayLuck(data.birth);
          setWinrate(String(rate));

          // **승리 횟수에 따라 드래곤 단계 설정**
          if (data.wins >= 10) {
            setDragonStage(3);
          } else if (data.wins >= 5) {
            setDragonStage(2);
          } else if (data.wins >= 1) {
            setDragonStage(1);
          } else {
            setDragonStage(0); // egg
          }
        }
      } catch (e) {
        console.log(`error while fetching user info : ${e}`);
        return;
      }
    };


      const getTodayLuck = async (userbirth:String) => {
        try {
          const res = await fetch(`${BACKEND_DOMAIN}/api/user/getLuck`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              birth : userbirth
            }),
          });
          const data = await res.json();
          console.log(`got data : ${data.answer} `)
          if (data.answer) {
            setLuck(data.answer);
          }
        } catch (e) {
          console.log(`error while fetching user's luck : ${e}`);
          return;
        }
      }

      loadId();
    }, []);

    if (!fontsLoaded) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
      </View>;
    }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.headerTextContainer}>
        <CustomText style={styles.headerText}>
          새 대결을 시작하고 알을 깨워보세요!
        </CustomText>
      </View>

      {/* 닉네임 + 편집 아이콘 */}
      <View style={styles.nicknameWrapper}>
        <Pressable onPress={() => setMyPageVisible(true)} style={styles.nicknameRow}>
          <CustomText style={styles.nicknameText}>{nickname}</CustomText>
          <Image
            source={require('../../assets/icons/Edit_fill.png')}
            style={styles.editIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* 알 이미지 */}
      <Pressable style={styles.eggContainer} onPress={() => setFortuneVisible(true)}>
        <Image
          source={
            dragonStage === 0
              ? require('../../assets/images/egg.png')
              : dragonStage === 1
              ? require('../../assets/images/dragon1.png')
              : dragonStage === 2
              ? require('../../assets/images/dragon2.png')
              : require('../../assets/images/dragon3.png')
          }
          style={{ width: 300, marginBottom: 180 }}
          resizeMode="contain"
        />
      </Pressable>

      {/* 새 대결 생성 버튼 */}
      <Pressable style={styles.newGameButton} onPress={() => setNewGameVisible(true)}>
        <Image
          source={require('../../assets/icons/newgame.png')}
          style={{ width: 150 }}
          resizeMode="contain"
        />
      </Pressable>

      {/* 모달 */}
      <NewGame visible={newGameVisible} onClose={() => setNewGameVisible(false)} />
      <MyPage
        visible={myPageVisible}
        onClose={() => setMyPageVisible(false)}
        nickname={nickname}
        birthday={birthday}
        winRate={Number(winRate)}
      />
      <Fortune
        visible={fortuneVisible}
        onClose={() => setFortuneVisible(false)}
        zodiac={luck}
      />

      <Footer style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTextContainer: {
    marginTop: 80,
    marginBottom:15,
    height:80,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingTop:32,
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Cafe24Ssurround',
  },
  nicknameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  nicknameText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Cafe24Ssurround',
    marginRight: 6,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  eggContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameButton: {
    position: 'absolute',
    bottom: 90,
    right: 10,
  },
  nicknameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:  10,
  },
});
