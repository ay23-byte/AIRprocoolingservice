# 🚀 LIVE DEPLOYMENT GUIDE
## Air Pro Cooling Service Website - Ready to Go Live

**Status**: ✅ Production Ready  
**Last Updated**: May 12, 2026

---

## 📋 QUICK OVERVIEW

Your website is ready to deploy. Choose your platform and follow the steps.

| Platform | Time | Cost | Difficulty | Recommendation |
|----------|------|------|------------|-----------------|
| **Vercel** | 5 min | Free/Paid | ⭐ Easy | ⭐⭐⭐⭐⭐ BEST |
| **Netlify** | 10 min | Free/Paid | ⭐ Easy | ⭐⭐⭐⭐ Good |
| **Docker + VPS** | 30 min | $5-20/mo | ⭐⭐⭐ Medium | ⭐⭐⭐ Advanced |
| **AWS/GCP** | 45 min | Varies | ⭐⭐⭐ Medium | ⭐⭐⭐ Complex |

---

## 🎯 DEPLOYMENT: VERCEL (RECOMMENDED)

**Why Vercel?**
- Optimized for Next.js
- One-click deployment
- Automatic SSL
- Serverless by default
- Free tier perfect for startups
- 99.99% uptime SLA

### STEP 1: Prepare Your Code

```bash
# 1. Ensure all files are committed
git status

# 2. Make sure .env.local is NOT committed (verify in .gitignore)
cat .gitignore | grep .env

# 3. Push to GitHub
git add .
git commit -m "Production deployment - certified ready"
git push origin main
```

### STEP 2: Connect to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up** (GitHub login recommended)
3. **Click "New Project"**
4. **Select GitHub repository**
   - Search: "ac website" or your repo name
   - Click Import
5. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
   - Click "Continue"

### STEP 3: Add Environment Variables

In Vercel Dashboard → [Your Project] → Settings → Environment Variables

Add these variables:

```
MONGODB_URI = mongodb+srv://[username]:[password]@[cluster].mongodb.net/ac_booking?retryWrites=true&w=majority
NEXT_PUBLIC_DOMAIN = https://airprocooling.com (or your domain)
NEXT_PUBLIC_GOOGLE_ANALYTICS = G_XXXXXXXXXX (optional)
```

**Important**: Only add variables visible in code as `NEXT_PUBLIC_*`

### STEP 4: Configure Domain

1. **Go to Vercel Project Settings**
2. **Click "Domains"**
3. **Add Your Domain**
   - Type: `airprocooling.com` (or your domain)
   - Vercel provides nameservers or DNS records
4. **Update Domain DNS**
   - Go to domain provider (GoDaddy, Namecheap, etc.)
   - Update nameservers to Vercel's OR
   - Add DNS records provided by Vercel
   - Wait 15-30 minutes for propagation

### STEP 5: Deploy!

```
🎉 Deploy happens AUTOMATICALLY:
- Every push to main branch
- Or click "Deploy" in Vercel dashboard
- Vercel shows real-time build progress
```

### VERIFICATION ✅

```bash
# After deployment completes:
1. Visit https://airprocooling.com
2. Check for 🔒 SSL lock
3. Test booking form
4. Test mobile menu
5. Check console for errors (F12)
6. Run Lighthouse audit
```

---

## 🐳 DEPLOYMENT: DOCKER (Self-Hosted VPS)

**Best for: Full control, custom configurations, cost-sensitive**

### STEP 1: Prepare VPS

```bash
# SSH into your server
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### STEP 2: Prepare .env File

```bash
# On your local machine, create .env for deployment
cp .env.example .env

# Edit .env with production values
nano .env

# Fill in:
# MONGODB_URI=mongodb+srv://...
# NEXT_PUBLIC_DOMAIN=https://yourdomain.com
```

### STEP 3: Build & Push Image (Optional)

```bash
# Build image locally
docker build -t ac-website:1.0.0 .

# Or use Docker Hub:
docker tag ac-website:1.0.0 yourusername/ac-website:1.0.0
docker push yourusername/ac-website:1.0.0
```

### STEP 4: Deploy on Server

```bash
# 1. Upload files to server
scp -r . root@your_server_ip:/home/ac-website

# 2. SSH into server
ssh root@your_server_ip

# 3. Navigate to project
cd /home/ac-website

# 4. Start containers
docker-compose up -d

# 5. Verify
docker-compose ps
```

### STEP 5: Setup Reverse Proxy (Nginx)

```bash
# Install Nginx
apt install -y nginx

# Create nginx config
cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80;
    server_name airprocooling.com www.airprocooling.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable nginx
systemctl is-enabled nginx || systemctl enable nginx
systemctl restart nginx
```

### STEP 6: Setup SSL (Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Generate certificate
certbot certonly --nginx -d airprocooling.com -d www.airprocooling.com

# Update Nginx for SSL
cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80;
    server_name airprocooling.com www.airprocooling.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name airprocooling.com www.airprocooling.com;
    
    ssl_certificate /etc/letsencrypt/live/airprocooling.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/airprocooling.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Restart Nginx
systemctl restart nginx

# Auto-renew certificate
certbot renew --dry-run
```

