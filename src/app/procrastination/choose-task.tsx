import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
Image,
Pressable,
ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function ChooseTaskScreen() {
const [selectedTask, setSelectedTask] = useState('school');

const tasks = [
{
id: 'school',
icon: '💻',
label: 'Finish School Project',
},
{
id: 'assignment',
icon: '📝',
label: 'Complete an Assignment',
},
{
id: 'space',
icon: '🏠',
label: 'Tidy My Space',
},
{
id: 'selfcare',
icon: '🧘🏽‍♀️',
label: 'Self-Care Break',
},
];

return (
<ScrollView contentContainerStyle={styles.page}>
<View style={styles.container}>

<Text style={styles.title}>⭐ Choose Your Task</Text>

<Text style={styles.subtitle}>
What’s one thing you’d like help starting?
</Text>

<View style={styles.artworkStage}>
<Image
source={require('../../../assets/images/procrastination/choose-task.png')}
style={styles.heroImage}
resizeMode="contain"
/>

<Image
source={require('../../../assets/images/procrastination/speech-bubble.png')}
style={styles.speechBubble}
resizeMode="contain"
/>

<Image
source={require('../../../assets/images/procrastination/axolotl.png')}
style={styles.axolotl}
resizeMode="contain"
/>
</View>

<View style={styles.taskList}>
{tasks.map((task) => {
const selected = selectedTask === task.id;

return (
<Pressable
key={task.id}
style={[
styles.taskRow,
selected && styles.selectedTask,
]}
onPress={() => setSelectedTask(task.id)}
>
<Text style={styles.taskIcon}>{task.icon}</Text>

<Text style={styles.taskText}>
{task.label}
</Text>

<View
style={[
styles.checkbox,
selected && styles.selectedCheckbox,
]}
/>
</Pressable>
);
})}
</View>

<Pressable
style={styles.breakButton}
onPress={() => router.push('/procrastination/progress')}
>
<Text style={styles.breakButtonText}>
Break It Down
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
paddingTop: 0,
paddingBottom: 30,
},

artworkStage: {
width: '100%',
height: 300,
position: 'relative',
marginTop: 0,
marginBottom: 8,
},

title: {
color: '#F5C5FF',
fontSize: 28,
fontWeight: 'bold',
textAlign: 'center',
marginTop: 55,
},

subtitle: {
color: '#E9A8F8',
fontSize: 17,
fontWeight: '600',
textAlign: 'center',
marginTop: 12,
marginBottom: 15,
},

heroImage: {
width: 255,
height: 275,
position: 'absolute',
left: 8,
bottom: 0,
},

taskList: {
width: '100%',
gap: 12,
},

taskRow: {
minHeight: 58,
backgroundColor: '#F8F2FF',
borderRadius: 14,
borderWidth: 2,
borderColor: '#B76CE5',
paddingHorizontal: 15,
flexDirection: 'row',
alignItems: 'center',
},

selectedTask: {
backgroundColor: '#FFFDEB',
borderColor: '#FFD700',
borderWidth: 3,
},

taskIcon: {
fontSize: 27,
width: 42,
},

taskText: {
flex: 1,
color: '#22142E',
fontSize: 16,
fontWeight: '600',
},

checkbox: {
width: 22,
height: 22,
borderWidth: 1.5,
borderColor: '#777777',
backgroundColor: '#FFFFFF',
},

selectedCheckbox: {
backgroundColor: '#FFD700',
borderColor: '#FFD700',
},

breakButton: {
width: '100%',
backgroundColor: '#6F2DBD',
borderColor: '#FFD700',
borderWidth: 2,
borderRadius: 18,
paddingVertical: 16,
alignItems: 'center',
marginTop: 65,
},

breakButtonText: {
color: '#FFFFFF',
fontSize: 19,
fontWeight: 'bold',
},

speechBubble: {
width: 155,
height: 125,
position: 'absolute',
right: 0,
top: 50,
},

axolotl: {
width: 85,
height: 85,
position: 'absolute',
right: 5,
bottom: 0,
},
});