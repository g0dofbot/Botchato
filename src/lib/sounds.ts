'use client';

import * as Tone from 'tone';

let synth: Tone.Synth | null = null;
let isInitialized = false;

const getSynth = (): Tone.Synth | null => {
  if (typeof window === 'undefined') return null;
  if (!synth) {
    synth = new Tone.Synth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0,
        release: 0.1
      }
    }).toDestination();
  }
  return synth;
}

export const initAudio = async (): Promise<void> => {
  if (isInitialized || typeof window === 'undefined') return;
  
  try {
    await Tone.start();
    getSynth(); // Initialize synth after user interaction
    isInitialized = true;
    console.log('Audio context started');
  } catch (e) {
    console.error("Could not start audio context: ", e);
  }
};

export const playMessageSentSound = (): void => {
  const s = getSynth();
  if (!s || !isInitialized) return;
  s.triggerAttackRelease('C4', '16n', Tone.now());
};

export const playMessageReceivedSound = (): void => {
  const s = getSynth();
  if (!s || !isInitialized) return;
  const now = Tone.now();
  s.triggerAttackRelease('E5', '16n', now);
  s.triggerAttackRelease('G5', '16n', now + 0.1);
};
