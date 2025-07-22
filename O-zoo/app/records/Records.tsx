import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import Footer from '../../components/Footer';
import ING from './components/ING';
import WIN from './components/WIN';
import LOSE from './components/LOSE';

const recordsData = [
  { id: '1', status: 'win', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
  { id: '2', status: 'lose', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
  { id: '3', status: 'lose', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
  { id: '4', status: 'win', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
  { id: '5', status: 'win', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
];

const ongoingData = [
  { id: '1', status: 'ongoing', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
  { id: '2', status: 'ongoing', name: '내기 이름', date: '2025.07.18', members: ['김ㅇㅇ', '이ㅇㅇ'] },
];

const RecordsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'ongoing' | 'all'>('ongoing');
  const [selectedModal, setSelectedModal] = useState<'ING' | 'WIN' | 'LOSE' | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleItemPress = (status: string) => {
    if (status === 'ongoing') setSelectedModal('ING');
    else if (status === 'win') setSelectedModal('WIN');
    else if (status === 'lose') setSelectedModal('LOSE');
  };

  const renderItem = ({ item }: { item: any }) => {
    const icon =
      item.status === 'win'
        ? require('../../assets/icons/win.png')
        : item.status === 'lose'
        ? require('../../assets/icons/lose.png')
        : require('../../assets/icons/ongoing.png');

    return (
      <Pressable onPress={() => handleItemPress(item.status)} style={styles.item}>
        <Image source={icon} style={styles.statusIcon} resizeMode="contain" />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View style={styles.members}>
          {item.members.map((member: string, idx: number) => (
            <Text key={idx} style={styles.memberText}>
              {member}
            </Text>
          ))}
        </View>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 홈으로 돌아가기 */}
      <Pressable style={styles.homeButton} onPress={() => router.push('/home/Home')}>
        <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
      </Pressable>

      {/* 메인 박스 */}
      <View style={styles.box}>
        {/* 탭 버튼 */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, selectedTab === 'ongoing' && styles.tabActive]}
            onPress={() => setSelectedTab('ongoing')}
          >
            <Text style={[styles.tabText, selectedTab === 'ongoing' && styles.tabTextActive]}>
              진행중
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === 'all' && styles.tabActive]}
            onPress={() => setSelectedTab('all')}
          >
            <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>
              전적
            </Text>
          </Pressable>
        </View>

        {/* 리스트 */}
        <FlatList
          data={selectedTab === 'ongoing' ? ongoingData : recordsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 6 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* 모달 */}
      {selectedModal === 'ING' && <ING visible={true} onClose={() => setSelectedModal(null)} />}
      {selectedModal === 'WIN' && <WIN visible={true} onClose={() => setSelectedModal(null)} />}
      {selectedModal === 'LOSE' && <LOSE visible={true} onClose={() => setSelectedModal(null)} />}

      <Footer navigation={navigation} style={{ position: 'absolute', bottom: 0 }} />
    </ImageBackground>
  );
};

export default RecordsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
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
  box: {
    width: 330,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    borderColor: '#ddd',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', // 기본 노란색
  },
  tabActive: {
    backgroundColor: '#fff', // 선택 탭은 흰색
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tabTextActive: {
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
  },
  members: {
    flexDirection: 'row',
    gap: 4,
  },
  memberText: {
    fontSize: 12,
    color: '#333',
  },
});
