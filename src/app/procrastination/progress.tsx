import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';

import {
View,
Text,
StyleSheet,
Image,
Pressable,
ScrollView,
} from 'react-native';

export default function ProgressScreen() {
const [steps, setSteps] = useState([
{ id: 1, label: 'Open Project File', complete: true },
{ id: 2, label: 'Read Instructions', complete: false },
{ id: 3, label: 'Create Outline', complete: false },
{ id: 4, label: 'Start First Section', complete: false },
]);
const [secondsLeft, setSecondsLeft] = useState(120);
const [timerRunning, setTimerRunning] = useState(false);

useEffect(() => {
if (!timerRunning || secondsLeft <= 0) return;

const timer = setInterval(() => {
setSecondsLeft((seconds) => seconds - 1);
}, 1000);

return () => clearInterval(timer);
}, [timerRunning, secondsLeft]);

const startTimer = () => {
setSecondsLeft(120);
setTimerRunning(true);
};

const completedCount = steps.filter((step) => step.complete).length;
const progressPercent = completedCount / steps.length;

const toggleStep = (id: number) => {
setSteps((currentSteps) =>
currentSteps.map((step) =>
step.id === id ? { ...step, complete: !step.complete } : step
)
);
};

return (
<ScrollView contentContainerStyle={styles.page}>
<View style={styles.container}>
    <Pressable
        style={styles.backButton}
        onPress={() => router.push('/procrastination/choose-task')}
    >
        <Text style={styles.backButtonText}>⬅️ Back</Text>
    </Pressable>

    <Pressable
    style={styles.nextButton}
    onPress={() => router.push('/procrastination/choose-task')}
    >
        <Text style={styles.nextButtonText}>Next ➡️</Text>
    </Pressable>

<Text style={styles.title}>Break It Down</Text>
<Text style={styles.subtitle}>One small step at a time</Text>
<Image
source={require('../../../assets/images/procrastination/break-it-down.png')}
style={styles.heroImage}
resizeMode="contain"
/>

<View style={styles.selectedTask}>
<Text style={styles.selectedTaskText}>
💻 Finish School Project
</Text>
</View>

<View style={styles.stepList}>
{steps.map((step) => (
<Pressable
key={step.id}
style={[
styles.stepRow,
step.complete && styles.completedStep,
]}
onPress={() => toggleStep(step.id)}
>
<Text style={styles.checkbox}>
{step.complete ? '✅' : '⬜'}
</Text>

<Text style={styles.stepText}>
{step.label}
</Text>
</Pressable>
))}
</View>

<Text style={styles.progressText}>
Your Progress: {completedCount} of {steps.length} complete
</Text>

<View style={styles.progressTrack}>
<View
style={[
styles.progressFill,
{ width: `${progressPercent * 100}%` },
]}
/>
</View>

<Text style={styles.encouragement}>
🏆 Great start! Your pet is cheering you on!
</Text>

<Pressable
style={styles.timerButton}
onPress={startTimer}
>
<Text style={styles.timerButtonText}>
{timerRunning
? `⏱️ ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`
: '⏱️ Start 2-Minute Timer'}
</Text>
</Pressable>
</View>
</ScrollView>
);
}

const styles = StyleSheet.create({
page: {
flexGrow: 1,
backgroundColor: '#26005C',
alignItems: 'center',
},

container: {
flexGrow: 1,
width: '100%',
maxWidth: 390,
paddingHorizontal: 24,
paddingTop: 55,
paddingBottom: 30,
alignItems: 'center',
},

title: {
color: '#F5C5FF',
fontSize: 30,
fontWeight: 'bold',
textAlign: 'center',
},

subtitle: {
color: '#F5C5FF',
fontSize: 18,
fontWeight: '600',
marginTop: 8,
marginBottom: 10,
},

heroImage: {
width: '100%',
height: 300,
marginTop: 5,
marginBottom: 10,
},

selectedTask: {
width: '100%',
backgroundColor: '#FFF9D9',
borderColor: '#FFD700',
borderWidth: 2,
borderRadius: 18,
paddingVertical: 14,
paddingHorizontal: 18,
marginBottom: 12,
},

selectedTaskText: {
fontSize: 18,
fontWeight: '600',
color: '#2F2440',
textAlign: 'center',
},

stepList: {
width: '100%',
},

stepRow: {
width: '100%',
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#F8F2FF',
borderRadius: 14,
paddingVertical: 13,
paddingHorizontal: 16,
marginBottom: 10,
},

completedStep: {
backgroundColor: '#DFF7DF',
},

checkbox: {
fontSize: 20,
marginRight: 12,
},

stepText: {
fontSize: 16,
color: '#2F2440',
flex: 1,
},

progressText: {
width: '100%',
color: '#FFFFFF',
fontSize: 18,
fontWeight: 'bold',
marginTop: 12,
marginBottom: 8,
},

progressTrack: {
width: '100%',
height: 12,
backgroundColor: '#D8C6F4',
borderRadius: 10,
overflow: 'hidden',
},

progressFill: {
height: '100%',
backgroundColor: '#7C2AE8',
borderRadius: 10,
},

encouragement: {
width: '100%',
color: '#FFFFFF',
fontSize: 15,
marginTop: 12,
textAlign: 'center',
},

timerButton: {
width: '100%',
backgroundColor: '#6F2DBD',
borderColor: '#FFD700',
borderWidth: 2,
borderRadius: 18,
paddingVertical: 16,
marginTop: 18,
alignItems: 'center',
},

timerButtonText: {
color: '#FFFFFF',
fontSize: 18,
fontWeight: 'bold',
},
backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e9c9ff',
},
backButtonText: {
    color: '#4b176f',
    fontSize: 16,
    fontWeight: 'bold',
},
nextButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#6F2DBD',
},
nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
},
});