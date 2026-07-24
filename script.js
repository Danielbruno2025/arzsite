/* ==========================================================================
   AGAUREZ - Official Web Design (Black Metal)
   Core Javascript - Interactive Occult Canvas & Dark Visual Behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules
    initNavigation();
    initAtmosphericCanvas();
    initGlitchTextEffects();
    initScrollAnimations();
    initMusicEmbed();
    initBookingRitual();
    initLanguageSelector();
});

/* ==========================================================================
   1. Mobile Navigation & Header Scroll
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Header scroll background transitions
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-skull'; // Spooky skull icon when open
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== mobileToggle) {
            navMenu.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

/* ==========================================================================
   2. Occult & Atmospheric Canvas (Sigil + Particles)
   ========================================================================== */
function initAtmosphericCanvas() {
    const canvas = document.getElementById('canvas-background');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Resize Event
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Track Mouse Coordinates
    let mouse = { x: null, y: null, radius: 120 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Configuration
    const particlesArray = [];
    const numberOfParticles = Math.min(100, Math.floor((width * height) / 15000)); // scale with screen size

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // initial distribution
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 50;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = -(Math.random() * 1.5 + 0.5);
            this.life = Math.random() * 200 + 100;
            this.opacity = Math.random() * 0.5 + 0.1;
            // Occult/Psychedelic glow color palette
            const colorPicker = Math.random();
            if (colorPicker < 0.6) {
                this.color = `rgba(180, 0, 0, ${this.opacity})`; // Blood red
            } else if (colorPicker < 0.9) {
                this.color = `rgba(100, 0, 150, ${this.opacity})`; // Deep Purple
            } else {
                this.color = `rgba(230, 230, 230, ${this.opacity * 0.5})`; // Smoke grey
            }
        }

        draw() {
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;

            // Mouse Push Effect
            if (mouse.x != null && mouse.y != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = dx / distance;
                    let directionY = dy / distance;
                    this.x += directionX * force * 4;
                    this.y += directionY * force * 4;
                }
            }

            // Recycle particles
            if (this.y < -10 || this.life <= 0) {
                this.reset();
            }
        }
    }

    // Initialize Particles
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Sigil Rotation Parameters
    let sigilAngle = 0;

    // Draw the Sigil of Agaurez
    function drawSigil(x, y, radius) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(sigilAngle);

        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(230, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(100, 0, 0, 0.35)';
        ctx.lineWidth = 2.5;

        // 1. Concentric circles
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(150, 0, 196, 0.25)';
        ctx.beginPath();
        ctx.arc(0, 0, radius - 15, 0, Math.PI * 2);
        ctx.stroke();

        // 2. Draw a pentagram
        ctx.strokeStyle = 'rgba(180, 0, 0, 0.45)';
        ctx.beginPath();
        const points = 5;
        const vertices = [];
        for (let i = 0; i < points; i++) {
            // Uninverted or inverted pentagram? Inverted is mandatory for Black Metal.
            // Vertices calculations (inverted, one point straight down)
            const angle = (i * 2 * Math.PI) / points + Math.PI / 2; 
            const px = Math.cos(angle) * (radius - 15);
            const py = Math.sin(angle) * (radius - 15);
            vertices.push({ x: px, y: py });
        }

        // Draw star lines: 0 -> 2 -> 4 -> 1 -> 3 -> 0
        ctx.moveTo(vertices[0].x, vertices[0].y);
        ctx.lineTo(vertices[2].x, vertices[2].y);
        ctx.lineTo(vertices[4].x, vertices[4].y);
        ctx.lineTo(vertices[1].x, vertices[1].y);
        ctx.lineTo(vertices[3].x, vertices[3].y);
        ctx.closePath();
        ctx.stroke();

        // 3. Central occult cross or symbol
        ctx.strokeStyle = 'rgba(191, 163, 122, 0.35)'; // decay gold
        ctx.beginPath();
        // Leviathan cross or simple details
        ctx.moveTo(-15, 0);
        ctx.lineTo(15, 0);
        ctx.moveTo(0, -35);
        ctx.lineTo(0, 25);
        // Crossbars
        ctx.moveTo(-10, -20);
        ctx.lineTo(10, -20);
        ctx.moveTo(-10, -5);
        ctx.lineTo(10, -5);
        // Loop at bottom (infinity sign)
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-8, 25, 8, 0, Math.PI * 2);
        ctx.arc(8, 25, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }

    // Animation Loop
    function animate() {
        // Clear canvas with very subtle feedback trail (adds to psychedelic vibe)
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(2, 2, 2, 0.08)';
        ctx.fillRect(0, 0, width, height);

        // Update & Draw Particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        // Draw Rotating Sigil in the center of the hero section
        const sigilSize = Math.min(width * 0.28, 280);
        sigilAngle += 0.0008; // slow rotate
        
        // Centered on screen
        drawSigil(width / 2, height / 2, sigilSize);

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   3. Glitch Text Effects for avant-garde aesthetics
   ========================================================================== */
function initGlitchTextEffects() {
    const glitchTargets = document.querySelectorAll('.hero-title, .section-title');
    const glyphs = '⛧☠✦☽⚔✝𓄿𓋹𓆣𓆗𓀾𓁺𓋴𓍎𓆙𓉔☠🕇💀⛧';

    glitchTargets.forEach(element => {
        const originalText = element.innerText;
        let isGlitching = false;

        element.addEventListener('mouseover', () => {
            if (isGlitching) return;
            isGlitching = true;
            let iterations = 0;
            const interval = setInterval(() => {
                element.innerText = originalText.split('')
                    .map((char, index) => {
                        if (char === ' ' || char === '⛧') return char;
                        if (index < iterations) return originalText[index];
                        // 15% chance to output a demonic glyph
                        return Math.random() < 0.22 ? glyphs[Math.floor(Math.random() * glyphs.length)] : char;
                    })
                    .join('');

                iterations += 1;
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.innerText = originalText;
                    isGlitching = false;
                }
            }, 60);
        });
    });
}

