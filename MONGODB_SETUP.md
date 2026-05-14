# MongoDB Setup Guide

## Quick Setup with MongoDB Atlas (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up for Free"
3. Create your account with email and password

### Step 2: Create a Free Cluster
1. After login, click "Create" to create a new project
2. Name it "AC Booking" (or any name you prefer)
3. Click "Create Project"
4. Click "Create Deployment" → Select "Free Tier"
5. Choose "AWS" as provider and a region close to you
6. Click "Create Deployment"
7. Wait for the cluster to be created (usually 1-3 minutes)

### Step 3: Get Connection String
1. In your cluster, click "Connect"
2. Choose "Drivers" tab
3. Select "Node.js" as the driver
4. Copy the connection string (it should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Make sure "Built-in Role" is set to "Read and write to any database"
5. Click "Add User"

### Step 5: Update Connection String
1. Replace `<username>` with the database user you just created
2. Replace `<password>` with the password
3. Change the database name from `?` to something like `ac_booking`
4. Final URL should look like:
   ```
   mongodb+srv://myuser:mypassword@cluster0.mongodb.net/ac_booking?retryWrites=true&w=majority
   ```

### Step 6: Add Connection String to .env.local
1. Open `.env.local` file in your project
2. Replace `your_mongodb_connection_string_here` with your actual connection string
3. Save the file

### Step 7: Restart Development Server
1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev`
3. Your bookings will now be saved to MongoDB!

## Alternative: Local MongoDB (Advanced)
If you prefer to run MongoDB locally instead of using Atlas:
1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Install and follow installation instructions
3. Default connection string: `mongodb://localhost:27017/ac_booking`

---

## Troubleshooting

### "Unable to connect to MongoDB"
- Check your connection string in `.env.local`
- Make sure your IP address is whitelisted in MongoDB Atlas (Network Access)
- Verify your database user credentials

### "Connection refused"
- Make sure MongoDB service is running
- Check if your internet connection is working

### Still having issues?
- Check the server logs in your terminal
- Review the MongoDB documentation: https://docs.mongodb.com/
