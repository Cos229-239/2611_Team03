import React from 'react';
import {
View,
Text,
StyleSheet,
Image,
ImageBackground,
Pressable,
ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function ProcrastinationScreen() {
return (
<ImageBackground
source={require('../../../assets/images/procrastination/overwhelmed.png')}
style={styles.background}
resizeMode="cover"
>
<ScrollView contentContainerStyle={styles.container}>

<Text style={styles.title}>
Feeling Overwhelmed?
</Text>

<Image
source={require('../../../assets/images/procrastination/axolotl.png')}
style={styles.moodi}
resizeMode="contain"
/>

<View style={styles.bubble}>
<Text style={styles.message}>
Moodi says:
</Text>

<Text style={styles.encouragement}>
You don't have to do everything
at once. Let's take one small
step together!
</Text>
</View>

<Pressable
accessibilityRole="button"
style={styles.button}
onPress={() =>
router.push('/procrastination/choose-task')
}
>
<Text style={styles.buttonText}>
Help Me Start
</Text>
</Pressable>

</ScrollView>
</ImageBackground>
);
}

const styles = StyleSheet.create({
background: {
flex: 1,
width: '100%',
minHeight: '100%',
alignItems: 'center',
justifyContent: 'center',
},
container: {
flexGrow: 1,
alignItems: 'center',
alignSelf: 'center',
width: '100%',
maxWidth:390,
padding: 24,
paddingTop: 65,
},
title: {
fontSize: 24,
fontWeight: 'bold',
color: '#FFFFFF',
textAlign: 'center',
marginTop: 20,
},
moodi: {
width: 150, 
height: 150,
marginTop: 30,
},
bubble: {
backgroundColor: '#FAF7FF',
borderRadius: 24,
padding: 18,
width: '100%',
marginTop: 20,
},
message: {
fontSize: 20,
fontWeight: 'bold',
color: '#45276B',
textAlign: 'center',
},
encouragement: {
fontSize: 17,
color: '#30243F',
textAlign: 'center',
marginTop: 10,
lineHeight: 25,
},
button: {
backgroundColor: '#6f2dbd',
borderColor: '#ffd700',
borderWidth: 2,
borderRadius: 18,
paddingVertical: 16,
paddingHorizontal: 24,
width: '100%',
marginTop: 16,
alignItems: 'center',
},
buttonText: {
color: '#ffffff',
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
},
});
