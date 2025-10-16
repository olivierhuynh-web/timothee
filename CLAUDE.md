# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Timothée, featuring an animated, interactive layout with GSAP-powered transitions. The application uses a custom animation system with React Context to manage complex state and references across three main sections: Main (hero and projects), Sidebar, and Articles.

## Development Commands

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Run production server (after build)
npm start

# Lint the codebase
npm run lint
```

Development server runs on http://localhost:3000 by default.

## Architecture

### Core Technologies
- **Next.js 15** with App Router
- **React 19** (client components)
- **GSAP 3.13** for animations
- **Lenis** (@studio-freight/lenis + lenis) for smooth scrolling
- **SCSS modules** for styling

### Application Structure

The app uses a single-page architecture with three main sliding sections managed by GSAP:

1. **Main Section** (`src/app/components/main/`)
   - Hero component with custom animations
   - Projects display with scroll-triggered list
   - Stickers component
   - Projects can slide in/out to reveal Articles section

2. **Sidebar Section** (`src/app/components/sidebar/`)
   - Fixed navigation and controls
   - Manages state transitions between sections

3. **Articles Section** (`src/app/components/articles/`)
   - Hidden by default (width: 0)
   - Slides in when Main section slides left
   - Contains ArticlesMenu that animates independently

### State Management: RefsContext (`src/app/animations/context.js`)

This is the central nervous system of the application. It provides:

**Refs:**
- `mainRef`, `sidebarRef`, `articlesRef`, `wrapperRef` - Section containers
- `projectsListRef` - Dynamic project list that builds as user scrolls
- `projectPicturesRefs` - Array of refs for project images
- `articlesMenuRef` - Articles navigation menu

**State:**
- `isMainOpen` - Controls whether Main or Articles section is visible
- `openedProject` - Currently selected project ID
- `database` - Project data from `src/app/db/database.json`

**Key Animations:**
- `slideToTheRightOnTheScreen()` - Slides wrapper left, reveals Articles section (100vw)
- `slideToTheLeftOnTheScreen()` - Returns wrapper to default position, hides Articles
- `slideArticlesMenu()` - Slides ArticlesMenu in/out based on `isMainOpen` state
- `projectsListScrollEffect()` - Complex scroll-triggered system that builds/removes project titles as user scrolls through project images using IntersectionObserver + scroll events

### Data Structure

Projects data lives in `src/app/db/database.json`:
```json
{
  "projects": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "pictures": ["url1", "url2", ...]
    }
  ]
}
```

### Path Aliases

The project uses `@/*` as an alias for `./src/*` (configured in jsconfig.json).

### Internationalization

The app is configured for French (`fr`) as default locale with English (`en`) support in `next.config.js`, though i18n implementation is not yet active.

## Key Patterns

### Client-Side Only Components
All interactive components use `'use client'` directive since they rely heavily on GSAP, hooks, and browser APIs.

### Animation Timing
- Most GSAP animations use 0.5s duration with `power2` easing
- ArticlesMenu has a 0.7s delay when appearing
- State transitions trigger cascading animations (e.g., closing Main → sliding wrapper → showing ArticlesMenu)

### Scroll Effects
The `projectsListScrollEffect` in `context.js` is a sophisticated system that:
- Monitors scroll direction (up/down)
- Uses IntersectionObserver to detect when project images enter viewport
- Dynamically creates/removes project title elements in the list
- Applies different opacity/color to the most recent project (last in list)
- Uses requestAnimationFrame for performance

### SVG Support
Webpack is configured to import SVG files as React components using `@svgr/webpack`.

## Important Notes

- The app is **not** a git repository at the project root (as of last check)
- Comments and console.logs are in French
- There are TODO markers in the code, particularly around ArticlesMenu animations that may need refinement
- The project uses both `lenis` packages (`@studio-freight/lenis` and `lenis`) - verify if both are necessary
