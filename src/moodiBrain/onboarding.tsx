// app/onboarding.tsx
// Onboarding screens 1 and 2 (Moodi intro, Mochi intro).
// Screens 3-6 are NOT separate screens: they run as a spotlight tutorial on the real Oasis tab.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const PAGES = [
  {
    character: 'MOODI',
    art: '[ Moodi art ]',
    line: "Hi there! I'm Moodi, your personal coach, here to help you take care of Mochi.",
  },
  {
    character: 'MOCHI',
    art: '(• ‿ •)',
    line: "This is Mochi. Mochi is yours now. How Mochi feels depends on how you show up. Let me show you around.",
  },
];

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const current = PAGES[page];
  const isLast = page === PAGES.length - 1;

  const next = () => {
    if (!isLast) setPage(page + 1);
    else router.replace({ pathname: '/', params: { tutorial: '1' } });
  };

  return (
    <LinearGradient colors={['#1a0b3d', '#3b1780', '#120726']} style={styles.screen}>
      <View style={styles.artWrap}>
        <Text style={styles.art}>{current.art}</Text>
      </View>

      <View style={styles.bubble}>
        <Text style={styles.speaker}>MOODI</Text>
        <Text style={styles.line}>{current.line}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {PAGES.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
          ))}
        </View>
        <Pressable onPress={next} style={styles.button}>
          <Text style={styles.buttonText}>{isLast ? 'Show me' : 'Next'}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 80, paddingBottom: 48 },
  artWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  art: { fontSize: 44, color: '#ffc4dc' },
  bubble: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(40, 22, 80, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(201, 167, 255, 0.4)',
    marginBottom: 24,
  },
  speaker: { color: '#c9a7ff', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 6 },
  line: { color: '#fff', fontSize: 18, lineHeight: 26 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)' },
  dotActive: { backgroundColor: '#c9a7ff', width: 22 },
  button: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 999, backgroundColor: '#8b5cf6' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