/* ==========================================================================
   4. Scroll Reveal Animations & Parallax
   ========================================================================== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    // Intersection Observer for section reveal
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Simple Parallax Effect for visual depth
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxBg = document.querySelector('.hero-content');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            parallaxBg.style.opacity = `${1 - (scrollPosition / 700)}`;
        }
    });
}

/* ==========================================================================
   5. Dynamic Embed Music Player
   ========================================================================== */
function initMusicEmbed() {
    const placeholder = document.getElementById('player-placeholder');
    const container = document.getElementById('spotify-player-container');

    if (placeholder && container) {
        placeholder.addEventListener('click', () => {
            // Fade out the placeholder
            placeholder.style.opacity = '0';
            placeholder.style.pointerEvents = 'none';

            setTimeout(() => {
                placeholder.style.display = 'none';
                
                // Spotify Embed Player for Agaurez track
                const iframe = document.createElement('iframe');
                iframe.src = "https://open.spotify.com/embed/track/2Y1dPCJ2QQqtnuRSwzUhoA?utm_source=generator&theme=0";
                iframe.width = "100%";
                iframe.height = "352px";
                iframe.frameBorder = "0";
                iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
                iframe.loading = "lazy";
                iframe.style.border = "none";
                iframe.style.opacity = "0";
                iframe.style.transition = "opacity 0.6s ease";

                container.appendChild(iframe);
                
                // Fade in frame
                setTimeout(() => {
                    iframe.style.opacity = "1";
                }, 50);
            }, 300);
        });
    }
}

/* ==========================================================================
   6. Custom Booking Ritual (Form submission handler)
   ========================================================================== */
function initBookingRitual() {
    const form = document.getElementById('ritual-booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btnSubmit = form.querySelector('.btn-submit');
        const originalText = btnSubmit.innerText;

        const langSelect = document.getElementById('lang-select');
        const lang = langSelect ? langSelect.value : 'pt';
        
        let summoningText = 'CONVOCANDO HORDA...';
        let establishedText = 'PACTO ESTABELECIDO ⛧';
        let modalTitle = 'PACTO SELADO';
        let modalBody = 'Sua convocatória ecoou pelo abismo. A horda do Agaurez responderá através das sombras em breve.';
        let closeBtnText = 'FECHAR PORTAL';
        
        if (lang === 'en') {
            summoningText = 'SUMMONING HORDE...';
            establishedText = 'COVENANT ESTABLISHED ⛧';
            modalTitle = 'COVENANT SEALED';
            modalBody = 'Your summons echoed through the abyss. The Agaurez horde will respond through the shadows soon.';
            closeBtnText = 'CLOSE PORTAL';
        } else if (lang === 'fr') {
            summoningText = 'CONVOCATION DE LA HORDE...';
            establishedText = 'PACTE ÉTABLI ⛧';
            modalTitle = 'PACTE SCELLÉ';
            modalBody = 'Votre convocation a résonné dans l\'abîme. La horde d\'Agaurez répondra bientôt à travers les ombres.';
            closeBtnText = 'FERMER LE PORTAIL';
        } else if (lang === 'de') {
            summoningText = 'HORDE BESCHWÖREN...';
            establishedText = 'PAKT GESCHLOSSEN ⛧';
            modalTitle = 'VERSIEGELTER PAKT';
            modalBody = 'Ihre Beschwörung hallte durch den Abgrund. Die Agaurez-Horde wird bald durch die Schatten antworten.';
            closeBtnText = 'PORTAL SCHLIESSEN';
        } else if (lang === 'ja') {
            summoningText = '群れを召喚中...';
            establishedText = '盟約締結 ⛧';
            modalTitle = '封印された盟約';
            modalBody = 'あなたの召喚は深淵に響き渡りました。アガウレス pillars 影から答えるでしょう。';
            closeBtnText = 'ポータルを閉じる';
        } else if (lang === 'es') {
            summoningText = 'CONVOCANDO HORDA...';
            establishedText = 'PACTO ESTABLECIDO ⛧';
            modalTitle = 'PACTO SELLADO';
            modalBody = 'Su convocatoria resonó en el abismo. La horda de Agaurez responderá a través de las sombras pronto.';
            closeBtnText = 'CERRAR PORTAL';
        } else if (lang === 'it') {
            summoningText = 'CONVOCAZIONE DELL\'ORDA...';
            establishedText = 'PATTO STABILITO ⛧';
            modalTitle = 'PATTO SIGILLATO';
            modalBody = 'La tua convocazione ha echeggiato nell\'abisso. L\'orda di Agaurez risponderà presto attraverso le ombre.';
            closeBtnText = 'CHIUDI PORTALE';
        } else if (lang === 'zh') {
            summoningText = '正在召唤军团...';
            establishedText = '盟约已缔结 ⛧';
            modalTitle = '盟约已封印';
            modalBody = '您的召唤在深渊中回荡。Agaurez 军团很快将通过阴影回应您。';
            closeBtnText = '关闭传送门';
        }

        // Custom demonic ritual submit states
        btnSubmit.disabled = true;
        btnSubmit.innerText = summoningText;
        btnSubmit.style.background = 'var(--color-psy-purple)';
        btnSubmit.style.boxShadow = 'var(--glow-psy)';

        setTimeout(() => {
            btnSubmit.innerText = establishedText;
            btnSubmit.style.background = 'var(--color-blood-bright)';
            btnSubmit.style.boxShadow = 'var(--glow-blood)';
            
            // Render sigil success popup
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(2, 2, 2, 0.95)';
            modal.style.zIndex = '1000';
            modal.style.display = 'flex';
            modal.style.flexDirection = 'column';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.color = 'var(--color-blood-bright)';
            modal.style.fontFamily = 'var(--font-display)';
            modal.style.textAlign = 'center';
            modal.style.padding = '30px';

            modal.innerHTML = `
                <div style="font-size: 5rem; margin-bottom: 20px; animation: spin-sigil 4s linear infinite;">⛧</div>
                <h2 style="font-family: var(--font-metal); font-size: 3rem; margin-bottom: 15px; letter-spacing: 2px;">${modalTitle}</h2>
                <p style="font-size: 1.1rem; color: var(--color-text-light); max-width: 500px; margin-bottom: 30px; letter-spacing: 1px;">
                    ${modalBody}
                </p>
                <button id="close-portal" style="
                    background: transparent; 
                    border: 1px solid var(--color-blood-bright); 
                    color: var(--color-text-light); 
                    padding: 10px 30px; 
                    font-family: var(--font-metal); 
                    font-size: 1.2rem; 
                    cursor: pointer; 
                    letter-spacing: 2px;">
                    ${closeBtnText}
                </button>
            `;

            // Append keyframe programmatically if not defined
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes spin-sigil {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(modal);

            // Clear inputs
            form.reset();

            // Close logic
            document.getElementById('close-portal').addEventListener('click', () => {
                modal.remove();
                btnSubmit.disabled = false;
                btnSubmit.innerText = originalText;
                btnSubmit.style.background = 'var(--color-blood-medium)';
                btnSubmit.style.boxShadow = 'none';
            });

        }, 2200);
    });
}

