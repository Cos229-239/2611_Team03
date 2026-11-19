// src/app/(tabs)/index.tsx
// The Pet Oasis tab: Mochi in the center, floating stat meters, Moodi's speech bubble.
//
// Uses MOCK stats for now. When the game-systems teammate ships the real pet store,
// replace useMockPet() with it. The only contract between you is the PetStats type.

import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { applyEvent, PetStats, STARTING_STATS } from '../../game/stats';
import { getMochiMood, MochiMood } from '../../game/mood';
import { StatMeter } from '../../components/hud/StatMeter';
import { useSpotlight } from '../../components/tutorial/SpotlightProvider';
import { OASIS_TUTORIAL } from '../../components/tutorial/tutorialSteps';
import { markTutorialSeen } from '../../lib/onboarding';

// TEMP: placeholder until the art lands. Swap each for require('../../assets/mochi/happy.png') etc.
const MOCHI_PLACEHOLDER: Record<MochiMood, string> = {
  happy: '(^ ‿ ^)',
  idle: '(• ‿ •)',
  sad: '(• ︵ •)',
  sleeping: '(- ‿ -) zZ',
};

const MOODI_LINES: Record<MochiMood, string> = {
  happy: 'Perhaps I underestimated you.',
  idle: 'Ah. There you are.',
  sad: 'Mochi has noticed. So have I.',
  sleeping: 'Mochi is recharging. Try not to need anything.',
};

function useMockPet() {
  const [stats, setStats] = useState<PetStats>(STARTING_STATS);
  const feed = () => setStats((s) => applyEvent(s, { type: 'PET_FED' }));
  return { stats, feed };
}

export default function OasisScreen() {
  const { stats, feed } = useMockPet();
  const mood = getMochiMood(stats);
  const { registerTarget, start } = useSpotlight();
  const { tutorial } = useLocalSearchParams<{ tutorial?: string }>();
  const tutorialStarted = useRef(false);

  // Start the tutorial only AFTER layout, otherwise every measurement comes back as 0,0.
  const handleLayout = () => {
    if (tutorial === '1' && !tutorialStarted.current) {
      tutorialStarted.current = true;
      requestAnimationFrame(() => start(OASIS_TUTORIAL, markTutorialSeen));
    }
  };

  return (
    <LinearGradient colors={['#1a0b3d', '#2d1260', '#120726']} style={styles.screen} onLayout={handleLayout}>
      {/* Top HUD: meters */}
      <View style={styles.meters}>
        <View style={styles.meterCol}>
          <StatMeter ref={registerTarget('meter-health')} label="HEALTH" value={stats.health} color="#ff7aa8" />
          <StatMeter ref={registerTarget('meter-energy')} label="ENERGY" value={stats.energy} color="#7ad7ff" />
        </View>
        <View style={styles.meterCol}>
          <StatMeter ref={registerTarget('meter-happiness')} label="HAPPINESS" value={stats.happiness} color="#ffd36e" />
          <StatMeter ref={registerTarget('meter-hunger')} label="HUNGER" value={stats.hunger} color="#9dff9d" />
        </View>
      </View>

      {/* Center: Mochi */}
      <View ref={registerTarget('mochi')} collapsable={false} style={styles.mochiWrap}>
        <View style={styles.mochiGlow} />
        <Text style={styles.mochiPlaceholder}>{MOCHI_PLACEHOLDER[mood]}</Text>
        <Text style={styles.moodTag}>{mood.toUpperCase()}</Text>
      </View>

      {/* Moodi commentary */}
      <View style={styles.moodiBubble}>
        <Text style={styles.moodiName}>MOODI</Text>
        <Text style={styles.moodiText}>{MOODI_LINES[mood]}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable ref={registerTarget('feed-button')} collapsable={false} onPress={feed} style={styles.actionBtn}>
          <Text style={styles.actionText}>Feed</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64, paddingHorizontal: 20, paddingBottom: 32 },
  meters: { flexDirection: 'row', gap: 12 },
  meterCol: { flex: 1, gap: 10 },
  mochiWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mochiGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(179, 136, 255, 0.18)',
  },
  mochiPlaceholder: { fontSize: 44, color: '#ffc4dc' },
  moodTag: { marginTop: 12, color: '#c9a7ff', fontSize: 11, letterSpacing: 3, fontWeight: '700' },
  moodiBubble: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(40, 22, 80, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(201, 167, 255, 0.35)',
    marginBottom: 16,
  },
  moodiName: { color: '#c9a7ff', fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },
  moodiText: { color: '#fff', fontSize: 15 },
  actions: { flexDirection: 'row', justifyContent: 'center' },
  actionBtn: { paddingVertical: 14, paddingHorizontal: 36, borderRadius: 999, backgroundColor: '#8b5cf6' },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
