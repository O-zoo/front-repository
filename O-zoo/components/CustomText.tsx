import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

const CustomText = (props: TextProps) => {
  return <Text {...props} style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: { fontFamily: 'Cafe24Ssurround' },
});

export default CustomText;
