import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Footer from '../../components/Footer';

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

const Ranking = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'friend'>('all');

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
          <Text style={styles.rankText}>{index + 1}</Text>
        )}
        <View style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
    >
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

      <Footer navigation={navigation} style={{ position: 'absolute', bottom: 0 }} />
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
  container: {
    marginTop: 30,
    width: 330,
    height: 500, // 박스 높이 고정
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
    fontSize: 14,
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
