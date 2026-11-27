import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;

    if (secondsLeft <= 0) {
      setTimerRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerRunning, secondsLeft]);

  const addFiveMinutes = () => {
    setSecondsLeft((seconds) => seconds + 5 * 60);
    if (secondsLeft <= 0) {
      setTimerRunning(true);
    }
  };

  const endTimerEarly = () => {
    setTimerRunning(false);
    setSecondsLeft(0);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Mochi-moonlit-nook.png')}
        style={styles.image}
      />
      <Text style={styles.header}>✧Moodi✧</Text>
      <Text style={styles.text}>Focus Mode</Text>

      <Text style={styles.timerDisplay} accessibilityLiveRegion="polite">
        {`${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`}
      </Text>
      <View style={styles.timerControls}>
        <Pressable
          style={styles.control}
          onPress={addFiveMinutes}
          accessibilityRole="button"
          accessibilityLabel="Add five minutes"
        >
          <View style={styles.controlIcon}>
            <Text style={styles.controlIconText}>⏰</Text>
          </View>
          <Text style={styles.controlLabel}>+5 min</Text>
        </Pressable>

        <Pressable
          style={styles.control}
          onPress={() => setTimerRunning((running) => !running)}
          accessibilityRole="button"
          accessibilityLabel={timerRunning ? 'Pause timer' : 'Resume timer'}
        >
          <View style={styles.controlIcon}>
            <Text style={styles.controlIconText}>{timerRunning ? 'Ⅱ' : '▶'}</Text>
          </View>
          <Text style={styles.controlLabel}>{timerRunning ? 'Pause' : 'Resume'}</Text>
        </Pressable>

        <Pressable
          style={styles.control}
          onPress={endTimerEarly}
          accessibilityRole="button"
          accessibilityLabel="End focus mode early"
        >
          <View style={styles.controlIcon}>
            <Text style={styles.controlIconText}>⏹</Text>
          </View>
          <Text style={styles.controlLabel}>End early</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    color: "#D58BF3",
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: "#fff",
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 100,
    textAlign: 'center',
  },
  timerDisplay: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_700Bold',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 400,
    textAlign: 'center',
  },
  timerControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#391C5B',
    borderColor: '#B18ED3',
    borderWidth: 1,
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginTop: 18,
  },
  control: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 88,
  },
  controlIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#391C5B',
    borderColor: '#B18ED3',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIconText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
  },
  controlLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
});
