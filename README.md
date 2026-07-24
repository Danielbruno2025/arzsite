# ⛧ AGAUREZ - Official Website ⛧

Official web platform for **AGAUREZ**, Black Metal horde from Belo Horizonte, Minas Gerais, Brazil.  
Official Domains: **[www.agaurez.com](https://www.agaurez.com)** | **[www.agaurez.com.br](https://www.agaurez.com.br)**

---

## 🖤 Art Direction & Visual Aesthetics

The application unites extreme black metal art direction with modern WebGL and responsive frontend engineering:
- **Abyssal Palette**: Deep black (`#020202`), charcoal grey, blood red (`#c70039`), and occult gold highlights (`#c5a059`).
- **Analogue Atmosphere**:
  - CRT VHS scanline overlays for raw, underground visual texture.
  - CSS animated mist and flame aura pulses.
- **Interactive 3D WebGL Medallion**:
  - Full-screen Three.js WebGL scene featuring a sculpted 3D medallion.
  - Encircled by an **Ouroboros 3D Serpent** (biting its own tail with detailed metallic scales and glowing ruby red eyes).
  - Floating 1,200 particle ember system responding dynamically to cursor and touch movement.
- **Procedural Web Audio API Sound FX Engine**:
  - Zero external dependency sound synthesis engine (`audio-fx.js`) generating low sub-bass hums on hover and ritual thuds on click.

---

## 🛠️ Key Features

1. **3D Coming Soon Landing Page & Full Portal**:
   - `index.html` / `coming-soon.html`: Immersive 3D interactive splash landing page.
   - `site.html`: Complete portal with full discography, merch store, audiovisual rituals, and booking contact form.
2. **Dynamic Multi-Language Support (i18n)**:
   - Full support for **English (EN)** and **Portuguese (PT)** on the Coming Soon page.
   - 8-language i18n support on the full site (PT, EN, FR, DE, JA, ES, IT, ZH) with persistent `localStorage` preference saving.
3. **Audio & Streaming Integration**:
   - Floating audio widget with animated sound wave equalizer.
   - On-demand Spotify player embedding for track **Excess Svb-Frequency** (Track ID: `2Y1dPCJ2QQqtnuRSwzUhoA`).
   - Quick access drawer for **Spotify**, **YouTube Music**, **Apple Music**, and **Deezer**.
4. **Merchandise & Official Store**:
   - Integrated store with direct purchase links to **Cogumelo Records** ([Agaurez - The Five Sigils CD](https://www.cogumelorecords.com/product-page/agaurez-cd-five-sigils)).
5. **Booking & Contact Ritual Form**:
   - Direct contact form for concert bookings and press inquiries.

---

## 👥 Official Horde Lineup

- **vocals**: Vocals / Rites
- **guitar**: Guitars
- **B.Brvm**: Bass
- **drums**: Drums

---

## 📂 Project Architecture

```
/
├── index.html          # Main 3D Coming Soon landing page (EN / PT)
├── coming-soon.html    # Landing page alias
├── site.html           # Complete official portal (8-language support)
├── coming-soon-3d.js   # Three.js 3D WebGL engine & Ouroboros serpent mesh
├── coming-soon.css     # Glassmorphism, CRT overlay & dark styles
├── audio-fx.js         # Native Web Audio API procedural sound FX engine
├── style.css           # Main portal stylesheet
├── script.js           # Main portal client logic & 8-lang i18n
├── README.md           # Project documentation (English)
└── assets/             # Official artwork, logo & merchandise media
    ├── arz logo fs images.jpg   # Official band logo artwork
    ├── band_members.png         # Horde lineup photograph
    ├── album_five_sigils.png    # Album cover artwork
    ├── merch_tshirt.png         # Official T-shirt mockup
    └── merch_vinyl.png          # Official Vinyl LP mockup
```

---

## 🚀 How to Run Locally

To avoid CORS restrictions when loading textures and local media, run a lightweight local HTTP server.

**Using Python**:
```powershell
python -m http.server 8080
```

Open your browser and navigate to:
```
http://localhost:8080/index.html
```

---

*⛧ Forged in the depths of Belo Horizonte Black Metal. All rights reserved. ⛧*
