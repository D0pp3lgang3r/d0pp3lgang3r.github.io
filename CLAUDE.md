# D0pp3lgang3r — Personal Portfolio Site

## Project Overview

Personal cybersecurity portfolio website for D0pp3lgang3r — French Polytech student, crypto/security enthusiast.
Theme: Amegakure (Hidden Rain Village) from Naruto + cyber/hacker aesthetic.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (custom Amegakure palette) + global CSS animations
- **Markdown**: react-markdown + remark-gfm + remark-math + rehype-katex + rehype-pretty-code
- **Frontmatter**: gray-matter
- **Animations**: Framer Motion
- **Fonts**: Orbitron (headers), JetBrains Mono (body/code), Noto Sans JP (Japanese)

## Directory Structure

```
├── content/
│   ├── articles/      # Markdown articles (add .md files here)
│   └── writeups/      # CTF writeups (add .md files here)
├── public/
│   ├── amegakure.gif  # Main background (place here)
│   └── images/        # Images referenced in markdown
└── src/
    ├── app/           # Next.js App Router pages
    ├── components/    # Reusable components
    └── lib/           # Utilities (markdown processing)
```

## Adding Content

### New Article or Writeup

Create a `.md` file in `content/articles/` or `content/writeups/` with this frontmatter:

```markdown
---
title: "My Article Title"
date: "2024-01-15"
tags: ["cryptography", "RSA"]
description: "Short description shown in the card"
---

# Content starts here

Math inline: $e^{i\pi} + 1 = 0$

Math block:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Supported Markdown Features

- **Math**: `$inline$` and `$$block$$` (KaTeX)
- **Code blocks**: fenced with language for syntax highlighting
- **Images**: `![alt](./image.png)` — place images in `public/images/`
- **Tables**, **strikethrough**, **task lists** (GFM)
- **Raw HTML** in markdown

## Dev Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Design System

### Color Palette (Amegakure)

| Token        | Value     | Usage                     |
|-------------|-----------|---------------------------|
| `ame-black`  | `#050508` | Background                |
| `ame-void`   | `#0a0a12` | Card backgrounds          |
| `ame-purple` | `#7c3aed` | Primary accent (Rinnegan) |
| `ame-violet` | `#4c1d95` | Secondary purple          |
| `ame-rain`   | `#a78bfa` | Rain/light purple         |
| `ame-steel`  | `#1e293b` | Borders, steel panels     |
| `ame-text`   | `#e2e8f0` | Body text                 |
| `ame-muted`  | `#64748b` | Secondary text            |
| `ame-cyber`  | `#06b6d4` | Cyan tech accents         |
| `ame-blood`  | `#ef4444` | Danger/Akatsuki red       |

### Navbar Effect

Hover → letters cycle through random hiragana/katakana → decode to real text (Matrix-style).
Charset: `アイウエオカキクケコサシスセソタチツテトナニヌネノ...`

## Profiles / Links

- GitHub: https://github.com/D0pp3lgang3r
- Root-Me: https://www.root-me.org/D0pp3lgang3r
- CryptoHack: https://cryptohack.org/user/D0pp3lgang3r/ (Rank #329, 11040pts)
- YesWeHack: https://yeswehack.com/hunters/D0pp3lgang3r
