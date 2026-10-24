---
name: Chu Dịch Linh Quái
description: A quiet dark study for casting coins and reading the changing lines.
colors:
  bg: "#101311"
  surface: "#191d19"
  ink: "#ede9dd"
  muted: "#adb2a5"
  line: "#343a31"
  brass: "#c5a36b"
  red: "#e19a86"
  field-bg: "#131712"
  field-border: "#49503f"
  control-bg: "#30382b"
  control-hover: "#414e37"
  primary-hover: "#d9bb86"
  primary-ink: "#141710"
typography:
  display: {fontFamily: "'Noto Serif', serif", fontSize: "clamp(38px, 4.4vw, 62px)", fontWeight: 400, lineHeight: 1.23, letterSpacing: "-0.035em"}
  headline: {fontFamily: "'Noto Serif', serif", fontSize: "24px", fontWeight: 400}
  classical: {fontFamily: "'Noto Serif', serif", fontSize: "23px", fontWeight: 400, lineHeight: 1.9}
  body: {fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: 1.8}
  control: {fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "13px", fontWeight: 500}
  label: {fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: "12px", fontWeight: 400}
rounded: {seal: "3px", chip: "4px", control: "5px", field: "6px", dialog: "12px"}
spacing: {compact: "8px", control-gap: "12px", action: "20px", section: "24px", panel-compact: "28px", panel: "40px", page: "48px"}
components:
  button-primary: {backgroundColor: "{colors.brass}", textColor: "{colors.primary-ink}", typography: "{typography.control}", rounded: "{rounded.control}", padding: "12px 20px", width: "100%"}
  button-primary-hover: {backgroundColor: "{colors.primary-hover}"}
  button-secondary: {backgroundColor: "{colors.control-bg}", textColor: "{colors.ink}", typography: "{typography.control}", rounded: "{rounded.control}", padding: "12px 20px"}
  button-secondary-hover: {backgroundColor: "{colors.control-hover}"}
  button-text: {backgroundColor: "transparent", textColor: "{colors.muted}", typography: "{typography.label}"}
  question-field: {backgroundColor: "{colors.field-bg}", textColor: "{colors.ink}", rounded: "{rounded.field}", padding: "14px", width: "100%"}
  workspace: {backgroundColor: "{colors.surface}", textColor: "{colors.ink}"}
  reading-quote: {backgroundColor: "{colors.surface}", textColor: "{colors.brass}", typography: "{typography.classical}", rounded: "{rounded.chip}", padding: "22px 25px"}
  library-dialog: {backgroundColor: "{colors.bg}", textColor: "{colors.ink}", rounded: "{rounded.dialog}", width: "min(980px, calc(100% - 32px))"}
---

# Design System: Chu Dịch Linh Quái

## Overview

**Creative North Star: "The Quiet Study Desk"**

Casting and reading occupy one restrained workspace. The approved direction is dark, minimal and elegant: green-black surfaces, warm paper text, aged brass, serif headings and clear sans-serif controls. Ruled sections and steady positions give the ritual a practical rhythm.

Material detail belongs to three coins and their shallow plate. There are no emoji, decorative halos or shipping raster art assets; the identity comes from typography, CSS geometry and inline SVG icons.

**Key Characteristics:**

- A dark study palette with restrained brass emphasis.
- Serif reading hierarchy and Vietnamese-capable sans-serif controls.
- Ruled layouts, stable progress and readable long-form sections.
- Staggered coins whose final faces communicate their sampled score.
- Reduced motion that resolves quickly without spinning.

## Colors

CSS in `src/index.css` is the implementation source of truth; frontmatter captures its current values. Primary brass marks actions, headings, selected tabs, bars and classical text. Secondary pale cinnabar marks moving lines. Neutral green ink is the canvas; study surface groups work; warm paper carries primary text; sage grey carries metadata; ruled green separates sections. The stone/amber `@theme` aliases support compatible utility classes, not a separate bright-amber direction.

**The Meaningful Accent Rule.** Pair moving-line color with a textual label and line number; keep brass tied to hierarchy, interaction or metal.

## Typography

Noto Serif is the display and reading family; Be Vietnam Pro is the body and control family. Both are self-hosted with `@fontsource` imports in `src/main.jsx`: Latin/Vietnamese Noto Serif 400 and Be Vietnam Pro 400/500. Chinese glyphs use the browser's available fallback; a CJK font is not bundled.

