# BassRoads - Premium Audio E-Commerce

A modern e-commerce platform for premium audio equipment built with Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Dark/Light Theme Toggle** - Switch between dark and light modes
- **Product Discovery** - Browse 30+ premium audio products across 6 categories
- **Smart Filtering** - Filter by category, brand, and price range
- **Sorting Options** - Sort by price, rating, and newest
- **Shopping Cart** - Persistent cart functionality
- **Wishlist** - Save favorite products
- **Responsive Design** - Works on all devices

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # UI components
│   ├── cart/         # Cart and checkout
│   ├── layout/       # Header, Footer
│   ├── products/     # Product components
│   └── providers/    # Theme and Cart providers
├── data/             # Product data
├── store/            # Zustand stores
└── styles/           # Global styles
```

## Categories

- Headphones
- Earphones
- Speakers
- Soundbars
- TWS Earbuds
- DACs & Amps

## License

MIT