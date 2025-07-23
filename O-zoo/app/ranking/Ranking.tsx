import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Footer from '../../components/Footer';
import { useFonts } from 'expo-font';

const allRanking = [
  { id: '1', name: '은주연', score: 8080 },
  { id: '2', name: '은초코', score: 8000 },
  { id: '3', name: '심승훈', score: 7500 },
  { id: '4', name: '론디기', score: 7000 },
  { id: '5', name: '엘빈', score: 6000 },
  { id: '6', name: 'ㅇㅇㅇ', score: 5500 },
  { id: '7', name: 'ㅇㅇㅇ', score: 5300 },
  { id: '8', name: 'ㅇㅇㅇ', score: 5000 },
];

const friendRanking = [
  { id: '1', name: '은주연', score: 8080 },
  { id: '2', name: '은초코', score: 8000 },
];

const Ranking = () => {
  const [fontsLoaded] = useFonts({
      'Cafe24Ssurround': require('../../assets/fonts/Cafe24Ssurround-v2.0.ttf'),
  });
    
  const [selectedTab, setSelectedTab] = useState<'all' | 'friend'>('all');
  const router = useRouter();
  const params = useLocalSearchParams();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    let rankIcon;
    if (index === 0) {
      rankIcon = require('../../assets/icons/first.png');
    } else if (index === 1) {
      rankIcon = require('../../assets/icons/second.png');
    } else if (index === 2) {
      rankIcon = require('../../assets/icons/third.png');
    }
    if (!fontsLoaded) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
      </View>;
    }
    return (
      <View style={styles.rankItem}>
        {rankIcon ? (
          <Image source={rankIcon} style={styles.medalIcon} />
        ) : (
          <Text style={styles.rankText}>{index + 1}</Text>
        )}
        <View style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  // if (!fontsLoaded) {
  //   return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text style={{ fontSize: 16 }}>폰트를 불러오는 중입니다...</Text>
  //   </View>;
  // }

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
          keyExtractor={(item) => item.id}
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
    fontFamily: 'Cafe24Ssurround',
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
    fontFamily: 'Cafe24Ssurround',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Cafe24Ssurround',
  },
  tabSelected: {
    backgroundColor: '#fff',
    fontFamily: 'Cafe24Ssurround',
  },
  tabUnselected: {
    backgroundColor: '#FFD700', // 노란색
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Cafe24Ssurround',
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontFamily: 'Cafe24Ssurround',
  },
  medalIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  rankText: {
    width: 20,
    textAlign: 'center',
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
    fontFamily: 'Cafe24Ssurround',
  },
  score: {
    fontSize: 14,
    color: '#333',
  },
});
