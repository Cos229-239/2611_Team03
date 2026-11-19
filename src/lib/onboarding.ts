// src/lib/onboarding.ts
// Remembers whether this device has finished the tutorial. Local only, no auth needed.

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'moodi.tutorialSeen';

export async function hasSeenTutorial(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY)) === 'true';
}

export async function markTutorialSeen(): Promise<void> {
  await AsyncStorage.setItem(KEY, 'true');
}

// Handy while developing: call this to replay onboarding.
export async function resetTutorial(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
