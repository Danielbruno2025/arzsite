/* ==========================================================================
   AGAUREZ - 3D WebGL Logo & Ember Particle Engine (Three.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initNotificationForm();
    initAudioWidget();
    initLanguageSwitcher();
});

function init3DScene() {
    const canvas = document.getElementById('canvas-3d');
    if (!canvas) return;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020202, 0.015);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 14);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. LIGHTING
    // Ambient dark purple light
    const ambientLight = new THREE.AmbientLight(0x20052b, 1.5);
    scene.add(ambientLight);

    // Spotlight 1: Crimson Blood Red (Front-Right)
    const crimsonLight = new THREE.SpotLight(0xc70039, 8);
    crimsonLight.position.set(10, 15, 12);
    crimsonLight.angle = Math.PI / 4;
    crimsonLight.penumbra = 0.8;
    scene.add(crimsonLight);

    // Spotlight 2: Gold Decay Accent Light (Back-Left Rim)
    const goldLight = new THREE.SpotLight(0xc5a059, 6);
    goldLight.position.set(-12, -10, -8);
    goldLight.angle = Math.PI / 3;
    goldLight.penumbra = 0.9;
    scene.add(goldLight);

    // 4. 3D LOGO EMBLEM
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // PointLight 3: Pulsing Core Crimson (Behind Logo)
    const coreLight = new THREE.PointLight(0x900c3f, 4, 20);
    coreLight.position.set(0, 0, -2);
    logoGroup.add(coreLight);

    // Fallback Canvas Texture Generator (Gothic Sigil & Typography)
    function createFallbackTexture() {
        const canvasT = document.createElement('canvas');
        canvasT.width = 1024;
        canvasT.height = 1024;
        const ctxT = canvasT.getContext('2d');

        // Dark Metallic Background Disk
        const gradT = ctxT.createRadialGradient(512, 512, 100, 512, 512, 512);
        gradT.addColorStop(0, '#1a050d');
        gradT.addColorStop(0.7, '#08080a');
        gradT.addColorStop(1, '#000000');
        ctxT.fillStyle = gradT;
        ctxT.fillRect(0, 0, 1024, 1024);

        // Gold & Crimson Rings
        ctxT.strokeStyle = '#c5a059';
        ctxT.lineWidth = 12;
        ctxT.beginPath();
        ctxT.arc(512, 512, 460, 0, Math.PI * 2);
        ctxT.stroke();

        ctxT.strokeStyle = '#900c3f';
        ctxT.lineWidth = 6;
        ctxT.beginPath();
        ctxT.arc(512, 512, 440, 0, Math.PI * 2);
        ctxT.stroke();

        // Pentagram / Occult Sigil
        ctxT.strokeStyle = 'rgba(197, 160, 89, 0.4)';
        ctxT.lineWidth = 4;
        ctxT.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = 512 + 400 * Math.cos(angle);
            const y = 512 + 400 * Math.sin(angle);
            if (i === 0) ctxT.moveTo(x, y);
            else ctxT.lineTo(x, y);
        }
        ctxT.closePath();
        ctxT.stroke();

        // Gothic Logo Text
        ctxT.font = 'bold 110px "Cinzel", "UnifrakturMaguntia", serif';
        ctxT.fillStyle = '#ffffff';
        ctxT.textAlign = 'center';
        ctxT.textBaseline = 'middle';
        ctxT.shadowColor = '#c70039';
        ctxT.shadowBlur = 30;
        ctxT.fillText('AGAUREZ', 512, 512);

        const tex = new THREE.CanvasTexture(canvasT);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return tex;
    }

    // Default Texture for Medallion
    let activeFrontTexture = createFallbackTexture();

    // Back Texture with Serpent SVG
    function createBackTexture() {
        const canvasT = document.createElement('canvas');
        canvasT.width = 1024;
        canvasT.height = 1024;
        const ctxT = canvasT.getContext('2d');

        // Draw background (metallic disc with gold/red rings)
        const gradT = ctxT.createRadialGradient(512, 512, 100, 512, 512, 512);
        gradT.addColorStop(0, '#1a050d');
        gradT.addColorStop(0.7, '#08080a');
        gradT.addColorStop(1, '#000000');
        ctxT.fillStyle = gradT;
        ctxT.fillRect(0, 0, 1024, 1024);

        // Gold & Crimson Rings
        ctxT.strokeStyle = '#c5a059';
        ctxT.lineWidth = 12;
        ctxT.beginPath();
        ctxT.arc(512, 512, 460, 0, Math.PI * 2);
        ctxT.stroke();

        ctxT.strokeStyle = '#900c3f';
        ctxT.lineWidth = 6;
        ctxT.beginPath();
        ctxT.arc(512, 512, 440, 0, Math.PI * 2);
        ctxT.stroke();

        const tex = new THREE.CanvasTexture(canvasT);
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Load the serpent SVG
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = 'assets/arzserpnt.svg';
        img.onload = () => {
            ctxT.save();
            // Invert color from black to white/silver and add glowing red drop shadow
            ctxT.filter = 'invert(0.9) sepia(0.3) saturate(1.8) hue-rotate(320deg) drop-shadow(0 0 15px #c70039)';
            
            // Draw serpent centered and scaled
            const size = 760;
            const offset = (1024 - size) / 2;
            ctxT.drawImage(img, offset, offset, size, size);
            ctxT.restore();
            tex.needsUpdate = true;
            if (typeof backMaterial !== 'undefined') {
                backMaterial.needsUpdate = true;
            }
        };

        return tex;
    }

    let activeBackTexture = createBackTexture();

    // Front & Back Material for 3D Medallion
    const frontMaterial = new THREE.MeshStandardMaterial({
        map: activeFrontTexture,
        transparent: true,
        roughness: 0.35,
        metalness: 0.65,
        side: THREE.FrontSide
    });

    const backMaterial = new THREE.MeshStandardMaterial({
        map: activeBackTexture,
        transparent: true,
        roughness: 0.35,
        metalness: 0.65,
        side: THREE.BackSide
    });

    // Dark Metallic Rim/Edge Material
    const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x111115,
        roughness: 0.2,
        metalness: 0.9
    });

    // 3D Medallion Geometry
    const radius = 3.6;
    const height = 0.25;
    const radialSegments = 64;
    const geometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);
    geometry.rotateX(Math.PI / 2);

    const materials = [edgeMaterial, frontMaterial, backMaterial];
    const logoMesh = new THREE.Mesh(geometry, materials);
    logoGroup.add(logoMesh);

    // 3D Ouroboros Serpent Ring Canvas Texture Generator (Scales, Head Biting Tail & Glowing Eyes)
    function createSerpentScaleTexture() {
        const canvasS = document.createElement('canvas');
        canvasS.width = 1024;
        canvasS.height = 128;
        const ctxS = canvasS.getContext('2d');

        // Dark Bronze Metallic Base
        ctxS.fillStyle = '#0f0b06';
        ctxS.fillRect(0, 0, 1024, 128);

        // Draw Repeating Scales Pattern
        for (let x = 0; x < 1024; x += 16) {
            for (let y = 0; y < 128; y += 16) {
                const shiftY = (x % 32 === 0) ? 0 : 8;
                ctxS.fillStyle = ((x + y) % 32 === 0) ? '#c5a059' : '#8b0000';
                ctxS.beginPath();
                ctxS.arc(x + 8, y + shiftY + 8, 7, 0, Math.PI);
                ctxS.fill();
                ctxS.strokeStyle = '#2b030d';
                ctxS.lineWidth = 1.5;
                ctxS.stroke();
            }
        }

        const texS = new THREE.CanvasTexture(canvasS);
        texS.wrapS = THREE.RepeatWrapping;
        texS.wrapT = THREE.RepeatWrapping;
        texS.repeat.set(16, 1);
        texS.anisotropy = renderer.capabilities.getMaxAnisotropy();
        return texS;
    }

    // 3D Ouroboros Serpent Ring Mesh (Encircling Medallion)
    const ouroborosRadius = radius + 0.22;
    const serpentTubeRadius = 0.14;
    const ouroborosGeo = new THREE.TorusGeometry(ouroborosRadius, serpentTubeRadius, 32, 128);
    const serpentScaleTexture = createSerpentScaleTexture();

    const ouroborosMat = new THREE.MeshStandardMaterial({
        map: serpentScaleTexture,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0x900c3f,
        emissiveIntensity: 0.4
    });
    const ouroborosRing = new THREE.Mesh(ouroborosGeo, ouroborosMat);
    logoGroup.add(ouroborosRing);

    // Glowing Serpent Eyes (Subtle Red Orbs on Head of Ouroboros)
    const eyeGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0033 });
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    eyeLeft.position.set(-0.12, ouroborosRadius + 0.08, 0.12);
    eyeRight.position.set(0.12, ouroborosRadius + 0.08, 0.12);
    logoGroup.add(eyeLeft);
    logoGroup.add(eyeRight);

    // Outer Crimson Aura Ring
    const outerRingGeo = new THREE.TorusGeometry(radius + 0.65, 0.025, 16, 100);
    const outerRingMat = new THREE.MeshStandardMaterial({
        color: 0xc70039,
        emissive: 0xc70039,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.75
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    logoGroup.add(outerRing);

    // Asynchronous Image Load for Front Logo (Using Official 'arz logo fs images.jpg')
    const imgLogo = new Image();
    imgLogo.crossOrigin = "anonymous";
    imgLogo.src = 'assets/arz logo fs images.jpg';
    imgLogo.onload = () => {
        // Render onto circular canvas with Ouroboros Serpent Frame
        const canvasCrop = document.createElement('canvas');
        canvasCrop.width = 1024;
        canvasCrop.height = 1024;
        const ctxCrop = canvasCrop.getContext('2d');

        // Draw circular mask for medallion face
        ctxCrop.beginPath();
        ctxCrop.arc(512, 512, 475, 0, Math.PI * 2);
        ctxCrop.clip();

        // Draw official logo image rotated to align vertically upright
        ctxCrop.save();
        ctxCrop.translate(512, 512);
        ctxCrop.rotate(-Math.PI / 2);
        ctxCrop.drawImage(imgLogo, -512, -512, 1024, 1024);
        ctxCrop.restore();

        // Draw Ouroboros Serpent Ring Frame on Canvas Perimeter
        ctxCrop.shadowColor = '#c70039';
        ctxCrop.shadowBlur = 25;

        // Serpent Body Ring
        ctxCrop.strokeStyle = '#c5a059';
        ctxCrop.lineWidth = 22;
        ctxCrop.beginPath();
        ctxCrop.arc(512, 512, 490, 0, Math.PI * 2);
        ctxCrop.stroke();

        ctxCrop.strokeStyle = '#8b0000';
        ctxCrop.lineWidth = 10;
        ctxCrop.beginPath();
        ctxCrop.arc(512, 512, 490, 0, Math.PI * 2);
        ctxCrop.stroke();

        // Serpent Head Biting Tail at Top (512, 22)
        ctxCrop.shadowColor = '#ff0033';
        ctxCrop.shadowBlur = 30;

        // Head Triangle/Viperean Jaw
        ctxCrop.fillStyle = '#c5a059';
        ctxCrop.beginPath();
        ctxCrop.moveTo(512, 5); // Snout
        ctxCrop.lineTo(485, 45); // Left jaw
        ctxCrop.lineTo(539, 45); // Right jaw
        ctxCrop.closePath();
        ctxCrop.fill();

        // Glowing Crimson Eyes
        ctxCrop.fillStyle = '#ff0033';
        ctxCrop.beginPath();
        ctxCrop.arc(496, 28, 6, 0, Math.PI * 2); // Left eye
        ctxCrop.arc(528, 28, 6, 0, Math.PI * 2); // Right eye
        ctxCrop.fill();

        // Sharp Fangs
        ctxCrop.fillStyle = '#ffffff';
        ctxCrop.beginPath();
        ctxCrop.moveTo(502, 42); ctxCrop.lineTo(498, 54); ctxCrop.lineTo(506, 42);
        ctxCrop.moveTo(522, 42); ctxCrop.lineTo(526, 54); ctxCrop.lineTo(518, 42);
        ctxCrop.fill();

        const loadedTexture = new THREE.CanvasTexture(canvasCrop);
        loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        frontMaterial.map = loadedTexture;
        frontMaterial.needsUpdate = true;
    };

    // 5. 3D EMBER & ASH PARTICLES SYSTEM
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        // Spread particles across 3D space
        particlePositions[i * 3] = (Math.random() - 0.5) * 25;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;

        particleVelocities.push({
            x: (Math.random() - 0.5) * 0.015,
            y: Math.random() * 0.03 + 0.01, // Float upward
            z: (Math.random() - 0.5) * 0.015
        });

        particleScales[i] = Math.random() * 0.12 + 0.03;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Shader / Canvas Material
    const canvasParticle = document.createElement('canvas');
    canvasParticle.width = 32;
    canvasParticle.height = 32;
    const ctxP = canvasParticle.getContext('2d');
    const grad = ctxP.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 120, 50, 1)');
    grad.addColorStop(0.4, 'rgba(200, 20, 0, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctxP.fillStyle = grad;
    ctxP.beginPath();
    ctxP.arc(16, 16, 16, 0, Math.PI * 2);
    ctxP.fill();

    const pTexture = new THREE.CanvasTexture(canvasParticle);
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.35,
        map: pTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. MOUSE & INTERACTIVITY TRACKING
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Mobile Gyroscope / Touch support
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
            mouse.targetY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        }
    });

    // 7. ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse damping (lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // 3D Logo Gentle Float & Mouse Tilt
        logoGroup.rotation.y = elapsedTime * 0.3 + mouse.x * 0.6;
        logoGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.08 - mouse.y * 0.4;
        logoGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.25;

        // Responsive medallion positioning (shift to right on desktop)
        const isDesktop = window.innerWidth >= 768;
        logoGroup.position.x = isDesktop ? 2.6 : 0;

        // Ouroboros Serpent gentle undulation
        if (ouroborosRing) {
            ouroborosRing.rotation.z = Math.sin(elapsedTime * 0.6) * 0.04;
        }

        // Light Pulse Effect
        crimsonLight.intensity = 7 + Math.sin(elapsedTime * 3) * 2;
        coreLight.intensity = 3.5 + Math.cos(elapsedTime * 2) * 1.5;

        // Update Particle Positions (Rising Embers)
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += particleVelocities[i].y; // Move up
            positions[i * 3] += Math.sin(elapsedTime + i) * 0.005; // Slight drift
            positions[i * 3 + 2] += Math.cos(elapsedTime + i) * 0.005;

            // Reset when floating too high
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
                positions[i * 3] = (Math.random() - 0.5) * 25;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
            }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // 8. RESIZE LISTENER
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   E-mail Notification Form Handler
   ========================================================================== */
