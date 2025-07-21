import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigationTypes';
import tabTypeZustand from '../store/tabType';
import CustomText from './CustomText';

// 네비게이션 타입 정의
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Footer = ({ style }: { style?: object }) => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const tabType = tabTypeZustand((state) => state.tabType);
  const setTabType = tabTypeZustand((state) => state.setTabType);

  useEffect(() => {
    if (['Records', 'Select', 'Ranking'].includes(route.name as string)) {
      setTabType(route.name as string);
    }
  }, [route.name]);

  return (
    <View style={[styles.container, style]}>
      {/* Records */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Records');
          navigation.navigate('Records');
        }}
      >
        <Image
          source={require('../assets/icons/records.png')}
          style={[styles.icon, { tintColor: tabType === 'Records' ? '#FFCC00' : '#fff' }]}
        />
        <CustomText style={{ color: tabType === 'Records' ? '#FFCC00' : '#fff' }}>
          기록
        </CustomText>
      </Pressable>

      {/* Select */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Select');
          navigation.navigate('Select');
        }}
      >
        <Image
          source={require('../assets/icons/select.png')}
          style={[styles.icon, { tintColor: tabType === 'Select' ? '#FFCC00' : '#fff' }]}
        />
        <CustomText style={{ color: tabType === 'Select' ? '#FFCC00' : '#fff' }}>
          뽑기
        </CustomText>
      </Pressable>

      {/* Ranking */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Ranking');
          navigation.navigate('Ranking');
        }}
      >
        <Image
          source={require('../assets/icons/ranking.png')}
          style={[styles.icon, { tintColor: tabType === 'Ranking' ? '#FFCC00' : '#fff' }]}
        />
        <CustomText style={{ color: tabType === 'Ranking' ? '#FFCC00' : '#fff' }}>
          랭킹
        </CustomText>
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#01112B',
    marginBottom: 50,
  },
  tab: {
    width: '33%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});
