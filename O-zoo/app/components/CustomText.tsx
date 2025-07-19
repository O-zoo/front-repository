import React from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cafe24Ssurround', // App.tsx에서 로드한 이름
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
