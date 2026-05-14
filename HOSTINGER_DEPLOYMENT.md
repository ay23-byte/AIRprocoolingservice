# 🚀 Hosting Your AC Website on Hostinger

## ✅ Hostinger Plans for Next.js

Hostinger offers several hosting options. For a Next.js application, use:

| Plan | Price | Best For |
|------|-------|----------|
| **VPS Hosting** | $3.99-$7.99/mo | Recommended - Full Node.js support |
| **Cloud Hosting** | $3.99-$9.99/mo | Premium option with scaling |
| **Shared Hosting** | $2.99-$8.99/mo | ❌ NO Node.js support |

**Recommendation**: VPS Hosting (cheapest & reliable)

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Choose Hosting Plan on Hostinger

1. Go to [hostinger.com](https://hostinger.com)
2. Click **"Hosting"** → **"VPS"**
3. Choose the **Basic Plan** ($3.99/month)
4. Register domain or connect existing domain
5. Complete purchase

---

### Step 2: Access Your Hostinger VPS

After purchase, you'll get:
- IP Address
- SSH username & password
- Control panel login

1. Log in to **Hostinger Dashboard**
2. Go to **VPS Management**
3. Note your:
   - IP Address
   - SSH Access credentials
   - Root password

---

### Step 3: Connect via SSH (Terminal)

**For Windows (PowerShell):**
```powershell
# Install SSH if needed
ssh root@YOUR_IP_ADDRESS

# When prompted, enter password from Hostinger
```

**For Mac/Linux:**
```bash
ssh root@YOUR_IP_ADDRESS
```

You should see something like:
```
root@your-vps:~#
```

---

### Step 4: Install Node.js & npm

Once connected via SSH:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Verify installation
node --version
npm --version
```

---

### Step 5: Install Git & Clone Project

```bash
# Install git
apt install -y git

# Create project directory
mkdir -p /var/www/ac-website
cd /var/www/ac-website

# Clone your GitHub repo (or upload files)
git clone YOUR_GITHUB_REPO_URL .

# Or use SCP to upload files from local machine
# On your local PC:
# scp -r "C:\Users\AYUSH\OneDrive\Desktop\ac website\*" root@YOUR_IP:/var/www/ac-website/
```

---

### Step 6: Install Dependencies

```bash
cd /var/www/ac-website
npm install --legacy-peer-deps
```

---

### Step 7: Set Up Environment Variables

```bash
# Create .env.local file
nano .env.local
```

Paste this (update with your values):
```
# MongoDB Connection
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/ac-website

# Domain
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# Google Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G_XXXXXXXXXX
```

Press: **Ctrl+X** → **Y** → **Enter** to save

---

### Step 8: Build & Test

```bash
npm run build

# Test if it starts
npm start
```

If it starts, press **Ctrl+C** to stop (will run in background later)

---

### Step 9: Install PM2 (Process Manager)

```bash
npm install -g pm2

# Start your app with PM2
pm2 start npm --name "ac-website" -- start

# Make it auto-start
pm2 startup
pm2 save
```

---

### Step 10: Set Up Nginx as Reverse Proxy

```bash
# Install Nginx
apt install -y nginx

# Edit Nginx config
nano /etc/nginx/sites-available/default
```

Replace the entire content with:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save: **Ctrl+X** → **Y** → **Enter**

Then:
```bash
# Test Nginx config
nginx -t

# Start Nginx
systemctl start nginx
systemctl enable nginx
```

---

### Step 11: Set Up SSL Certificate (HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts - Certbot auto-configures Nginx
```

---

### Step 12: Configure Domain

In **Hostinger Dashboard**:

1. Go to **Domains**
2. Find your domain
3. Click **DNS Settings**
4. Update A Record:
   - **Name**: @
   - **Value**: YOUR_VPS_IP_ADDRESS
5. Update CNAME (optional):
   - **Name**: www
   - **Value**: your-domain.com

---

### Step 13: Verify Everything

```bash
# Check if app is running
pm2 status

# Check Nginx
sudo systemctl status nginx

# View logs
pm2 logs ac-website
```

---

## ✅ Quick Verification Checklist

- [ ] SSH access works
- [ ] Node.js installed (`node --version`)
- [ ] Git clone successful
- [ ] npm install completed
- [ ] .env.local configured with MongoDB
- [ ] Build succeeds (`npm run build`)
- [ ] PM2 running (`pm2 status`)
- [ ] Nginx running (`systemctl status nginx`)
- [ ] SSL certificate installed
- [ ] Domain points to VPS IP
- [ ] Website accessible at https://your-domain.com

---

## 📞 Troubleshooting

### Website not loading?

```bash
# Check if Node app is running
pm2 status

# Restart if needed
pm2 restart ac-website

# Check logs
pm2 logs ac-website

# Check Nginx
sudo systemctl status nginx
sudo nginx -t
```

### Port 3000 already in use?

```bash
# Find what's using port 3000
lsof -i :3000

# Kill it or use different port in PM2
pm2 start npm --name "ac-website" -- start -- -p 3001
```

### SSL certificate error?

```bash
# Renew certificate
certbot renew --dry-run

# If needed
certbot --nginx -d your-domain.com
```

### MongoDB connection error?

```bash
# Check .env.local
cat .env.local

# Verify MongoDB URI is correct
# Should be: mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

---

## 🔐 Security Tips

1. **Change Root Password**
   ```bash
   passwd
   ```

2. **Set Up Firewall**
   ```bash
   apt install -y ufw
   ufw default deny incoming
   ufw default allow outgoing
   ufw allow 22/tcp    # SSH
   ufw allow 80/tcp    # HTTP
   ufw allow 443/tcp   # HTTPS
   ufw enable
   ```

3. **Keep Updated**
   ```bash
   apt update && apt upgrade -y
   ```

4. **Monitor Logs**
   ```bash
   pm2 logs ac-website
   tail -f /var/log/nginx/error.log
   ```

---

## 💾 Backup Strategy

```bash
# Backup your database (MongoDB Atlas handles this)
# Backup code to GitHub (already done)

# Manual database backup
mongodump --uri "YOUR_MONGODB_URI" --out /backups/
```

---

## 📊 Performance Monitoring

```bash
# Monitor resource usage
pm2 monit

# Check disk space
df -h

# Check memory
free -h

# View running processes
ps aux
```

---

## 🚀 Auto-Update Your Website

To pull latest changes from GitHub:

```bash
#!/bin/bash
# Save as: /var/www/ac-website/update.sh

cd /var/www/ac-website
git pull origin main
npm install --legacy-peer-deps
npm run build
pm2 restart ac-website
```

Make it executable:
```bash
chmod +x /var/www/ac-website/update.sh

# Run anytime to update
./update.sh
```

---

## 📋 Final Checklist Before Going Live

- [x] Code builds successfully
- [x] Environment variables configured
- [x] MongoDB connection working
- [x] SSL certificate installed
- [x] Domain pointing to VPS
- [x] PM2 auto-restart enabled
- [x] Nginx running
- [x] Firewall configured
- [x] Backup strategy in place

---

## 💰 Estimated Monthly Cost

| Item | Cost |
|------|------|
| Hostinger VPS | $3.99 |
| Domain (1st year free) | $0 |
| MongoDB Atlas (free tier) | $0 |
| SSL Certificate | $0 (Let's Encrypt) |
| **Total** | **$3.99/month** |

---

## 🆘 Need Help?

- **Hostinger Support**: Contact via Hostinger Dashboard
- **Next.js Docs**: https://nextjs.org/docs/deployment
- **Nginx Docs**: https://nginx.org/en/docs/
- **PM2 Docs**: https://pm2.keymetrics.io/

---

## ✨ You're Live!

Once all steps complete, your website will be running on:
**https://your-domain.com** 🎉

---

**Status**: Ready to deploy!  
**Estimated Time**: 30-45 minutes total
