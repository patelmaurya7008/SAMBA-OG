# System Design & Design Specification: Apple-Grade Minimal Alabaster Glassmorphism

**Target Product:** Adidas Samba OG (Pine Green / Cream / Gum Sole)  
**Aesthetic Mode:** Apple visionOS / Minimal Alabaster Studio with Frosted Silica Glass  
**Target Output:** Vanilla HTML5, Modern CSS3 (Variables, Backdrop-Filter, 3D Transforms), Vanilla JavaScript (No heavy frameworks required)

---

## 1. Visual Philosophy & Page Architecture

### 1.1 The Canvas (Spatial Studio)
Rather than a stark flat white background (which eliminates glass refraction) or an overly dark game UI, this design utilizes an **Apple Studio Alabaster environment**:
* **Base Tone:** Warm Alabaster (`#EBEAE5`) transitioning subtly to Bone (`#E2DFD7`).
* **Ambient Lighting:** Soft, organic, low-opacity radial ambient gradients (`#1F4E3D` at 4% opacity and Warm Honey Gum `#C89656` at 3% opacity) floating off-center behind the sneaker cutout. This ensures the frosted glass panels have rich, natural optical color to refract and blur.
* **Spatial Hierarchy:**
  * **Layer 0 (Background):** Studio gradient with ambient lighting orbs + subtle architectural watermark typography (`SAMBA`).
  * **Layer 1 (Midground Hero):** Isolated 3D isometric sneaker asset with multi-stage contact & ambient occlusion shadow.
  * **Layer 2 (Floating Glass HUD):** Capsule navigation bar, interactive material callout beacons, and floating specs/configurator cards.
  * **Layer 3 (Interactive Foreground):** Hover spotlight cursor layer and sticky modal drawers.

---

## 2. Color Palette & Design Tokens

```css
:root {
  /* Surface / Canvas */
  --canvas-bg: #EAE8E3;
  --canvas-surface: #F2F0EC;
  --canvas-warm-tint: #DEDAD1;

  /* Product Hero Accents */
  --pine-green: #1C4D3B;
  --pine-green-glow: rgba(28, 77, 59, 0.25);
  --gum-sole: #B8854E;
  --gum-amber-glow: rgba(184, 133, 78, 0.2);
  --cloud-white: #FFFFFF;

  /* Typography (Monochrome Contrast) */
  --text-primary: #121314;       /* Deep Obsidian Graphite */
  --text-secondary: #585A5E;     /* Apple Neutral Gray */
  --text-tertiary: #8A8D93;      /* Muted Spec Labels */
  --text-inverted: #FFFFFF;

  /* Apple Frosted Glass Tokens */
  --glass-bg: rgba(255, 255, 255, 0.42);
  --glass-bg-hover: rgba(255, 255, 255, 0.58);
  --glass-blur: blur(28px) saturate(170%);
  --glass-border: 1px solid rgba(255, 255, 255, 0.65);
  --glass-border-subtle: 1px solid rgba(255, 255, 255, 0.35);
  
  /* Specular Highlight & Depth Shadows */
  --glass-inner-bevel: inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.02);
  --glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03);
  --glass-shadow-lg: 0 20px 48px rgba(20, 24, 22, 0.06), 0 8px 16px rgba(0, 0, 0, 0.03);

  /* Geometry & Curves */
  --radius-pill: 9999px;
  --radius-card: 28px;
  --radius-sm: 14px;

  /* Spring Physics Motion Timing */
  --spring-ease: cubic-bezier(0.16, 1, 0.3, 1); /* Apple signature spring curve */
  --transition-fast: 200ms var(--spring-ease);
  --transition-smooth: 450ms var(--spring-ease);
}
```

---

## 3. Typography & Font System

* **Primary Heading / Brand Accent:** **Plus Jakarta Sans** or **Cabinet Grotesk**
  * *Weights:* Bold (700) and Extra Bold (800)
  * *Character:* Crisp, geometric, neo-grotesque authority.
  * *Scale:* Huge hero scale (`clamp(3.5rem, 8vw, 7.5rem)`) with tight tracking (`letter-spacing: -0.04em`).
* **Body / Subtitles / Specs:** **Inter** or **SF Pro Text**
  * *Weights:* Regular (400) and Medium (500)
  * *Scale:* 14px – 16px with `line-height: 1.5`
  * *Tracking:* Neutral (`-0.01em`)
* **Overlines & Micro-Labels:**
  * *Weights:* SemiBold (600)
  * *Style:* Uppercase, `letter-spacing: 0.12em`, `font-size: 11px` for high-end technical luxury feel.

---

## 4. Micro-Interactions & Motion Choreography

### 4.1 3D Magnetic Parallax & Card Tilt
* When the user moves their mouse across the hero area, the floating sneaker shifts with smooth interpolation (`lerp`) on the Z and rotation axes (`rotateX`, `rotateY`).
* The surrounding glass cards move with a reverse parallax offset, creating a genuine sense of spatial depth.

### 4.2 Dynamic Specular Spotlight Borders
* As the cursor hovers across frosted glass capsules, a subtle radial gradient mask moves in sync with the mouse coordinates `(x, y)` along the outer border, mimicking an actual glass edge catching directional ambient room light.

### 4.3 Tactile "Inspection Beacons" (Material Hotspots)
* Two to three pulsating micro-rings on the shoe:
  1. **Point 1 (Toe Box):** *"T-Toe Premium Suede Overlay"*
  2. **Point 2 (Sole):** *"Low-profile Gum Rubber Cupsole"*
  3. **Point 3 (Lateral):** *"Full-Grain Leather 3-Stripes"*
* Hovering or tapping a beacon smoothly expands a frosted micro-lens card showing material detail and story notes while gently tilting the shoe towards that point of focus.

### 4.4 Magnetic Spring CTA & Pill Controls
* Size pill buttons (`7.5`, `8.0`, `8.5`, `9.0`, `9.5`) morph smoothly into active states with physical bounce.
* Primary "Add to Bag" pill CTA utilizes an inverted dark graphic state (`#121314` text on glowing white or pine-tinted frosted surface) with a tactile button depression (`scale(0.97)` on `:active`).

---

## 5. Assets Stored

| Asset | Location | Purpose |
|---|---|---|
| Reference Concept | [`assets/minimal_alabaster_frosted_glass.jpg`](file:///c:/Users/patel/OneDrive/Desktop/New%20folder/assets/minimal_alabaster_frosted_glass.jpg) | High-fidelity visual benchmark for frosted silica glass and alabaster studio lighting |
| Current Product Photo | [`assets/image.png`](file:///c:/Users/patel/OneDrive/Desktop/New%20folder/assets/image.png) | High-res Adidas Samba product photography for extraction and masking |
| System Specification | [`SYSTEM_DESIGN.md`](file:///c:/Users/patel/OneDrive/Desktop/New%20folder/SYSTEM_DESIGN.md) | Architectural tokens, typography, motion curves, and layout rules |
