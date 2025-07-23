import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Footer from '../../components/Footer';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ranking = () => {
  const [fontsLoaded] = useFonts({
      'Cafe24Ssurround': require('../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
    });
    
  const [selectedTab, setSelectedTab] = useState<'all' | 'friend'>('all');
  const [allRanking, setAllRanking] = useState([]);
  const [friendRanking, setFriendRanking] = useState([]);
  const [token, setToken] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

  const BACKEND_DOMAIN = "https://o-zoo-back.onrender.com";

  useEffect(() => {
    const loadAllRanking = async () => {
      try {
        const res = await fetch(`${BACKEND_DOMAIN}/api/top10`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          console.log(`got all ranking data: ${data.top10}`);
          setAllRanking(data.top10);
      } catch (error) {
        console.error('전체 랭킹 불러오기 에러:', error);
      }
    }
    loadAllRanking();
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const kakao_token = await AsyncStorage.getItem('kakao_access_token');
      if (kakao_token) {
        setToken(kakao_token);
        console.log(`got token : ${kakao_token}`);
        loadFriendRanking(kakao_token);
      } else {
        console.error('토큰을 불러오는 데 실패했습니다.');
      }
    }
    const loadFriendRanking = async (kakao_token:String) => {
      try {
        const userId = await AsyncStorage.getItem('id');
        const res = await fetch(`${BACKEND_DOMAIN}/api/user/friendRankings`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${kakao_token}`,
            },
            body: JSON.stringify({
              id: userId,
            }),
          });
          const data = await res.json();
          console.log(`got ranking data: ${data.rankings}, ${data.success}`);
          setFriendRanking(data.rankings);
      } catch (error) {
        console.error('친구 랭킹 불러오기 에러:', error);
      }
    }
    loadToken();
  }, []);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    let rankIcon;
    if (index === 0) {
      rankIcon = require('../../assets/icons/first.png');
    } else if (index === 1) {
      rankIcon = require('../../assets/icons/second.png');
    } else if (index === 2) {
      rankIcon = require('../../assets/icons/third.png');
    }

    return (
      <View style={styles.rankItem}>
        {rankIcon ? (
          <Image source={rankIcon} style={styles.medalIcon} />
        ) : (
          <Text style={styles.rankText}>{item.rank}</Text>
        )}
        <Image source={{ uri: item.profile_img }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
    </View>;
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
    >

      <Pressable style={styles.homeButton} onPress={() => { router.push("/home/Home");}}>
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text> 
      </Pressable>

      <View style={styles.container}>
        {/* 탭 버튼 */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, selectedTab === 'all' ? styles.tabSelected : styles.tabUnselected]}
            onPress={() => setSelectedTab('all')}
          >
            <Text style={styles.tabText}>종합 랭킹</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === 'friend' ? styles.tabSelected : styles.tabUnselected]}
            onPress={() => setSelectedTab('friend')}
          >
            <Text style={styles.tabText}>친구 랭킹</Text>
          </Pressable>
        </View>

        {/* 랭킹 리스트 */}
        <FlatList
          data={selectedTab === 'all' ? allRanking : friendRanking}
          renderItem={renderItem}
          keyExtractor={(item) => item.rank.toString()}
        />
      </View>

      <Footer style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 40, // 상태바 높이 감안
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 90,
    width: 330,
    height: 520, 
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 40,
    borderTopLeftRadius:10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSelected: {
    backgroundColor: '#fff',
  },
  tabUnselected: {
    backgroundColor: '#FFD700', // 노란색
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  medalIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  rankText: {
    width: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 14,
    color: '#333',
  },
});
