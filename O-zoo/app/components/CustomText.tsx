import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;       // 텍스트나 컴포넌트가 children으로 올 수 있음
  style?: TextStyle;               // style은 선택적이며, TextStyle 타입
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cafe24Ssurround-v2.0.ttf',
  },
});

const CustomText: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
