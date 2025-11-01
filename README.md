# SuiFlow – Visual Transaction Explorer (Frontend)

<div align="center">

![SuiFlow Logo](./public/vite.svg)

**An AI-powered blockchain explorer designed to humanize Sui transactions through beautiful visualizations**


</div>


## 📋 About

SuiFlow is an intelligent visual transaction explorer that connects directly with the Sui blockchain to fetch, parse, and humanize transaction data. This frontend application provides a clean and interactive UI to visualize on-chain activity on the Sui network, converting raw blockchain responses into readable visual summaries — including participants, amounts, transaction digests, and gas analytics — rendered using React Flow components.

This project is part of the **Sui Grants Program** application under the "AI-Enhanced Blockchain Insights" category. The frontend visualization is developed by **@Kins** and integrates seamlessly with the [SuiFlow Backend API](https://github.com/MayowaJulius/suiflow-backend) built by **@MayowaJulius**.



## ✨ Features

- 🎨 **Beautiful Visualizations** - Interactive React Flow graphs displaying transaction flows
- 📊 **Transaction Parsing** - Fetch and parse humanized transaction summaries from backend API
- 🔍 **Address Mapping** - Visualize senders, recipients, and token movements with animated flows
- 🎯 **Responsive Design** - Modern, responsive interface built with React and Tailwind CSS
- 🚀 **Real-time Updates** - Dynamic transaction data fetching and rendering
- 🤖 **AI-Powered Explanations** - Planned integration of AI-driven "explainers" for complex transactions



## 🧠 Example Output

When a transaction is visualized, SuiFlow displays:

```
Sender (0x4aa0d92f...9072) → 0.2 SUI → Recipient (0xb6a150da...2511)
```

The backend API provides structured JSON responses:

```json
{
  "transactionDigest": "DmH3PWELG2ts4fNVrYcGFTp524Twmvo2CrALVYzqvBaf",
  "status": "success",
  "summary": "0x4aa0d92f...9072 transferred 0.2 SUI to 0xb6a150da...2511",
  "explainer": "0x4aa0d92f...9072 sent 0.2 SUI to 0xb6a150da...2511",
}
```


## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Visualization**: React Flow (@xyflow/react 12.9.1)
- **Routing**: React Router DOM 7.9.5
- **Styling**: CSS3 (with custom dark theme)
- **Language**: JavaScript (ES6+)

### Planned Integrations

- **Backend**: Node.js (Express + TypeScript) - [SuiFlow Backend](https://github.com/phenzic/suiflow-backend)
- **Blockchain SDK**: Sui.js for direct blockchain interaction
- **AI Engine**: LLM-based natural language summarization (upcoming)


## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- Yarn 4.6.0+ (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/suiflow-frontend.git
cd suiflow-frontend
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Start the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
yarn build
# or
npm run build
```

### Preview Production Build

```bash
yarn preview
# or
npm run preview
```



## 📁 Project Structure

```
swiflow-frontend/
├── public/
│   └── vite.svg              # Static assets
├── src/
│   ├── assets/               # Image assets
│   │   └── react.svg
│   ├── pages/
│   │   ├── Home.jsx          # Main landing page with transaction input
│   │   ├── Home.css          # Home page styles
│   │   ├── Graph.jsx         # React Flow visualization component
│   │   └── Graph.css         # Graph visualization styles
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Global app styles
│   ├── index.css             # Base styles and theme
│   └── main.jsx               # Application entry point
├── eslint.config.js          # ESLint configuration
├── vite.config.js            # Vite build configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```


## 🏗️ Component Architecture

```
App (Container)
├── Router
│   ├── Home Page
│   │   ├── Transaction Input Form
│   │   └── Navigation Handler
│   └── Graph Page
│       ├── ReactFlow Canvas
│       │   ├── Nodes (Transaction, Addresses)
│       │   ├── Edges (Flow Connections)
│       │   ├── Background
│       │   ├── Controls
│       │   └── MiniMap
│       └── Header Navigation
```



## 🎨 Design System

### Colors

- **Primary Accent**: `#00d4ff` (Cyan) - Transaction highlights and flows
- **Background**: `#0a0e27` (Dark Navy) - Main background
- **Card Background**: `#1a1f3a` (Dark Gray-Blue) - Node backgrounds
- **Text**: `#ffffff` (White) - Primary text
- **Border**: `#00d4ff` with opacity - Interactive borders

### Components

- **React Flow Nodes**: Rounded corners, gradient borders, animated transitions
- **Edges**: Animated flows with cyan stroke, smooth curves
- **Forms**: Dark theme with focus states and hover effects
- **Buttons**: Gradient backgrounds, smooth hover animations



## 🔄 Current Status

**Current Milestone**: MVP connected to backend API, displaying testnet transaction flow visualization.

**Active Features**:
- ✅ Transaction hash input and routing
- ✅ React Flow graph visualization
- ✅ Sample transaction node rendering
- ✅ Animated flow edges
- ✅ Interactive canvas with controls and minimap


- **Frontend Repository**: [suiflow-frontend](https://github.com/kinyichukwu/swiflow-frontend)
- **Backend Repository**: [suiflow-backend](https://github.com/Phenzic/suiflow-backend)
- **Sui Blockchain**: [sui.io](https://sui.io)

<div align="center">

Built with ❤️ for the Sui ecosystem

**@Kins** • **@MayowaJulius**

</div>