The display follows frontmatter, then becomes 45px at ≤1000px and 42px at ≤760px. Intention headings are 24px; result headings 34px; hexagram names 31px/25px. Reading section titles are 23px/21px. Classical quotes use the frontmatter role; expanded Chinese text is 20px, transliteration 16px. Reading copy is 14px/13px with 1.8 paragraph spacing and a 76ch maximum width. Controls are 13px/500; labels 12px; metadata 10–11px. The brand subtitle alone uses uppercase and 0.18em tracking.

**The Reading Hierarchy Rule.** Use serif weight 400 and spacing for emphasis; reserve sans-serif weight 500 for actions and compact facts.

## Layout

Masthead: maximum 1328px, height 104px. Main/footer: maximum 1232px with 48px horizontal padding. Casting uses a 1:1.13 two-column surface, minimum height 480px, with the form/ledger left and coin stage right. Intention padding is 38px 40px 30px. The ledger preserves positions and displays Thượng above Sơ while lines are established bottom to top.

Results use three equal ruled tabs, then a 210px sticky index at top 24px and a flexible reading column with a 50px gap. Trigram facts use two columns; interpretation rows use a 110px label column.
- At ≤1000px: page/panel padding 28px; reading index 170px with a 30px gap; result actions below the heading; library entries in two columns.
- At ≤760px: page padding 22px, masthead 82px, icon-only navigation with accessible names, hidden date note, stacked casting panels and a 300px coin stage. Reading index wraps inline; interpretation rows stack; library retains two compact columns; footer stacks; questions and notes wrap.
- At ≥1450px: intro top padding 64px, casting minimum height 490px and coin stage 330px.

Dialogs cap at 90dvh with a separate header/scroll region; standard width is in frontmatter, share dialog caps at 540px. Share-card printing uses white paper and dark text.

## Elevation & Depth

The workspace is flat, separated by tone and thin rules. Physical depth stays on the coins and plate: the plate uses `0 18px 24px #080c0877, inset 0 2px 2px #52583d`; coin relief uses `inset 0 2px 2px #ebd6a0, inset 0 -2px 3px #574620, 0 4px 0 #675632`; contact ellipses use `blur(9px)`. Dialog backdrops darken the surrounding page.

**The Local Material Rule.** Keep gradients and relief on coins and plate; use flat tonal layers and rules for reading and controls.

## Shapes

Straight rules and open space organize content. Small radii follow frontmatter; dialogs use 12px corners. Coins are 85px circles with an inner rim and 19px square hole, above elliptical CSS plate rings. Hexagrams use continuous yang bars and centrally split yin bars; moving bars use cinnabar.

## Components

Buttons share 46px minimum height, 12px gaps and 12px 20px padding. Primary fills the intention panel; secondary uses green; toss has a green outline and 218px minimum width; text actions have 40px minimum height; icon buttons are 42px square. Hover transitions last 180ms. Focus-visible is a 2px brass outline offset 5px; disabled opacity is 0.4. The masthead uses 17px icons and 44px minimum-height navigation.

The question textarea has 14px padding, 106px minimum height, a visible optional label and vertical resizing. Topic suggestions are outlined 4px chips with 11px text and 7px 10px padding; they populate the question rather than act as selected filters.

The coin stage uses Web Animations: 1580ms flight, 65ms staggering and an 1800ms line commit. Final faces match 3 points at 0° or 2 points at 180°. Reduced motion uses a 180ms reveal, no stagger and a 220ms commit. CSS additionally reduces transitions/animations to 0.01ms and disables smooth scrolling; keep the explicit Web Animations branch. This is a designed flight, not a physics engine.

Detailed readings show diagram, names, summary, Văn Vương number, trigram facts, Thoán từ, optional Thoán truyện, Đại tượng, six line disclosures and six interpretation areas. Moving lines open by default with text markers; Dụng Cửu/Dụng Lục appears when supplied. Chinese passages use `lang="zh"`. Preserve missing-Vietnamese-translation messages and source notes; `src/data/SOURCES.md` distinguishes transcription and interpretation without claiming scholarly validation.

Library entries reuse the detailed reader. History, guide and share card use the shared native Modal. History uses ruled entries, 23px questions, brass fact labels, wrapping notes and a labeled edit textarea. The share card centers seal, question, diagram and classical quotation with a separate print action.

## Do's and Don'ts

- Do use green-black surfaces, warm paper text and restrained brass emphasis.
- Do preserve bottom-to-top line meaning, stable ledger positions and textual moving-line labels.
- Do retain self-hosted fonts, explicit reduced motion and readable source/translation notes.
- Don't add emoji, decorative glow, bright amber halos or default elevated cards.
- Don't reintroduce Cinzel or heavy serif display weights.
- Don't imply complete Vietnamese translation coverage or scholarly validation.
