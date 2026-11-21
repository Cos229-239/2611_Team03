import { Stack } from 'expo-router';
import { SpotlightProvider } from '../components/tutorial/SpotlightProvider';

export default function RootLayout() {
  return (
    <SpotlightProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SpotlightProvider>
  );
}