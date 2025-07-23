import { useRouter, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import tabTypeZustand from '../store/tabType';
import CustomText from './CustomText';

const Footer = ({ style }: { style?: object }) => {
  const router = useRouter();
  const pathname = usePathname();
  const tabType = tabTypeZustand((state) => state.tabType);
  const setTabType = tabTypeZustand((state) => state.setTabType);

  const isHome = pathname.includes('/home/Home'); // 홈 여부 확인

  useEffect(() => {
    const path = pathname.split("/").pop() || '';
    if (['Records', 'Select', 'Ranking'].includes(path)) {
      setTabType(path);
    }
  }, [pathname]);

  // 색상 결정 함수
  const getColor = (type: string) => {
    return isHome ? '#fff' : tabType === type ? '#FFCC00' : '#fff';
  };

  return (
    <View style={[styles.container, style]}>
      {/* Records */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Records');
          router.push("/records/Records");
        }}
      >
        <Image
          source={require('../assets/icons/records.png')}
          style={[styles.icon, { tintColor: getColor('Records') }]}
        />
        <CustomText style={{ color: getColor('Records') }}>
          기록
        </CustomText>
      </Pressable>

      {/* Select */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Select');
          router.push("/select/Select");
        }}
      >
        <Image
          source={require('../assets/icons/select.png')}
          style={[styles.icon, { tintColor: getColor('Select') }]}
        />
        <CustomText style={{ color: getColor('Select') }}>
          뽑기
        </CustomText>
      </Pressable>

      {/* Ranking */}
      <Pressable
        style={styles.tab}
        onPress={() => {
          setTabType('Ranking');
          router.push("/ranking/Ranking");
        }}
      >
        <Image
          source={require('../assets/icons/ranking.png')}
          style={[styles.icon, { tintColor: getColor('Ranking') }]}
        />
        <CustomText style={{ color: getColor('Ranking') }}>
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
