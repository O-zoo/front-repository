import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import CustomText from '../../components/CustomText';

interface NewGameProps {
  visible: boolean;
  onClose: () => void;
}

const NewGame: React.FC<NewGameProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <CustomText style={{fontSize:16}}>새 대결 생성</CustomText>
          {/* 여기에 폼이나 추가 UI 컴포넌트를 넣을 수 있음 */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default NewGame;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  closeButtonText: { color: '#fff' },
});
