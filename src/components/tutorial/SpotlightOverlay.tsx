// src/components/tutorial/SpotlightOverlay.tsx
// Draws the dimmed screen with a "hole" over the target, plus Moodi's speech bubble.
//
// The hole is made from FOUR dim rectangles (above, below, left, right of the target).
// No SVG masks, no native modules, works in Expo Go on iOS and Android.
// Bonus: taps inside the hole reach the real element underneath, so a step can say "tap Feed".

import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { Rect } from './SpotlightProvider';

const PAD = 8; // breathing room around the highlighted element
const DIM = 'rgba(10, 4, 25, 0.8)';

type Props = {
  rect: Rect | null;
  text: string;
  isLast: boolean;
  onNext: () => void;
};

export function SpotlightOverlay({ rect, text, isLast, onNext }: Props) {
  const { width: W, height: H } = useWindowDimensions();

  const hole = rect
    ? { x: rect.x - PAD, y: rect.y - PAD, w: rect.width + PAD * 2, h: rect.height + PAD * 2 }
    : null;

  // Put the bubble below the target if there's room, otherwise above it.
  let bubblePosition: { top?: number; bottom?: number };
  if (!hole) bubblePosition = { top: H * 0.38 };
  else if (hole.y + hole.h < H * 0.6) bubblePosition = { top: hole.y + hole.h + 16 };
  else bubblePosition = { bottom: H - hole.y + 16 };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {hole ? (
        <>
          <View style={[styles.dim, { top: 0, left: 0, width: W, height: Math.max(0, hole.y) }]} />
          <View
            style={[
              styles.dim,
              { top: hole.y + hole.h, left: 0, width: W, height: Math.max(0, H - hole.y - hole.h) },
            ]}
          />
          <View style={[styles.dim, { top: hole.y, left: 0, width: Math.max(0, hole.x), height: hole.h }]} />
          <View
            style={[
              styles.dim,
              { top: hole.y, left: hole.x + hole.w, width: Math.max(0, W - hole.x - hole.w), height: hole.h },
            ]}
          />
          <View
            pointerEvents="none"
            style={[styles.ring, { top: hole.y, left: hole.x, width: hole.w, height: hole.h }]}
          />
        </>
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: DIM }]} />
      )}

      <View style={[styles.bubble, bubblePosition]}>
        <Text style={styles.speaker}>MOODI</Text>
        <Text style={styles.text}>{text}</Text>
        <Pressable onPress={onNext} style={styles.button} hitSlop={8}>
          <Text style={styles.buttonText}>{isLast ? "Let's go" : 'Next'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dim: { position: 'absolute', backgroundColor: DIM },
  ring: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c9a7ff',
    shadowColor: '#b388ff',
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  bubble: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(40, 22, 80, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(201, 167, 255, 0.5)',
    gap: 10,
  },
  speaker: { color: '#c9a7ff', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  text: { color: '#fff', fontSize: 17, lineHeight: 24 },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: '#8b5cf6',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
