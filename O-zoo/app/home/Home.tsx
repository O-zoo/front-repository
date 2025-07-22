import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, StyleSheet, View, Text } from 'react-native';
import CustomText from '../../components/CustomText';
import Footer from '../../components/Footer';
import Fortune from './components/Fortune';
import MyPage from './components/MyPage';
import NewGame from './components/NewGame';

const HomeScreen = ({ navigation }) => {
  const [newGameVisible, setNewGameVisible] = useState(false);
  const [myPageVisible, setMyPageVisible] = useState(false);
  const [fortuneVisible, setFortuneVisible] = useState(false); // Fortune 모달 상태
  const [nickname] = useState('은챙이');

  const router = useRouter();
  const params = useLocalSearchParams();

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

      <Pressable onPress={() => router.push("../ranking/Ranking")}>
        <Text style={{color:'white'}}>일단랭킹보기</Text>
      </Pressable>

      <Pressable onPress={() => router.push("../records/Records")}>
        <Text style={{color:'white'}}>일단기록보기</Text>
      </Pressable>

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
          source={require('../../assets/images/egg.png')}
          style={{ width: 250, marginBottom: 180 }}
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
        birthday="2003.01.09"
        winRate={55}
      />
      <Fortune
        visible={fortuneVisible}
        onClose={() => setFortuneVisible(false)}
        zodiac="염소자리"
      />

      <Footer navigation={navigation} style={{ position: 'absolute', bottom: 0 }} />
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
    marginTop: 40,
    marginBottom:15,
    height:50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
  },
  nicknameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  nicknameText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
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
  },
});
