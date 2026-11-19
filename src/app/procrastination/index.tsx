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
},
container: {
flexGrow: 1,
alignItems: 'center',
padding: 24,
paddingTop: 65,
},
title: {
fontSize: 28,
fontWeight: 'bold',
color: '#FFFFFF',
textAlign: 'center',
},
moodi: {
width: 230,
height: 230,
marginTop: 25,
},
bubble: {
backgroundColor: '#FAF7FF',
borderRadius: 24,
padding: 20,
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
backgroundColor: '#F8F2FF',
borderColor: '#D4AF37',
borderWidth: 2,
borderRadius: 25,
padding: 18,
width: '100%',
marginTop: 30,
},
buttonText: {
color: '#45276B',
fontSize: 20,
fontWeight: 'bold',
textAlign: 'center',
},
});
