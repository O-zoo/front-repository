// import React, {useState} from 'react';
// import { View, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
// import Footer from '../../components/Footer';
// import CustomText from '../../components/CustomText';

// const HomeScreen = ({ navigation }) => {
//   const [newGameVisible, setNewGameVisible] = useState(false);

//   return (
//     <ImageBackground
//       source={require('../../assets/images/background.png')} // 배경 이미지
//       style={styles.background}
//       resizeMode="cover"
//     >

//       <View style={styles.headerTextContainer}>
//         <CustomText style={styles.headerText}>
//           새 대결을 시작하고 알을 깨워보세요!
//         </CustomText>
//       </View>

//       <View style={styles.eggContainer}>
//         <Image
//           source={require('../../assets/images/egg.png')}
//           style={{width:300, marginBottom:180}}
//           resizeMode="contain"
//         />
//       </View>

//       <Pressable style={{position:'absolute', right:10, bottom:90}} onPress = { () => setNewGameVisible(true)} >
//         <Image
//           source={require('../../assets/icons/newgame.png')}
//           style={{ width: 150}}
//           resizeMode="contain"
//         />
//       </Pressable>

//       <NewGame visible={newGameVisible} onClose={() => setNewGameVisible(false)}/>

//       <Footer navigation={navigation} style={{position:'absolute', bottom:0}} />
//     </ImageBackground>
//   );
// };

// export default 

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   headerTextContainer: {
//     marginTop: 40,
//     marginBottom: 0,
//     paddingHorizontal: 40,
//     paddingVertical: 20,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//   },
//   headerText: {
//     color: '#000',
//     fontSize: 15,
//     textAlign: 'center',
//   },
//   eggContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
