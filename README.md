# Campus Cafe Connect App

A modern web application for managing cafe orders, built with React and Vite,
and a collaborative effort to improve a cafe experience at CU Boulder!

Group Members: Aaron Couhault,
Turner Davis,
Marcus Huston,
Brendan Myers,
Vanessa Senethong,
Leland Smith,
Hilna Yonas

## Features
- Interactive menu browsing
- Informative order management system
- User preferences up to their preferences
- Realistic cafe ordering app experience

## Prerequisites

Before setting up the project, ensure you have the following installed:

### Required Software
1. **Node.js** (version 14 or higher)
    - Download from: [https://nodejs.org/](https://nodejs.org/)
    - Verify installation: `node --version`

2. **Git** (for cloning the repository)
    - Download from: [https://git-scm.com/](https://git-scm.com/)
    - Verify installation: `git --version`

## Installation & Setup

Follow these steps to run the application locally:

### 1. Clone the Repository
```bash
# Clone the repository to your local machine
git clone https://github.com/your-username/cafe-ordering-app.git

# Navigate to the project directory
cd cafe-ordering-app
```

### 2. Install Dependencies
```bash
# Install all required packages
npm install
```

### 3. Start the Development Server
```bash
# Launch the application
npm run dev
```

### 4. Access the Application
Once the server starts, you'll see output similar to:
```
VITE v6.3.5 ready in 379 ms

➜ Local:   http://localhost:3000/
➜ Network: use --host to expose
```

Open your web browser and visit: [http://localhost:3000/](http://localhost:3000/)

## Project Structure

```
cafe-ordering-app/
├── src/              # Source code
├── public/           # Static assets
├── node_modules/     # Dependencies (auto-generated)
├── package.json      # Project configuration
├── vite.config.js    # Build configuration
└── README.md         # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run code linting (if configured) |

## Troubleshooting

### Common Issues & Solutions

#### 1. "npm: command not found"
- **Solution**: Ensure Node.js is properly installed and added to your PATH
- **Verification**: Run `node --version` and `npm --version` in terminal

#### 2. Port 3000 Already in Use
If you see an error about port 3000 being occupied:
- Close other applications using port 3000
- The app may automatically choose another port - check the terminal output for the new URL

#### 3. Installation Errors
```bash
# If npm install fails, try:
rm -rf node_modules package-lock.json
npm install
```

#### 4. Outdated Dependencies
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install
```


## Stopping the Application

To stop the development server, return to the terminal where it's running and press:
```
Ctrl + C
```

The built files will be in the `dist/` directory. You can preview the production build with:

```bash
npm run preview
```

## Development Notes

- The application uses **Vite** as the build tool for fast development
- Hot Module Replacement (HMR) is enabled for instant updates during development
- The dev server runs on `localhost:3000` by default

- **React** - Frontend library
- **npm** - Package management


If you encounter any issues setting up or running the application, please:
1. Ensure all prerequisites are met
2. Check the troubleshooting section above
3. Contact the developer with:
    - Your operating system
    - Node.js version
    - The exact error message

---

**Note**: This application requires an active internet connection for downloading dependencies during initial setup. All subsequent runs work offline.
