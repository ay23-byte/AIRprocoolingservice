{
  "name": "AC Website - Production Deployment",
  "version": "1.0.0",
  "deploymentSteps": [
    {
      "step": 1,
      "title": "Prerequisites",
      "items": [
        "Node.js 18+ installed",
        "MongoDB instance (local or Atlas)",
        "Vercel account (recommended for Next.js)",
        "Domain name configured",
        "SSL certificate (auto with Vercel)"
      ]
    },
    {
      "step": 2,
      "title": "Environment Setup",
      "items": [
        "Create .env.local file from .env.example",
        "Add MongoDB URI",
        "Configure Google Analytics ID",
        "Set domain URL",
        "Add email configuration (optional but recommended)"
      ]
    },
    {
      "step": 3,
      "title": "Build & Test Locally",
      "commands": [
        "npm install",
        "npm run build",
        "npm start"
      ]
    },
    {
      "step": 4,
      "title": "Deploy to Vercel",
      "items": [
        "Connect GitHub repository to Vercel",
        "Add environment variables in Vercel dashboard",
        "Deploy from main/production branch",
        "Configure custom domain",
        "Enable SSL"
      ]
    },
    {
      "step": 5,
      "title": "Post-Deployment",
      "items": [
        "Test all pages and forms",
        "Verify Google Analytics is working",
        "Test booking form submission",
        "Check mobile responsiveness",
        "Monitor for errors in logs"
      ]
    }
  ],
  "criticalFiles": [
    ".env.local - Environment variables (DO NOT commit)",
    "src/config/business.ts - Business configuration",
    "src/lib/db/mongoose.ts - Database connection",
    ".gitignore - Ignore sensitive files"
  ],
  "monitoringAndMaintenance": [
    "Monitor API errors via Vercel logs",
    "Track user engagement via Google Analytics",
    "Regular database backups (MongoDB Atlas handles this)",
    "Update dependencies monthly",
    "Monitor uptime and performance"
  ]
}
