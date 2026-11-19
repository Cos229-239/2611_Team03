// src/components/tutorial/SpotlightProvider.tsx
// The engine behind the HUD tutorial.
//
// How it works:
// 1. Any element that can be spotlighted registers itself by id:  <View ref={registerTarget('meter-health')} collapsable={false}>
// 2. Something calls start(steps). Each step names a targetId (or none, for a centered message).
// 3. For each step we measure where the target sits on screen (measureInWindow),
//    then SpotlightOverlay dims everything except that rectangle and shows Moodi's line.
//
// Wrap the whole app in <SpotlightProvider> inside app/_layout.tsx.

import { ComponentRef, createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';
import type { View } from 'react-native';
import { SpotlightOverlay } from './SpotlightOverlay';

// The type React Native gives a View's ref. Works on both older and newer RN versions.
export type ViewHandle = ComponentRef<typeof View>;

export type Rect = { x: number; y: number; width: number; height: number };

export type TutorialStep = {
  id: string;
  targetId?: string; // omit for a centered message with no cutout
  text: string;
};

type SpotlightContextValue = {
  registerTarget: (id: string) => (node: ViewHandle | null) => void;
  start: (steps: TutorialStep[], onDone?: () => void) => void;
  isActive: boolean;
};

const SpotlightContext = createContext<SpotlightContextValue | null>(null);

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const targets = useRef(new Map<string, ViewHandle>());
  const onDoneRef = useRef<(() => void) | undefined>(undefined);
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const registerTarget = useCallback(
    (id: string) => (node: ViewHandle | null) => {
      if (node) targets.current.set(id, node);
      else targets.current.delete(id);
    },
    []
  );

  const measureStep = useCallback((step: TutorialStep | undefined) => {
    if (!step?.targetId) {
      setRect(null);
      return;
    }
    const node = targets.current.get(step.targetId);
    if (!node) {
      console.warn(`[Spotlight] no target registered with id "${step.targetId}"`);
      setRect(null);
      return;
    }
    node.measureInWindow((x, y, width, height) => setRect({ x, y, width, height }));
  }, []);

  const start = useCallback(
    (newSteps: TutorialStep[], onDone?: () => void) => {
      onDoneRef.current = onDone;
      setSteps(newSteps);
      setIndex(0);
      measureStep(newSteps[0]);
    },
    [measureStep]
  );

  const next = useCallback(() => {
    const nextIndex = index + 1;
    if (nextIndex >= steps.length) {
      setSteps([]);
      setRect(null);
      onDoneRef.current?.();
      return;
    }
    setIndex(nextIndex);
    measureStep(steps[nextIndex]);
  }, [index, steps, measureStep]);

  const current = steps[index];

  return (
    <SpotlightContext.Provider value={{ registerTarget, start, isActive: steps.length > 0 }}>
      {children}
      {current && (
        <SpotlightOverlay
          rect={rect}
          text={current.text}
          isLast={index === steps.length - 1}
          onNext={next}
        />
      )}
    </SpotlightContext.Provider>
  );
}

export function useSpotlight(): SpotlightContextValue {
  const ctx = useContext(SpotlightContext);
  if (!ctx) throw new Error('useSpotlight must be used inside <SpotlightProvider>');
  return ctx;
}
