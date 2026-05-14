#!/bin/bash

# Auto-Setup Script for Hostinger VPS
# Run this after SSH into your VPS to automate the setup

echo "🚀 Starting AC Website Setup on Hostinger VPS..."
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "❌ Please run as root (use: sudo ./setup.sh)"
   exit 1
fi

echo "⏳ Installing system updates..."
apt update && apt upgrade -y

echo "⏳ Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

echo "⏳ Installing Git..."
apt install -y git

echo "⏳ Installing Nginx..."
apt install -y nginx

echo "⏳ Installing PM2..."
npm install -g pm2

echo "⏳ Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "✅ System dependencies installed!"
echo ""
echo "📁 Creating project directory..."
mkdir -p /var/www/ac-website
cd /var/www/ac-website

echo ""
echo "📝 Enter your GitHub repository URL:"
read GITHUB_REPO

echo "⏳ Cloning repository..."
git clone $GITHUB_REPO .

echo "⏳ Installing npm dependencies..."
npm install --legacy-peer-deps

echo ""
echo "📝 Enter your MongoDB connection string:"
echo "   (Format: mongodb+srv://user:password@cluster.mongodb.net/dbname)"
read MONGODB_URI

echo "📝 Enter your domain name (e.g., ac-website.com):"
read DOMAIN

echo ""
echo "⏳ Creating .env.local file..."
cat > .env.local << EOF
MONGODB_URI=$MONGODB_URI
NEXT_PUBLIC_DOMAIN=https://$DOMAIN
NODE_ENV=production
EOF

echo "✅ Environment file created!"

echo ""
echo "⏳ Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Check the errors above."
    exit 1
fi

echo "✅ Build successful!"

echo ""
echo "⏳ Starting application with PM2..."
pm2 start npm --name "ac-website" -- start
pm2 startup
pm2 save

echo ""
echo "⏳ Configuring Nginx..."
cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

nginx -t
systemctl start nginx
systemctl enable nginx

echo ""
echo "⏳ Setting up SSL certificate..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN

echo ""
echo "⏳ Setting up firewall..."
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "✅ Setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Deployment Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Node.js installed"
echo "✓ Git installed"
echo "✓ Code cloned"
echo "✓ Dependencies installed"
echo "✓ .env.local configured"
echo "✓ Application built"
echo "✓ PM2 running"
echo "✓ Nginx configured"
echo "✓ SSL certificate installed"
echo "✓ Firewall enabled"
echo ""
echo "🌐 Your website is now live at: https://$DOMAIN"
echo ""
echo "📋 Useful Commands:"
echo "   pm2 status              - Check app status"
echo "   pm2 logs ac-website     - View logs"
echo "   pm2 restart ac-website  - Restart app"
echo "   systemctl status nginx  - Check Nginx"
echo ""
echo "════════════════════════════════════════"
