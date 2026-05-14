# 🗄️ MongoDB Setup Guide for Hostinger Hosting

## ✅ Best Option: MongoDB Atlas (Free Tier)

For your Hostinger deployment, use **MongoDB Atlas** (cloud-hosted MongoDB) - it's free and reliable.

---

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Sign Up"**
3. Create account with email
4. Click **"Create a Deployment"**

---

## Step 2: Create Your First Cluster

1. Choose **"Free"** tier (M0)
2. Select region closest to India:
   - **Server**: US East Virginia or Europe Frankfurt
   - India server not available in free tier
3. Name cluster: `ac-website`
4. Click **"Create"**

Wait 1-2 minutes for cluster to initialize...

---

## Step 3: Create Database User

1. Go to **"Database Access"** tab
2. Click **"Add Database User"**
3. Fill in:
   - **Username**: `ac_admin`
   - **Password**: Use strong password (copy it!)
4. Click **"Create Database User"**

---

## Step 4: Whitelist IP Address

1. Go to **"Network Access"** tab
2. Click **"Add IP Address"**
3. Choose one:
   - **Option A**: Add Hostinger VPS IP (recommended)
     - Get your VPS IP from Hostinger dashboard
     - Click "Add Current IP Address"
   - **Option B**: Allow from anywhere (less secure, for testing)
     - Click "Whitelist Entry"
     - Enter `0.0.0.0/0`
4. Click **"Confirm"**

---

## Step 5: Get Connection String

1. Go to **"Clusters"** tab
2. Click **"Connect"** button
3. Choose **"Connect your application"**
4. Copy the connection string:

```
mongodb+srv://ac_admin:PASSWORD@ac-website.mongodb.net/ac-website?retryWrites=true&w=majority
```

Replace `PASSWORD` with your actual password.

---

## Step 6: Create Database

1. In Atlas dashboard, go to **"Collections"**
2. Click **"Create Database"**
3. Fill in:
   - **Database Name**: `ac-website`
   - **Collection Name**: `bookings`
4. Click **"Create"**

---

## Step 7: Add to Your .env.local

On your Hostinger VPS, edit `.env.local`:

```bash
nano /var/www/ac-website/.env.local
```

Add:
```
MONGODB_URI=mongodb+srv://ac_admin:YOUR_PASSWORD@ac-website.mongodb.net/ac-website?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with actual password.

Save: **Ctrl+X** → **Y** → **Enter**

---

## Step 8: Test Connection

SSH into your VPS:

```bash
cd /var/www/ac-website

# Test with Node
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected!');
  process.exit(0);
}).catch(err => {
  console.log('❌ Connection error:', err.message);
  process.exit(1);
});
" --require dotenv/config
```

If you see `✅ MongoDB connected!` you're good!

---

## 🔐 Security Best Practices

### 1. Strong Password
- Generate strong password (12+ characters)
- Use mix of uppercase, lowercase, numbers, special chars
- Don't share with anyone

### 2. IP Whitelist
- Only add Hostinger VPS IP (not 0.0.0.0/0 in production)
- You can add multiple IPs if needed

### 3. Monitor Activity
- Go to **"Activity"** tab in Atlas
- Check for unexpected access
- Review backups regularly

### 4. Enable Backup
- Go to **"Backup"** tab
- Enable automatic backups (free tier allows daily)
- Keep at least 7 days of backups

---

## 📊 MongoDB Atlas Free Tier Limits

| Feature | Limit | Enough For? |
|---------|-------|------------|
| Storage | 512 MB | ✅ Yes (bookings only) |
| Data Transfer | 10 GB/month | ✅ Yes |
| Connections | Up to 100 | ✅ Yes |
| Read/Write | Shared | ✅ Yes |

---

## 🚨 Troubleshooting

### Error: "Host is not allowed to connect"

**Solution**: Add VPS IP to Network Access whitelist

```bash
# Check your VPS IP
curl ifconfig.me
```

Then add this IP to MongoDB Atlas Network Access.

---

### Error: "Authentication failed"

**Solution**: Check password and username

- Verify username: `ac_admin`
- Verify password (must match exactly)
- Check for special characters needing URL encoding
  - `@` → `%40`
  - `#` → `%23`
  - `:` → `%3A`

Example if password is `Pass@123`:
```
mongodb+srv://ac_admin:Pass%40123@...
```

---

### Connection slow/timeout

**Solution**: 
1. Check network access (maybe VPS IP whitelist)
2. Try with direct connection string (not SRV)
3. Contact MongoDB support

---

## 📈 Scaling Later

If you outgrow free tier:

- **M2 Tier**: $9/month (3GB storage)
- **M5 Tier**: $57/month (10GB storage)
- **M10 Tier**: $95/month (40GB storage)

---

## 💾 Backup & Restore

### Automatic Backups (Free)
- Enabled by default
- Daily snapshots
- 7 days retention

### Manual Download
```bash
# From your computer (not VPS)
mongodump --uri="YOUR_MONGODB_URI"
```

---

## 🔗 Useful MongoDB Atlas Links

- Dashboard: https://cloud.mongodb.com
- Documentation: https://docs.atlas.mongodb.com
- Support: https://www.mongodb.com/support

---

## ✅ Final Check

After setup, verify:

- [ ] Cluster created (shows status "READY")
- [ ] Database user created
- [ ] IP whitelist configured (VPS IP added)
- [ ] Connection string copied
- [ ] Database `ac-website` created
- [ ] Collection `bookings` created
- [ ] Connection tested successfully
- [ ] .env.local updated with connection string
- [ ] Bookings API working

---

**MongoDB Atlas is now ready!** 🎉

Your bookings data will be safely stored in the cloud and accessible from your Hostinger VPS.
