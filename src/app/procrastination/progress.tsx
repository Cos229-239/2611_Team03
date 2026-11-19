import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressScreen() {
return (
<View style={styles.container}>
<Text style={styles.title}>
Break It Down
</Text>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#E9D5FF',
justifyContent: 'center',
alignItems: 'center',
},
title: {
fontSize: 28,
fontWeight: 'bold',
color: '#4B286D',
},
});