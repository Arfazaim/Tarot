type SoundEffect = 'draw' | 'flip' | 'reset';

type SoundNote = {
  frequency: number;
  duration: number;
};

type SoundPreset = {
  waveform: OscillatorType;
  volume: number;
  notes: SoundNote[];
  spread: number;
  filterFrequency: number;
};

const soundPresets: Record<SoundEffect, SoundPreset> = {
  draw: {
    waveform: 'sine',
    volume: 0.028,
    spread: 0.08,
    filterFrequency: 1800,
    notes: [
      { frequency: 196, duration: 0.09 },
      { frequency: 294, duration: 0.1 },
      { frequency: 392, duration: 0.12 },
    ],
  },
  flip: {
    waveform: 'triangle',
    volume: 0.022,
    spread: 0.03,
    filterFrequency: 2400,
    notes: [{ frequency: 523.25, duration: 0.16 }],
  },
  reset: {
    waveform: 'sine',
    volume: 0.02,
    spread: 0.06,
    filterFrequency: 1400,
    notes: [
      { frequency: 392, duration: 0.08 },
      { frequency: 247, duration: 0.14 },
    ],
  },
};

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window.AudioContext) {
    return null;
  }

  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  return audioContext;
};

export const playSoundEffect = async (effect: SoundEffect) => {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    await context.resume();
  }

  const preset = soundPresets[effect];
  const startTime = context.currentTime + 0.01;

  preset.notes.forEach((note, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const noteStart = startTime + index * preset.spread;
    const noteEnd = noteStart + note.duration;

    oscillator.type = preset.waveform;
    oscillator.frequency.setValueAtTime(note.frequency, noteStart);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(preset.filterFrequency, noteStart);

    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(preset.volume, noteStart + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    oscillator.start(noteStart);
    oscillator.stop(noteEnd + 0.03);
  });
};