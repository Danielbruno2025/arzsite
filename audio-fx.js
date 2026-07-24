/* ==========================================================================
   AGAUREZ - Web Audio API Procedural Ritual Sound FX & Native Player Engine
   ========================================================================== */

class AgaurezAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isPlayingNative = false;
        this.audioElement = null;

        // Initialize AudioContext on first user interaction
        this.initAudioContext = this.initAudioContext.bind(this);
        window.addEventListener('click', this.initAudioContext, { once: true });
        window.addEventListener('keydown', this.initAudioContext, { once: true });
    }

    initAudioContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        } else if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // 1. PROCEDURAL RITUAL HOVER SOUND (Sub-bass resonant hum)
    playHoverSound() {
        if (this.isMuted || !this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A note
            osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.25);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(180, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {
            // Silence if audio context blocked
        }
    }

    // 2. PROCEDURAL RITUAL CLICK SOUND (Deep thud + ember crackle)
    playClickSound() {
        if (this.isMuted || !this.ctx) return;
        try {
            if (this.ctx.state === 'suspended') this.ctx.resume();

            // Sub thud
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(110, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.35);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.35);

            // Crackle noise burst
            this.playNoiseBurst(0.05, 0.03);
        } catch (e) {
            // Silence if audio context blocked
        }
    }

    // 3. PROCEDURAL NOISE BURST (Ember crackle / VHS Static)
    playNoiseBurst(duration = 0.08, volume = 0.02) {
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // 4. ATTACH SOUND FX TO INTERACTIVE UI ELEMENTS
    attachUIListeners() {
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, .social-link, .stream-btn, #canvas-3d');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.playHoverSound());
            el.addEventListener('click', () => this.playClickSound());
        });
    }
}

// Instantiate global audio engine
window.agaurezAudio = new AgaurezAudioEngine();

document.addEventListener('DOMContentLoaded', () => {
    window.agaurezAudio.attachUIListeners();
});