### STEP 7: Setup Domain DNS

1. Go to your domain provider
2. Point to VPS IP address (A record)
3. Wait 15-30 minutes for DNS propagation

### VERIFICATION ✅

```bash
# Check running containers
docker-compose logs -f app

# Check nginx
systemctl status nginx

# Check SSL
curl -I https://airprocooling.com
```

---

## 🌐 DEPLOYMENT: NETLIFY

**Alternative to Vercel, very similar process**

### Quick Steps:

1. **Connect GitHub** to Netlify (netlify.com)
2. **Select repository**
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Environment variables**: Add from .env.example
5. **Deploy site**
6. **Add domain**: Connect your DNS

---

## 🔐 POST-DEPLOYMENT VERIFICATION

### Immediate Checks (5 minutes)

```bash
# 1. Check site loads
curl -I https://airprocooling.com
# Should see: HTTP/2 200

# 2. Check HTTPS works
# Open in browser - should see 🔒 lock icon

# 3. Check API works
curl https://airprocooling.com/api/bookings
# Should return JSON array

# 4. Check sitemap
curl https://airprocooling.com/sitemap.xml
# Should return XML
```

### Comprehensive Testing (15 minutes)

- [ ] Home page loads (check all sections)
- [ ] About page accessible
- [ ] Services page with pricing visible
- [ ] Contact form works (test submission)
- [ ] Booking form works (test submission)
- [ ] Mobile menu responsive
- [ ] All navigation links work
- [ ] External links (WhatsApp, phone) work
- [ ] No 404 errors
- [ ] No console errors (F12)
- [ ] Map displays
- [ ] Footer content visible
- [ ] Favicon shows
- [ ] Page title correct in browser tab
- [ ] Meta descriptions showing (inspect)

### Performance Check (5 minutes)

```bash
# Use these free tools:
1. Google PageSpeed Insights
   https://pagespeed.web.dev/

2. GTmetrix
   https://gtmetrix.com/

3. WebPageTest
   https://www.webpagetest.org/

Target Metrics:
- Page load time: < 3 seconds
- Lighthouse score: > 80
- Core Web Vitals: Green
```

---

## 🎯 MONITORING & MAINTENANCE

### Setup Monitoring

1. **Uptime Monitoring** (Free options):
   - StatusCage: statuspage.io
   - UptimeRobot: uptimerobot.com
   - Pingdom

2. **Error Tracking**:
   - Sentry (free tier)
   - LogRocket (free tier)

3. **Analytics**:
   - Google Analytics (free)
   - Already configured in your site

### Regular Maintenance

```bash
# Weekly
- Monitor error logs
- Check uptime status
- Review analytics

# Monthly
- Update dependencies: npm update
- Run security audit: npm audit
- Check backup status

# Quarterly
- Update packages: npm update --depth=3
- Review security: npm audit fix
- Performance optimization
```

---

## 📞 COMMON ISSUES & FIXES

### Issues After Deployment

**Q: Site shows "502 Bad Gateway"**
- Check if MongoDB connection string is correct
- Verify .env variables are set
- Check server logs: `docker logs` or check hosting dashboard

**Q: Domain shows parking page**
- DNS not propagated yet (wait 15-30 mins)
- Or DNS records not updated correctly
- Go to domain provider and update nameservers

**Q: SSL certificate error**
- Certificate not fully set up yet (wait a few minutes)
- Or domain not properly configured
- Check certificate status in hosting dashboard

**Q: API calls failing**
- Check MONGODB_URI is correct
- Verify MongoDB Atlas IP whitelist
- Check error logs in hosting dashboard

**Q: Images not loading**
- Check image paths
- Verify public folder uploaded
- Check image optimization settings

**Q: Mobile menu not working**
- Check for JavaScript errors (F12)
- Clear browser cache (Ctrl+Shift+Del)
- Test in different browser

---

## ✨ YOU'RE LIVE!

Congratulations! Your website is now live. 🎉

### Next Steps:

1. **Announce to customers**
   - Email list
   - WhatsApp broadcast
   - Social media
   - Local advertising

2. **Monitor performance**
   - Check analytics daily for first week
   - Monitor uptime
   - Fix any reported issues quickly

3. **Gather feedback**
   - Ask customers for reviews
   - Monitor contact form submissions
   - Track booking volume

4. **Plan improvements**
   - Gather customer feedback
   - Plan new features
   - Optimize based on usage

---

## 📚 HELPFUL RESOURCES

- **Ver­cel Docs**: vercel.com/docs
- **Next.js Docs**: nextjs.org/docs
- **MongoDB Docs**: docs.mongodb.com
- **Docker Docs**: docs.docker.com
- **Nginx Docs**: nginx.org/en/docs/
- **Let's Encrypt**: letsencrypt.org

---

**Questions?** Refer to PRODUCTION_READY.md or check the specific platform's documentation.

**Ready to deploy? Let's go! 🚀**

*Last Updated: May 12, 2026*
