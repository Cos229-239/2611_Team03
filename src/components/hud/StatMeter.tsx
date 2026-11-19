// src/components/hud/StatMeter.tsx
// One floating HUD meter. forwardRef so the tutorial can spotlight it.

import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ViewHandle } from '../tutorial/SpotlightProvider';

type Props = {
  label: string;
  value: number; // 0-100
  color: string;
};

export const StatMeter = forwardRef<ViewHandle, Props>(function StatMeter({ label, value, color }, ref) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    // collapsable={false} is REQUIRED on Android, or measureInWindow can't find this view.
    <View ref={ref} collapsable={false} style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(pct)}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(201, 167, 255, 0.25)',
    gap: 6,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#e9ddff', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  value: { color: '#fff', fontSize: 11, fontWeight: '700' },
  track: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.12)', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});
