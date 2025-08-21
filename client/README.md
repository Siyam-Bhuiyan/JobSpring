# JobSpring Frontend

A modern React frontend application for the JobSpring career platform built with Vite, TailwindCSS, and Material-UI.

## Features

- 🎨 Beautiful UI with Material-UI components and TailwindCSS
- 🔄 State management with Redux Toolkit
- 🛡️ Protected routes for authenticated users
- 📱 Responsive design for all devices
- ⚡ Fast development with Vite
- 🔗 API integration with the Spring Boot backend

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Material-UI** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## Installation

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/                 # API configuration and services
├── components/         # Reusable React components
├── pages/              # Page components
├── redux/              # State management
└── assets/             # Static assets
```

## API Integration

The frontend connects to the Spring Boot backend API running on `http://localhost:8080`.

## Deployment

Build the project for production:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of the JobSpring platform and follows the same license terms.