function initNotificationForm() {
    const form = document.getElementById('notify-form');
    const feedback = document.getElementById('form-feedback');

    if (form && feedback) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('.notify-input');
            if (emailInput && emailInput.value) {
                feedback.style.display = 'block';
                feedback.innerHTML = '⛧ Pacto Registrado. Você receberá o sinal no despertar do abismo.';
                emailInput.value = '';
                
                setTimeout(() => {
                    feedback.style.opacity = '0.7';
                }, 4000);
            }
        });
    }
}

/* ==========================================================================
   Ambient Audio & Streaming Platforms Selector Widget
   ========================================================================== */
function initAudioWidget() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');
    const streamingMenu = document.getElementById('streaming-menu');
    const playerWrap = document.getElementById('ambient-player-wrap');

    if (!audioBtn) return;

    let isPlaying = false;
    let iframeMounted = false;

    audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying = !isPlaying;

        // Toggle streaming platforms menu drawer
        if (streamingMenu) {
            streamingMenu.classList.toggle('active', isPlaying);
        }

        if (isPlaying) {
            audioBtn.classList.add('playing');
            if (audioIcon) audioIcon.className = 'fas fa-volume-high';
            if (audioLabel) audioLabel.textContent = 'Som Ativo ⛧';

            // Dynamically mount Spotify player for Agaurez track
            if (!iframeMounted && playerWrap) {
                playerWrap.innerHTML = `
                    <iframe 
                        style="border-radius:12px; width:100%; height:152px;" 
                        src="https://open.spotify.com/embed/track/2Y1dPCJ2QQqtnuRSwzUhoA?utm_source=generator&theme=0" 
                        frameBorder="0" 
                        allowfullscreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                    </iframe>
                `;
                iframeMounted = true;
            }

            if (playerWrap) {
                playerWrap.classList.add('visible');
            }

        } else {
            audioBtn.classList.remove('playing');
            if (audioIcon) audioIcon.className = 'fas fa-volume-xmark';
            if (audioLabel) audioLabel.textContent = 'Ouvir Agaurez';

            if (playerWrap) {
                playerWrap.classList.remove('visible');
            }
        }
    });

    // Close streaming menu when clicking outside
    document.addEventListener('click', (e) => {
        if (streamingMenu && streamingMenu.classList.contains('active') && !streamingMenu.contains(e.target) && !audioBtn.contains(e.target)) {
            streamingMenu.classList.remove('active');
        }
    });
}

