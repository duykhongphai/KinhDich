// Bộ tổng hợp âm thanh bằng Web Audio API thuần (Offline, không cần file ngoài)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('kinhdich_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('kinhdich_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Âm thanh kim loại đồng xu va chạm nhau (Metallic bronze coin clink)
  playCoinClink() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const frequencies = [2400, 3600, 4800, 6200];

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Độ lệch nhẹ ngẫu nhiên tạo âm thanh tự nhiên
      const detune = (Math.random() - 0.5) * 40;
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + detune, now);

      gain.gain.setValueAtTime(0.08 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12 + Math.random() * 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  // Âm thanh đồng xu rơi nảy trên mâm đồng
  playCoinBounce() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [1800, 2900, 4200].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 50), now);

      gain.gain.setValueAtTime(0.06 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    });
  }

  // Chuỗi âm thanh gieo xu liên hoàn (khi tung 3 đồng xu lên)
  playCoinTossSequence() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Tung lên: tiếng va chạm ban đầu
    this.playCoinClink();

    // Nảy giữa không trung
    setTimeout(() => this.playCoinClink(), 120);
    setTimeout(() => this.playCoinClink(), 260);

    // Tiếp đất trên mâm đồng
    setTimeout(() => this.playCoinBounce(), 1075);
    setTimeout(() => this.playCoinBounce(), 1140);
    setTimeout(() => this.playCoinBounce(), 1205);
  }

  // Tiếng chuông khánh đồng / Bát nhã thiền tịnh (Singing bowl / Temple chime) khi định hào hoặc mở quẻ
  playBellGong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const partials = [
      { freq: 261.63, gain: 0.15, decay: 2.5 },  // Đô (C4)
      { freq: 523.25, gain: 0.10, decay: 2.0 },  // Octave
      { freq: 784.88, gain: 0.06, decay: 1.6 },  // Quãng 5
      { freq: 1046.50, gain: 0.03, decay: 1.2 }, // Octave 2
      { freq: 1318.51, gain: 0.02, decay: 0.8 }, // Mi
    ];

    partials.forEach(({ freq, gain: initGain, decay }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(initGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  }
}

export const sound = new SoundFX();
