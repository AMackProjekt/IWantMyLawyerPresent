# I Want My Lawyer Present

A powerful, interactive website visualizing statistics about wrongful convictions that could have been prevented with legal representation during police encounters.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)

## 🎯 Project Overview

This website educates visitors about the importance of legal representation during police encounters by presenting compelling statistics and visualizations. It features an interactive landing page with animated counters, data visualizations, and comprehensive information about constitutional rights.

## ✨ Features

### Landing Page Sections

- **Hero Section**: Eye-catching headline with animated background and call-to-action buttons
- **Interactive Statistics Dashboard**: Real-time animated counters showing key metrics
- **Geographic Filtering**: View data by San Diego, California, or United States
- **Data Visualizations**: 
  - Pie charts showing incident type breakdown
  - Bar charts comparing categories
  - Line charts showing trends over time
- **Why It Matters**: Educational content about constitutional rights
- **Before/After Comparison**: Impact of legal representation
- **Call-to-Action**: Contact form and resource links
- **Responsive Navigation**: Mobile-friendly hamburger menu

### Technical Features

- **Mobile-first responsive design** - Works seamlessly on all devices
- **Smooth animations** - Powered by Framer Motion
- **Interactive charts** - Built with Recharts
- **Accessibility compliant** - Semantic HTML and ARIA labels
- **Fast loading** - Optimized with Vite
- **Modern UI** - Styled with Tailwind CSS

## 🛠️ Technology Stack

- **Framework**: React 19.2
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7.3
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Linting**: ESLint

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/AMackProjekt/IWantMyLawyerPresent.git
cd IWantMyLawyerPresent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (outputs to `/dist`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── DataVisualization.tsx
│   │   ├── GeographicFilter.tsx
│   │   ├── ImpactSection.tsx
│   │   ├── WhyItMatters.tsx
│   │   ├── CallToAction.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── statistics.ts   # Mock data structure
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles with Tailwind
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 📊 Data Structure

The application uses the following data structure for statistics:

```typescript
interface ConvictionStats {
  totalCases: number;
  preventableWithLawyer: number;
  breakdown: {
    trafficStops: number;
    illegalSearches: number;
    abuseOfBadge: number;
    other: number;
  };
  byLocation: {
    sanDiego: number;
    california: number;
    unitedStates: number;
  };
  yearlyTrend: Array<{ year: number; cases: number }>;
  impactMetrics: {
    livesAffected: number;
    familiesImpacted: number;
    averageYearsServed: number;
  };
}
```

## 🎨 Design System

### Colors

- **Primary**: Blue shades (Constitutional authority)
- **Accent**: Red shades (Urgency/Warning)
- **Highlight**: Yellow (Call-to-action)

### Typography

- **Display Font**: Poppins (Headings)
- **Body Font**: Inter (Content)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is licensed under the terms found in the LICENSE file.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This website provides general information only and does not constitute legal advice. For specific legal advice, please consult with a qualified attorney.

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ to protect constitutional rights**