/* ==========================================================================
   7. Multilingual i18n Translation Engine
   ========================================================================== */
function initLanguageSelector() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;

    const translations = {
        pt: {
            "nav-home": "Início",
            "nav-about": "A Horda",
            "nav-music": "Discografia",
            "nav-videos": "Vídeos",
            "nav-tour": "Rituais",
            "nav-merch": "Merchandising",
            "nav-contact": "Convocação",
            "hero-subtitle": "Belo Horizonte Black Metal Horda",
            "hero-cta": "Ouça \"The Five Sigils\"",
            "hero-scroll": "Descer ao Abismo",
            "about-title": "A Horda",
            "about-subtitle": "A Origem e o Retorno",
            "about-p1": "Formada em Belo Horizonte, Minas Gerais, em <strong>1998</strong> (inicialmente sob a alcunha de <em>Agaures</em>), a banda consolidou seu espaço na cena underground nacional ao moldar um som extremamente denso e aggressive, com profundas raízes no <strong>Black Metal clássico</strong>, fundido a influências brutais de <strong>Death</strong> e <strong>Thrash Metal</strong>.",
            "about-p2": "Após um hiato que silenciou os altares profanos temporariamente, a horda retornou com força total na última década, canalizando ritos ancestrais e manifestos líricos obscuros para dar continuidade ao seu legado de heresia sonora e musicalidade caótica.",
            "about-p3": "As composições transitam por atmosferas densas e andamentos devastadores, mantendo viva a chama de Belo Horizonte como um dos maiores berços do Metal Extremo mundial.",
            "about-lineup": "Formação Atual",
            "role-vocals": "Vocal",
            "role-guitar": "Guitarra",
            "role-bass": "Baixo",
            "role-drums": "Bateria",
            "music-title": "Heresias",
            "music-subtitle": "Obras de Escuridão",
            "music-released": "Lançado por ",
            "music-player": "DESPERTAR PLAYER DIGITAL (SPOTIFY)",
            "videos-title": "Manifestações",
            "videos-subtitle": "Projeções de Escuridão e Caos",
            "tour-title": "Rituais",
            "tour-subtitle": "Concertos e Liturgias Agendadas",
            "tour-lineup": "Lineup: Ao lado de <strong>Sekeromlat</strong>, <strong>Morkt</strong> e <strong>Vazio</strong>",
            "tour-ticket": "Ingressos",
            "tour-widget-title": "Widget de Shows Oficial (Bandsintown / Songkick)",
            "tour-widget-desc": "Seção preparada para script de sincronização de agenda digital.",
            "gallery-title": "Galeria & Altar",
            "gallery-subtitle": "Registros Macabros e Relíquias",
            "gallery-item-1-title": "A Horda Oculta",
            "gallery-item-1-cat": "Retrato",
            "gallery-item-2-cat": "Arte Conceitual",
            "gallery-item-3-title": "O Culto do Sigilo",
            "gallery-item-3-cat": "Símbolo",
            "merch-title": "Artefatos Profanos",
            "merch-item-1-title": "Camisa 'The Five Sigils'",
            "merch-item-1-type": "Vestuário / Camisa Oficial",
            "merch-item-1-stock": "Últimas unidades",
            "merch-item-2-type": "Música / Disco de Vinil Splatter",
            "merch-item-2-stock": "Edição Limitada",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Música / CD Acrílico Jewelcase",
            "merch-item-3-stock": "Em estoque (Cogumelo Records)",
            "merch-buy": "Comprar",
            "contact-title": "Convocação",
            "contact-subtitle": "Assessoria de Imprensa, Shows e Booking",
            "contact-headline": "Ritual de Convocação",
            "contact-intro": "Use o canal direto para bookings oficiais, press releases, interviews, e agenciamento. Nossos ritos respondem rápido sob as diretrizes do abismo.",
            "contact-detail-loc": "Belo Horizonte, MG - Brasil",
            "form-label-name": "Identificação / Pseudônimo",
            "form-label-email": "Canal de Retorno (E-mail)",
            "form-label-subject": "Objetivo do Pacto",
            "form-label-message": "Mensagem / Convocação",
            "form-placeholder-name": "Seu nome ou organização",
            "form-placeholder-subject": "Booking / Imprensa / Contato",
            "form-placeholder-message": "Descreva os termos do convite ou booking...",
            "form-submit": "Enviar Pacto ⛧"
        },
        zh: {
            "nav-home": "首页",
            "nav-about": "乐团",
            "nav-music": "作品发行",
            "nav-videos": "视听",
            "nav-tour": "仪式之夜",
            "nav-merch": "官方周边",
            "nav-contact": "召唤仪式",
            "hero-subtitle": "贝洛奥里藏特黑金属军团",
            "hero-cta": "聆听《The Five Sigils》",
            "hero-scroll": "坠入深渊",
            "about-title": "军团",
            "about-subtitle": "起源与回归",
            "about-p1": "乐团于<strong>1998</strong>年成立于巴西米纳斯吉拉斯州的贝洛奥里藏特（最初名为 <em>Agaures</em>）。他们通过塑造极其厚重和侵略性的声音，在国家地下场景中确立了自己的地位。其音乐深度扎根于<strong>经典黑金属</strong>，并融合了<strong>死亡金属</strong>和<strong>鞭击金属</strong>的残暴影响。",
            "about-p2": "在一场暂时让世俗祭坛归于沉寂的休整之后，军团在过去十年中全力回归，通过引导古老的仪式和黑暗的歌词宣言，继续他们音响异端和混沌音乐的传承。",
            "about-p3": "这些作品在密集的氛围和毁灭性的节奏之间切换，让贝洛奥里藏特作为世界上最伟大的极端金属摇篮之一的火焰持续燃烧。",
            "about-lineup": "当前阵容",
            "role-vocals": "主唱",
            "role-guitar": "吉他",
            "role-bass": "贝斯",
            "role-drums": "鼓手",
            "music-title": "异端",
            "music-subtitle": "黑暗之作",
            "music-released": "发行厂牌：",
            "music-player": "唤醒数字播放器 (SPOTIFY)",
            "videos-title": "投影",
            "videos-subtitle": "混沌的视听宣言",
            "tour-title": "仪式之夜",
            "tour-subtitle": "巡演与计划典礼",
            "tour-lineup": "阵容：与 <strong>Sekeromlat</strong>、<strong>Morkt</strong> 和 <strong>Vazio</strong> 同台",
            "tour-ticket": "购票方式",
            "tour-widget-title": "官方巡演日程插件 (Bandsintown / Songkick)",
            "tour-widget-desc": "已准备好用于数字日程同步脚本的区块。",
            "gallery-title": "画廊与祭坛",
            "gallery-subtitle": "死亡记录与遗物",
            "gallery-item-1-title": "神秘军团",
            "gallery-item-1-cat": "肖像",
            "gallery-item-2-cat": "概念艺术",
            "gallery-item-3-title": "印章崇拜",
            "gallery-item-3-cat": "象征物",
            "merch-title": "世俗圣物",
            "merch-item-1-title": "官方《The Five Sigils》T恤",
            "merch-item-1-type": "服饰 / 官方T恤",
            "merch-item-1-stock": "仅剩最后几件",
            "merch-item-2-type": "音乐 / 泼溅彩胶黑胶唱片",
            "merch-item-2-stock": "限量版",
            "merch-item-3-title": "CD《The Five Sigils》",
            "merch-item-3-type": "音乐 / 胶盒装CD唱片",
            "merch-item-3-stock": "现货销售 (Cogumelo Records)",
            "merch-buy": "购买",
            "contact-title": "召唤仪式",
            "contact-subtitle": "媒体联络、演出及预订",
            "contact-headline": "召唤仪式",
            "contact-intro": "请通过直接通道进行官方预订、媒体发布、采访 and 经纪业务联络。我们的仪式将在深渊法则指导下迅速回应。",
            "contact-detail-loc": "巴西贝洛奥里藏特",
            "form-label-name": "身份 / 匿名",
            "form-label-email": "联系通道 (E-mail)",
            "form-label-subject": "盟约目的",
            "form-label-message": "留言 / 召唤信",
            "form-placeholder-name": "您的名字或组织名称",
            "form-placeholder-subject": "演出预订 / 媒体合作 / 联系",
            "form-placeholder-message": "请详述演出邀请或预订条款...",
            "form-submit": "提交盟约 ⛧"
        },
        en: {
            "nav-home": "Home",
            "nav-about": "The Horde",
            "nav-music": "Discography",
            "nav-videos": "Videos",
            "nav-tour": "Rituals",
            "nav-merch": "Merch",
            "nav-contact": "Summoning",
            "hero-subtitle": "Belo Horizonte Black Metal Horde",
            "hero-cta": "Listen to \"The Five Sigils\"",
            "hero-scroll": "Descend to the Abyss",
            "about-title": "The Horde",
            "about-subtitle": "The Origin and The Return",
            "about-p1": "Formed in Belo Horizonte, Minas Gerais, in <strong>1998</strong> (initially under the moniker of <em>Agaures</em>), the band consolidated its space in the national underground scene by shaping an extremely dense and aggressive sound, with deep roots in <strong>classic Black Metal</strong>, fused with brutal influences of <strong>Death</strong> and <strong>Thrash Metal</strong>.",
            "about-p2": "After a hiatus that temporarily silenced the profane altars, the horde returned with full strength in the last decade, channeling ancestral rites and dark lyrical manifestos to continue their legacy of sonic heresy and chaotic musicality.",
            "about-p3": "The compositions transition through dense atmospheres and devastating tempos, keeping alive the flame of Belo Horizonte as one of the greatest cradles of Extreme Metal in the world.",
            "about-lineup": "Current Lineup",
            "role-vocals": "Vocals",
            "role-guitar": "Guitar",
            "role-bass": "Bass",
            "role-drums": "Drums",
            "music-title": "Heresies",
            "music-subtitle": "Works of Darkness",
            "music-released": "Released by ",
            "music-player": "AWAKEN DIGITAL PLAYER (SPOTIFY)",
            "videos-title": "Projections",
            "videos-subtitle": "Audiovisual Manifestations of Chaos",
            "tour-title": "Rituals",
            "tour-subtitle": "Concerts and Scheduled Liturgies",
            "tour-lineup": "Lineup: Alongside <strong>Sekeromlat</strong>, <strong>Morkt</strong> and <strong>Vazio</strong>",
            "tour-ticket": "Tickets",
            "tour-widget-title": "Official Show Widget (Bandsintown / Songkick)",
            "tour-widget-desc": "Section prepared for digital tour agenda synchronization script.",
            "gallery-title": "Gallery & Altar",
            "gallery-subtitle": "Macabre Records and Relics",
            "gallery-item-1-title": "The Occult Horde",
            "gallery-item-1-cat": "Portrait",
            "gallery-item-2-cat": "Conceptual Art",
            "gallery-item-3-title": "The Cult of the Sigil",
            "gallery-item-3-cat": "Symbol",
            "merch-title": "Profane Artifacts",
            "merch-item-1-title": "Official 'The Five Sigils' T-Shirt",
            "merch-item-1-type": "Apparel / Official T-Shirt",
            "merch-item-1-stock": "Last units",
            "merch-item-2-type": "Music / Splatter Vinyl Record",
            "merch-item-2-stock": "Limited Edition",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Music / CD Jewelcase",
            "merch-item-3-stock": "In stock (Cogumelo Records)",
            "merch-buy": "Buy",
            "contact-title": "Summoning",
            "contact-subtitle": "Press Relations, Concerts and Booking",
            "contact-headline": "Summoning Ritual",
            "contact-intro": "Use the direct channel for official bookings, press releases, interviews, and management. Our rites respond quickly under the guidelines of the abyss.",
            "contact-detail-loc": "Belo Horizonte, MG - Brazil",
            "form-label-name": "Identification / Pseudonym",
            "form-label-email": "Return Channel (E-mail)",
            "form-label-subject": "Covenant Objective",
            "form-label-message": "Message / Summoning",
            "form-placeholder-name": "Your name or organization",
            "form-placeholder-subject": "Booking / Press / Contact",
            "form-placeholder-message": "Describe the terms of the invitation or booking...",
            "form-submit": "Send Covenant ⛧"
        },
        fr: {
            "nav-home": "Accueil",
            "nav-about": "La Horde",
            "nav-music": "Discographie",
            "nav-videos": "Vidéos",
            "nav-tour": "Rituels",
            "nav-merch": "Merch",
            "nav-contact": "Convocation",
            "hero-subtitle": "Horde Black Metal de Belo Horizonte",
            "hero-cta": "Écoutez \"The Five Sigils\"",
            "hero-scroll": "Descendre dans l'abîme",
            "about-title": "La Horde",
            "about-subtitle": "L'Origine et le Retour",
            "about-p1": "Formé à Belo Horizonte, Minas Gerais, en <strong>1998</strong> (initialement sous le nom d'<em>Agaures</em>), le groupe a consolidé sa place dans la scène underground nationale en façonnant un son extrêmement dense et agressif, profondément ancré dans le <strong>Black Metal classique</strong>, fusionné avec des influences brutales de <strong>Death</strong> et <strong>Thrash Metal</strong>.",
            "about-p2": "Après un hiatus qui a temporairement réduit au silence les autels profanes, la horde est revenue en force au cours de la dernière décennie, canalisant des rites ancestraux et de sombres manifestes lyriques pour poursuivre son héritage d'hérésie sonore et de musicalité chaotique.",
            "about-p3": "Les compositions oscillent entre atmosphères denses et tempos dévastateurs, maintenant vivante la flamme de Belo Horizonte comme l'un des plus grands berceaux du Metal Extremes au monde.",
            "about-lineup": "Line-up Actuel",
            "role-vocals": "Chant",
            "role-guitar": "Guitare",
            "role-bass": "Basse",
            "role-drums": "Batterie",
            "music-title": "Hérésies",
            "music-subtitle": "Œuvres des Ténèbres",
            "music-released": "Publié por ",
            "music-player": "RÉVEILLER LE LECTEUR NUMÉRIQUE (SPOTIFY)",
            "videos-title": "Projections",
            "videos-subtitle": "Manifestations audiovisuelles du chaos",
            "tour-title": "Rituels",
            "tour-subtitle": "Concerts et Liturgies Planifiés",
            "tour-lineup": "Lineup: Aux côtés de <strong>Sekeromlat</strong>, <strong>Morkt</strong> et <strong>Vazio</strong>",
            "tour-ticket": "Billets",
            "tour-widget-title": "Widget de Concerts Officiel (Bandsintown / Songkick)",
            "tour-widget-desc": "Section préparée pour le script de synchronisation d'agenda numérique.",
            "gallery-title": "Galerie & Autel",
            "gallery-subtitle": "Registres Macabres et Reliques",
            "gallery-item-1-title": "La Horde Occulte",
            "gallery-item-1-cat": "Portrait",
            "gallery-item-2-cat": "Art Conceptuel",
            "gallery-item-3-title": "Le Culte du Sceau",
            "gallery-item-3-cat": "Symbole",
            "merch-title": "Artefacts Profanes",
            "merch-item-1-title": "T-Shirt Officiel 'The Five Sigils'",
            "merch-item-1-type": "Vêtements / T-Shirt Officiel",
            "merch-item-1-stock": "Dernières unités",
            "merch-item-2-type": "Musique / Disque Vinyle Splatter",
            "merch-item-2-stock": "Édition Limitée",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Musique / Boîtier CD",
            "merch-item-3-stock": "En stock (Cogumelo Records)",
            "merch-buy": "Acheter",
            "contact-title": "Convocation",
            "contact-subtitle": "Relations Presse, Concerts et Booking",
            "contact-headline": "Rituel de Convocation",
            "contact-intro": "Utilisez le canal direct pour les bookings officiels, communiqués de presse, interviews et management. Nos rituels répondent rapidement selon les préceptes de l'abîme.",
            "contact-detail-loc": "Belo Horizonte, MG - Brésil",
            "form-label-name": "Identification / Pseudonyme",
            "form-label-email": "Canal de Retour (E-mail)",
            "form-label-subject": "Objectif du Pacte",
            "form-label-message": "Message / Convocation",
            "form-placeholder-name": "Votre nom ou organisation",
            "form-placeholder-subject": "Booking / Presse / Contact",
            "form-placeholder-message": "Décrivez les termes de l'invitation ou du booking...",
            "form-submit": "Envoyer Pacte ⛧"
        },
        de: {
            "nav-home": "Start",
            "nav-about": "Die Horde",
            "nav-music": "Diskografie",
            "nav-videos": "Videos",
            "nav-tour": "Rituale",
            "nav-merch": "Merch",
            "nav-contact": "Beschwörung",
            "hero-subtitle": "Belo Horizonte Black Metal Horde",
            "hero-cta": "Hören Sie \"The Five Sigils\"",
            "hero-scroll": "In den Abgrund hinabsteigen",
            "about-title": "Die Horde",
            "about-subtitle": "Der Ursprung und die Rückkehr",
            "about-p1": "Die <strong>1998</strong> in Belo Horizonte, Minas Gerais (anfänglich unter dem Namen <em>Agaures</em>) gegründete Band festigte ihren Platz in der nationalen Underground-Szene, indem sie einen extrem dichten und aggressiven Sound formte, der tief im <strong>klassischen Black Metal</strong> verwurzelt und mit brutalen Einflüssen aus <strong>Death</strong> und <strong>Thrash Metal</strong> verschmolzen ist.",
            "about-p2": "Nach einer Pause, die die profanen Altäre vorübergehend verstummen ließ, kehrte die Horde im letzten Jahrzehnt mit voller Stärke zurück. Sie kanalisierte überlieferte Riten und dunkle lyrische Manifeste, um ihr Erbe der klanglichen Häresie und chaotischen Musikalität fortzusetzen.",
            "about-p3": "Die Kompositionen bewegen sich durch dichte Atmosphären und verheerende Tempi und halten die Flamme von Belo Horizonte als eine der größten Wiegen des Extreme Metal weltweit am Leben.",
            "about-lineup": "Aktuelles Line-up",
            "role-vocals": "Gesang",
            "role-guitar": "Gitarre",
            "role-bass": "Bass",
            "role-drums": "Schlagzeug",
            "music-title": "Häresien",
            "music-subtitle": "Werke der Finsternis",
            "music-released": "Veröffentlicht von ",
            "music-player": "DIGITALEN PLAYER WECKEN (SPOTIFY)",
            "videos-title": "Projektionen",
            "videos-subtitle": "Audiovisuelle Manifestationen des Chaos",
            "tour-title": "Rituale",
            "tour-subtitle": "Konzerte und geplante Liturgien",
            "tour-lineup": "Lineup: Neben <strong>Sekeromlat</strong>, <strong>Morkt</strong> und <strong>Vazio</strong>",
            "tour-ticket": "Tickets",
            "tour-widget-title": "Offizielles Konzert-Widget (Bandsintown / Songkick)",
            "tour-widget-desc": "Abschnitt vorbereitet für digitale Tourplan-Synchronisierung.",
            "gallery-title": "Galerie & Altar",
            "gallery-subtitle": "Makabre Aufzeichnungen und Reliquien",
            "gallery-item-1-title": "Die okkulte Horde",
            "gallery-item-1-cat": "Porträt",
            "gallery-item-2-cat": "Konzeptkunst",
            "gallery-item-3-title": "Der Kult des Sigils",
            "gallery-item-3-cat": "Symbol",
            "merch-title": "Profane Artefakte",
            "merch-item-1-title": "Offizielles 'The Five Sigils' T-Shirt",
            "merch-item-1-type": "Bekleidung / Offizielles T-Shirt",
            "merch-item-1-stock": "Letzte Einheiten",
            "merch-item-2-type": "Musik / Splatter Vinyl Schallplatte",
            "merch-item-2-stock": "Limitierte Auflage",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Musik / CD Jewelcase",
            "merch-item-3-stock": "Auf Lager (Cogumelo Records)",
            "merch-buy": "Kaufen",
            "contact-title": "Beschwörung",
            "contact-subtitle": "Pressearbeit, Konzerte und Booking",
            "contact-headline": "Beschwörungsritual",
            "contact-intro": "Nutzen Sie den direkten Kanal für offizielle Buchungen, Pressemitteilungen, Interviews und Management. Unsere Riten antworten schnell nach den Gesetzen des Abgrunds.",
            "contact-detail-loc": "Belo Horizonte, MG - Brasilien",
            "form-label-name": "Identifikation / Pseudonym",
            "form-label-email": "Rückkanal (E-Mail)",
            "form-label-subject": "Ziel des Paktes",
            "form-label-message": "Botschaft / Beschwörung",
            "form-placeholder-name": "Ihr Name oder Organisation",
            "form-placeholder-subject": "Booking / Presse / Kontakt",
            "form-placeholder-message": "Beschreiben Sie die Bedingungen der Einladung...",
            "form-submit": "Pakt senden ⛧"
        },
        ja: {
            "nav-home": "ホーム",
            "nav-about": "群れ",
            "nav-music": "ディスコグラフィー",
            "nav-videos": "動画",
            "nav-tour": "儀式",
            "nav-merch": "関連商品",
            "nav-contact": "召喚",
            "hero-subtitle": "ベロオリゾンテ・ブラックメタル・ハーフ",
            "hero-cta": "「The Five Sigils」を聴く",
            "hero-scroll": "深淵へ下る",
            "about-title": "悪魔 of 悪",
            "about-subtitle": "起源と帰還",
            "about-p1": "<strong>1998年</strong>にミナスジェライス州ベロオリゾンテで結成（当初は<em>Agaures</em>名義）。クラシックな<strong>ブラックメタル</strong>に深く根ざし、デスメタルやスラッシュメタルの残虐な影響を融合させた極めて重厚かつアグレッシブなサウンドを構築することで、国内のアンダーグラウンドシーンにおける地位を確固たるものにしました。",
            "about-p2": "不敬なる祭壇を一時的に沈黙させた活動休止期間を経て、ここ10年で群れは全力で復活を遂げ、先祖代々の儀式と暗黒の抒情詩的マニフェストをチャネルし、音響的異端と混沌とした音楽性の遺産を継承し続けています。",
            "about-p3": "重苦しい雰囲気と破壊的なテンポを行き来する楽曲群は、世界で最も偉大なエクストリームメタルの発祥地の一つとしてのベロオリゾンテの炎を絶やすことなく燃やし続けています。",
            "about-lineup": "現在のメンバー",
            "role-vocals": "ボーカル",
            "role-guitar": "ギター",
            "role-bass": "ベース",
            "role-drums": "ドラム",
            "music-title": "異端",
            "music-subtitle": "闇の業",
            "music-released": "リリース元：",
            "music-player": "デジタルプレイヤー起動 (SPOTIFY)",
            "videos-title": "映像",
            "videos-subtitle": "混沌の視聴覚マニフェスト",
            "tour-title": "儀式",
            "tour-subtitle": "ライブと予定された典礼",
            "tour-lineup": "対バン：<strong>Sekeromlat</strong>, <strong>Morkt</strong>, <strong>Vazio</strong>",
            "tour-ticket": "チケット",
            "tour-widget-title": "公式スケジュール・ウィジェット (Bandsintown / Songkick)",
            "tour-widget-desc": "デジタルツアースケジュール同期用のブロック。",
            "gallery-title": "ギャラリーと祭壇",
            "gallery-subtitle": "マカブルな記録と遺物",
            "gallery-item-1-title": "オカルトの群れ",
            "gallery-item-1-cat": "肖像",
            "gallery-item-2-cat": "コンセプトアート",
            "gallery-item-3-title": "印章の崇拝",
            "gallery-item-3-cat": "象徴",
            "merch-title": "不敬なる遺物",
            "merch-item-1-title": "公式 'The Five Sigils' Tシャツ",
            "merch-item-1-type": "衣類 / 公式Tシャツ",
            "merch-item-1-stock": "残りわずか",
            "merch-item-2-type": "音楽 / スプラッター・バイナル盤",
            "merch-item-2-stock": "限定版",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "音楽 / CDジュエルケース",
            "merch-item-3-stock": "在庫あり (Cogumelo Records)",
            "merch-buy": "購入",
            "contact-title": "召喚",
            "contact-subtitle": "広報・ライブ・ブッキング",
            "contact-headline": "召喚の儀式",
            "contact-intro": "公式ブッキング、プレスリリース、インタビュー等の直接のご連絡はこちらへ。我々の儀式は深淵の導きに従い、迅速に対応します。",
            "contact-detail-loc": "ブラジル・ベロオリゾンテ",
            "form-label-name": "氏名 / 偽名",
            "form-label-email": "返信用メールアドレス",
            "form-label-subject": "盟約の目的",
            "form-label-message": "メッセージ / 召喚",
            "form-placeholder-name": "お名前または組織名",
            "form-placeholder-subject": "ブッキング / プレス / その他",
            "form-placeholder-message": "招待またはブッキングの条件をご記入ください...",
            "form-submit": "盟約を送信 ⛧"
        },
        es: {
            "nav-home": "Inicio",
            "nav-about": "La Horda",
            "nav-music": "Discografía",
            "nav-videos": "Vídeos",
            "nav-tour": "Rituales",
            "nav-merch": "Mercancía",
            "nav-contact": "Convocatoria",
            "hero-subtitle": "Horda de Black Metal de Belo Horizonte",
            "hero-cta": "Escucha \"The Five Sigils\"",
            "hero-scroll": "Descender al abismo",
            "about-title": "La Horda",
            "about-subtitle": "El Origen y el Retorno",
            "about-p1": "Formada en Belo Horizonte, Minas Gerais, en <strong>1998</strong> (inicialmente bajo el nombre de <em>Agaures</em>), la banda consolidó su espacio en la escena underground nacional al dar forma a un sonido extremadamente denso y agresivo, con profundas raíces en el <strong>Black Metal clásico</strong>, fusionado con influencias brutales del <strong>Death</strong> y <strong>Thrash Metal</strong>.",
            "about-p2": "Tras un hiato que silenció temporalmente los altares profanos, la horda regresó con toda su fuerza en la última década, canalizando ritos ancestrales y oscuros manifiestos líricos para continuar su legado de herejía sonora y musicalidad caótica.",
            "about-p3": "Las composiciones transitan por atmósferas densas y tempos devastadores, manteniendo viva la llama de Belo Horizonte como una de las cunas más grandes del Metal Extremo en el mundo.",
            "about-lineup": "Alineación Actual",
            "role-vocals": "Voz",
            "role-guitar": "Guitarra",
            "role-bass": "Bajo",
            "role-drums": "Batería",
            "music-title": "Herejías",
            "music-subtitle": "Obras de la Oscuridad",
            "music-released": "Lanzado por ",
            "music-player": "DESPERTAR REPRODUCTOR DIGITAL (SPOTIFY)",
            "videos-title": "Proyecciones",
            "videos-subtitle": "Manifestaciones audiovisuales de caos",
            "tour-title": "Rituales",
            "tour-subtitle": "Conciertos y Liturgias Programadas",
            "tour-lineup": "Lineup: Junto a <strong>Sekeromlat</strong>, <strong>Morkt</strong> y <strong>Vazio</strong>",
            "tour-ticket": "Entradas",
            "tour-widget-title": "Widget de Shows Oficial (Bandsintown / Songkick)",
            "tour-widget-desc": "Sección preparada para script de sincronización de agenda digital.",
            "gallery-title": "Galería y Altar",
            "gallery-subtitle": "Registros Macabros y Reliquias",
            "gallery-item-1-title": "La Horda Oculta",
            "gallery-item-1-cat": "Retrato",
            "gallery-item-2-cat": "Arte Conceptual",
            "gallery-item-3-title": "El Culto del Sigilo",
            "gallery-item-3-cat": "Símbolo",
            "merch-title": "Artefactos Profanos",
            "merch-item-1-title": "Camiseta Oficial 'The Five Sigils'",
            "merch-item-1-type": "Indumentaria / Camiseta Oficial",
            "merch-item-1-stock": "Últimas unidades",
            "merch-item-2-type": "Música / Disco de Vinilo Splatter",
            "merch-item-2-stock": "Edición Limitada",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Música / CD Jewelcase",
            "merch-item-3-stock": "En stock (Cogumelo Records)",
            "merch-buy": "Comprar",
            "contact-title": "Convocatoria",
            "contact-subtitle": "Relaciones de Prensa, Shows y Booking",
            "contact-headline": "Ritual de Convocatoria",
            "contact-intro": "Utilice el canal directo para reservas oficiales, comunicados de prensa, entrevistas y management. Nuestros ritos responden rápidamente bajo las pautas del abismo.",
            "contact-detail-loc": "Belo Horizonte, MG - Brasil",
            "form-label-name": "Identificación / Seudónimo",
            "form-label-email": "Canal de Retorno (E-mail)",
            "form-label-subject": "Objetivo del Pacto",
            "form-label-message": "Mensaje / Convocatoria",
            "form-placeholder-name": "Su nombre u organización",
            "form-placeholder-subject": "Booking / Prensa / Contact",
            "form-placeholder-message": "Describa los términos del convite o booking...",
            "form-submit": "Enviar Pacto ⛧"
        },
        it: {
            "nav-home": "Inizio",
            "nav-about": "L'Orda",
            "nav-music": "Discografia",
            "nav-videos": "Video",
            "nav-tour": "Rituali",
            "nav-merch": "Merch",
            "nav-contact": "Convocazione",
            "hero-subtitle": "Orda Black Metal di Belo Horizonte",
            "hero-cta": "Ascolta \"The Five Sigils\"",
            "hero-scroll": "Scendi nell'abisso",
            "about-title": "L'Orda",
            "about-subtitle": "L'Origine e il Ritorno",
            "about-p1": "Formatosi a Belo Horizonte, Minas Gerais, nel <strong>1998</strong> (inizialmente con il nome di <em>Agaures</em>), il gruppo ha consolidato il proprio spazio nella scena underground nazionale plasmando un suono estremamente denso e aggressivo, con profonde radici nel <strong>Black Metal classico</strong>, fuso con brutali influenze <strong>Death</strong> e <strong>Thrash Metal</strong>.",
            "about-p2": "Dopo un periodo di pausa che ha temporaneamente messo a tacere gli altari profani, l'orda è tornata con forza nell'ultimo decennio, canalizzando riti ancestrali e oscuri manifesti lirici per continuare la propria eredità di eresia sonora e musicalità caotica.",
            "about-p3": "Le composizioni passano attraverso atmosfere dense e tempi devastanti, mantenendo viva la fiamma di Belo Horizonte come una delle più grandi culle del Metal Extremo nel mondo.",
            "about-lineup": "Formazione Attuale",
            "role-vocals": "Voce",
            "role-guitar": "Chitarra",
            "role-bass": "Basso",
            "role-drums": "Batteria",
            "music-title": "Eresie",
            "music-subtitle": "Opere di Tenebra",
            "music-released": "Rilasciato da ",
            "music-player": "SVEGLIA IL PLAYER DIGITALE (SPOTIFY)",
            "videos-title": "Proiezioni",
            "videos-subtitle": "Manifestazioni audiovisive del caos",
            "tour-title": "Rituali",
            "tour-subtitle": "Concerti e Liturgie In Programma",
            "tour-lineup": "Lineup: Al fianco di <strong>Sekeromlat</strong>, <strong>Morkt</strong> e <strong>Vazio</strong>",
            "tour-ticket": "Biglietti",
            "tour-widget-title": "Widget di Concerti Ufficiale (Bandsintown / Songkick)",
            "tour-widget-desc": "Sezione preparata per lo script di sincronizzazione dell'agenda digitale dei concerti.",
            "gallery-title": "Galleria & Altare",
            "gallery-subtitle": "Registri Macabri e Reliquie",
            "gallery-item-1-title": "L'Orda Occulta",
            "gallery-item-1-cat": "Ritratto",
            "gallery-item-2-cat": "Arte Concettuale",
            "gallery-item-3-title": "Il Culto del Sigillo",
            "gallery-item-3-cat": "Simbolo",
            "merch-title": "Artefatti Profani",
            "merch-item-1-title": "T-Shirt Ufficiale 'The Five Sigils'",
            "merch-item-1-type": "Abbigliamento / T-Shirt Ufficiale",
            "merch-item-1-stock": "Ultime unità",
            "merch-item-2-type": "Musica / Disco in Vinile Splatter",
            "merch-item-2-stock": "Edizione Limitata",
            "merch-item-3-title": "CD 'The Five Sigils'",
            "merch-item-3-type": "Musica / CD Jewelcase",
            "merch-item-3-stock": "In magazzino (Cogumelo Records)",
            "merch-buy": "Acquista",
            "contact-title": "Convocazione",
            "contact-subtitle": "Ufficio Stampa, Concerti e Booking",
            "contact-headline": "Rituale di Convocazione",
            "contact-intro": "Utilizza il canale diretto per booking ufficiali, comunicati stampa, interviste e management. I nostri riti rispondono rapidamente secondo i dettami dell'abisso.",
            "contact-detail-loc": "Belo Horizonte, MG - Brasile",
            "form-label-name": "Identificazione / Pseudonimo",
            "form-label-email": "Canale di Risposta (E-mail)",
            "form-label-subject": "Scopo del Patto",
            "form-label-message": "Messaggio / Convocazione",
            "form-placeholder-name": "Il tuo nome o organizzazione",
            "form-placeholder-subject": "Booking / Stampa / Contatti",
            "form-placeholder-message": "Descrivi i dettagli dell'invito o del booking...",
            "form-submit": "Invia Patto ⛧"
        }
    };

    function changeLanguage(lang) {
        const langData = translations[lang] || translations['pt'];
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langData[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = langData[key];
                } else {
                    element.innerHTML = langData[key];
                }
            }
        });
        
        // Update document lang attribute
        document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'zh' ? 'zh-CN' : lang === 'de' ? 'de' : lang === 'fr' ? 'fr' : lang === 'es' ? 'es' : lang === 'it' ? 'it' : 'pt-BR';
        
        // Save preference
        localStorage.setItem('agaurez-lang', lang);
    }

    // Set change event listener
    langSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    // Check localStorage preference
    const savedLang = localStorage.getItem('agaurez-lang');
    if (savedLang && translations[savedLang]) {
        langSelect.value = savedLang;
        changeLanguage(savedLang);
    }
}
