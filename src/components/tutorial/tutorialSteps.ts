// src/components/tutorial/tutorialSteps.ts
// Onboarding screens 3-6 as data. Change the copy here without touching any UI code.
// Every targetId must match a registerTarget('...') id on the Oasis screen.

import type { TutorialStep } from './SpotlightProvider';

export const OASIS_TUTORIAL: TutorialStep[] = [
  {
    id: 'mochi',
    targetId: 'mochi',
    text: "This is Mochi's oasis. Mochi's face tells you how things are going, so keep an eye on it.",
  },
  {
    id: 'health',
    targetId: 'meter-health',
    text: "Health. Missed deadlines wear it down. Don't panic, Mochi is tougher than you think.",
  },
  {
    id: 'happiness',
    targetId: 'meter-happiness',
    text: 'Happiness goes up every time you actually finish something. A novel concept, I know.',
  },
  {
    id: 'energy',
    targetId: 'meter-energy',
    text: 'Energy. Mochi needs rest too. Unlike some people I could mention.',
  },
  {
    id: 'hunger',
    targetId: 'meter-hunger',
    text: 'Hunger. When it runs low, feed Mochi. It is not going to make itself a sandwich.',
  },
  {
    id: 'feed',
    targetId: 'feed-button',
    text: 'This is how you take care of Mochi between tasks.',
  },
  {
    id: 'closing',
    // no targetId: centered closing message (onboarding screen 6)
    text: "Mochi's well-being is nurtured through the goals you set, the progress you make, and the commitments you keep.",
  },
];
