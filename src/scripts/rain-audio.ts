const TWO_PI = 2 * Math.PI;

function loopBuffer(context: AudioContext, seconds: number, crossfadeSeconds: number, render: (samples: Float32Array, channel: number) => void) {
  const length = Math.round(context.sampleRate * seconds);
  const overlap = Math.round(context.sampleRate * crossfadeSeconds);
  const buffer = context.createBuffer(2, length, context.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const samples = new Float32Array(length + overlap);
    render(samples, channel);

    const loop = buffer.getChannelData(channel);
    loop.set(samples.subarray(0, length));
    // Join the tail to the opening, then leave the body of the recording untouched.
    for (let i = 0; i < overlap; i++) {
      const weight = (1 - Math.cos(Math.PI * i / overlap)) / 2;
      loop[i] = samples[length + i] * (1 - weight) + samples[i] * weight;
    }
  }
  return buffer;
}

function rainBuffer(context: AudioContext) {
  const rate = context.sampleRate;
  const slowWeight = 1 - Math.exp(-TWO_PI * 380 / rate);
  const fastWeight = 1 - Math.exp(-TWO_PI * 2900 / rate);
  const dropChance = 280 / rate;
  const dropFade = Math.exp(-1 / (rate * 0.004));

  return loopBuffer(context, 21, 1.4, (samples, channel) => {
    let low = 0;
    let high = 0;
    let drop = 0;

    for (let i = 0; i < samples.length; i++) {
      const noise = 2 * Math.random() - 1;
      low += slowWeight * (noise - low);
      high += fastWeight * (noise - high);
      drop *= dropFade;
      if (Math.random() < dropChance) drop += Math.random() * 0.11;

      const swell = 0.88 + 0.12 * Math.sin(TWO_PI * i / rate / 9 + channel * 0.6);
      samples[i] = (low * 0.3 + (high - low) * 0.45 + (noise - high) * drop) * swell;
    }
  });
}

function musicBuffer(context: AudioContext) {
  const rate = context.sampleRate;
  const chords = [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 52, 55], [43, 50, 55, 62]];
  const chordSeconds = 7;

  return loopBuffer(context, chords.length * chordSeconds, 2, (samples, channel) => {
    for (const [index, chord] of chords.entries()) {
      const chordStart = Math.round(index * chordSeconds * rate);
      const count = Math.min(samples.length - chordStart, Math.round((chordSeconds + 3) * rate));
      const tones = chord.map(note => TWO_PI * 440 * 2 ** ((note - 69) / 12) / rate);

      for (let i = 0; i < count; i++) {
        const seconds = i / rate;
        const envelope = Math.sin(Math.PI * seconds / (chordSeconds + 3)) ** 2;
        let wave = 0;

        for (const [voice, frequency] of tones.entries()) {
          const phase = frequency * i * (channel === 0 ? 0.9992 : 1.0008);
          wave += (Math.sin(phase) + 0.14 * Math.sin(2 * phase)) / (voice + 2);
        }
        samples[chordStart + i] += wave * envelope * 0.13;
      }
    }
  });
}

export function createRainPlayer() {
  const context = new AudioContext();
  const master = context.createGain();
  const music = context.createGain();
  const rain = context.createBufferSource();

  master.gain.value = 0;
  music.gain.value = 0;
  music.connect(master);
  master.connect(context.destination);

  rain.buffer = rainBuffer(context);
  rain.loop = true;
  rain.connect(master);
  rain.start();

  let backing: AudioBufferSourceNode | undefined;
  return {
    context,
    setVolume(volume: number) {
      master.gain.setTargetAtTime((volume / 100) ** 1.5, context.currentTime, 0.025);
    },
    setMusic(enabled: boolean) {
      if (enabled && !backing) {
        backing = context.createBufferSource();
        backing.buffer = musicBuffer(context);
        backing.loop = true;
        backing.connect(music);
        backing.start();
      }
      music.gain.setTargetAtTime(enabled ? 0.53 : 0, context.currentTime, 0.065);
    },
  };
}
