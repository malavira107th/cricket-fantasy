# SDSURABHI Cricket Fantasy

A skill-based, free-to-play cricket fantasy platform where users can create dream teams, compete with friends, and enjoy the thrill of cricket without any monetary risk.

## 🏏 Features

- **Free to Play**: No real money involved, pure skill-based entertainment
- **User Authentication**: Secure OAuth-based login system
- **Team Creation**: Build your dream cricket team
- **Live Contests**: Compete with other players in real-time
- **Leaderboards**: Track your performance and rankings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Modern UI with dark theme support

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Wouter** - Client-side routing
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **TanStack Query** - Data fetching

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **tRPC** - Type-safe API
- **Drizzle ORM** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication

### DevOps
- **Vite** - Build tool
- **pnpm** - Package manager
- **ESBuild** - Bundler
- **Vitest** - Testing

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+
- MySQL database

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/cricket-fantasy.git
cd cricket-fantasy
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration (see `ENV_SETUP.md` for details)

4. Run database migrations:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

## 🚢 Deployment

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed deployment instructions to Railway.

## 📝 Environment Variables

See [ENV_SETUP.md](./ENV_SETUP.md) for a complete list of required environment variables.

## 🧪 Testing

```bash
pnpm test
```

## 📁 Project Structure

```
cricket-fantasy/
├── client/              # Frontend React application
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── hooks/       # Custom React hooks
│       ├── contexts/    # React contexts
│       └── lib/         # Utility functions
├── server/              # Backend Express application
│   ├── _core/           # Core server logic
│   ├── routes/          # API routes
│   └── db.ts            # Database configuration
├── shared/              # Shared types and constants
└── dist/                # Build output
```

## 🎯 Key Pages

- **Home** (`/`) - Landing page with game overview
- **Contests** (`/contests`) - Browse and join contests
- **How to Play** (`/how-to-play`) - Game rules and instructions
- **Leaderboard** (`/leaderboard`) - Player rankings
- **Profile** (`/profile`) - User profile and team management
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form
- **Terms** (`/terms`) - Terms and conditions
- **Privacy** (`/privacy`) - Privacy policy

## 🔒 Legal Compliance

This platform is:
- **NOT available** in Andhra Pradesh, Assam, Odisha, Telangana, Nagaland, and Sikkim
- **Only for users 18 years and older**
- **Skill-based** with no real money involved
- **Free-to-play** entertainment platform

## 👥 Company

**SDSURABHI INFRA PRIVATE LIMITED**
- CIN: U41002UP2023PTC194590
- GST: 09ABMCS3759A1Z4
- Address: Ram Acchayvar 48/2, Ayodhya Puri 2 Bijnour, Sarojini Nagar, Lucknow, Uttar Pradesh 226008, India

## 📧 Contact

- **Support**: support@sportiqplay.com
- **Legal**: legal@sportiqplay.com
- **Privacy**: privacy@sportiqplay.com

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Important Notes for Deployment

1. **OAuth Configuration**: The current implementation uses Manus OAuth which needs to be replaced with your own OAuth provider (Google, GitHub, etc.) or a third-party service (Auth0, Clerk, etc.) before deploying to production.

2. **Environment Variables**: Make sure all required environment variables are properly configured before deployment.

3. **Database**: Run migrations (`pnpm db:push`) after setting up your production database.

4. **Analytics**: Update or remove analytics configuration based on your needs.

## 🙏 Acknowledgments

- Built with [Manus](https://manus.im) development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Made with ❤️ by SDSURABHI INFRA PRIVATE LIMITED**