/* ==========================================================================
   Coming Soon Page i18n Language Switcher (PT / EN)
   ========================================================================== */
const comingSoonTranslations = {
    pt: {
        "cs-subtitle": "Belo Horizonte Black Metal",
        "cs-status": "Sob os Ritos do Abismo",
        "cs-headline": "O Despertar do Sigilo",
        "cs-desc": "A nova plataforma oficial da horda está sendo forjada nas profundezas. Em breve, o novo portal com discografia completa, artefatos profanos e agenda de rituais estará acessível.",
        "cs-input": "Seu e-mail para a convocação...",
        "cs-submit": "Convocar",
        "cs-audio": "Ouvir Agaurez",
        "cs-audio-active": "Som Ativo ⛧",
        "cs-stream-title": "Ouça em seu Altar:",
        "cs-preview": "Prévia do Site Oficial ⛧",
        "cs-feedback": "⛧ Pacto Registrado. Você receberá o sinal no despertar do abismo."
    },
    en: {
        "cs-subtitle": "Belo Horizonte Black Metal Horde",
        "cs-status": "Under the Rites of the Abyss",
        "cs-headline": "The Awakening of the Sigil",
        "cs-desc": "The horde's new official platform is being forged in the depths. Coming soon, the new portal with complete discography, profane artifacts, and ritual schedule will be accessible.",
        "cs-input": "Your e-mail for the summoning...",
        "cs-submit": "Summon",
        "cs-audio": "Listen to Agaurez",
        "cs-audio-active": "Sound Active ⛧",
        "cs-stream-title": "Listen on Your Altar:",
        "cs-preview": "Official Site Preview ⛧",
        "cs-feedback": "⛧ Pact Sealed. You shall receive the sign upon the awakening of the abyss."
    }
};

function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    if (!langBtns.length) return;

    // Load saved language preference or default to PT
    let currentLang = localStorage.getItem('agaurez_lang') || 'pt';
    setLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenLang = btn.getAttribute('data-lang');
            if (chosenLang !== currentLang) {
                currentLang = chosenLang;
                localStorage.setItem('agaurez_lang', currentLang);
                setLanguage(currentLang);
                if (window.agaurezAudio) window.agaurezAudio.playClickSound();
            }
        });
    });

    function setLanguage(lang) {
        langBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });

        const dict = comingSoonTranslations[lang] || comingSoonTranslations['pt'];

        // Update text content elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        // Update input placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });
    }
}
