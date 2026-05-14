# Docker Setup Guide for AC Website

## What is Docker?
Docker creates a completely isolated environment for your project. Everything runs inside a container - Node.js, npm packages, environment variables - separated from your main system.

## Prerequisites
1. **Download Docker Desktop**: https://www.docker.com/products/docker-desktop
2. Install it and follow the setup prompts
3. Restart your computer

## How to Run Your Project in Docker

### Option 1: Using Docker Compose (Recommended & Easiest)

```bash
# Navigate to your project folder
cd c:\Users\AYUSH\OneDrive\Desktop\ac website

# Start the Docker container
docker-compose up

# Your website will be available at: http://localhost:3000
```

That's it! Docker will:
- Download Node.js 18
- Install all dependencies
- Start your development server
- Keep everything isolated

### Option 2: Using Docker Directly

```bash
# Build the Docker image
docker build -t ac-website .

# Run the Docker container
docker run -p 3000:3000 -v %cd%:/app ac-website

# Access at: http://localhost:3000
```

## Stopping the Container

```bash
# Press Ctrl+C in the terminal

# Or if running in background:
docker-compose down
```

## Viewing Logs

```bash
# See what's happening inside the container
docker-compose logs -f

# Or for a specific service
docker-compose logs -f app
```

## Adding MongoDB to Docker

To run MongoDB inside Docker too (optional), uncomment the MongoDB service in `docker-compose.yml`:

```yaml
mongodb:
  image: mongo:6
  ports:
    - "27017:27017"
  volumes:
    - mongo_data:/data/db
```

Then use this connection string in `.env.local`:
```
MONGODB_URI=mongodb://mongodb:27017/ac_booking
```

## Common Commands

```bash
# See running containers
docker ps

# Stop all containers
docker-compose down

# Remove unused images/containers
docker system prune

# View container details
docker inspect <container_name>

# Execute command inside container
docker exec -it <container_name> npm run build
```

## Advantages of Docker

✅ **Complete Isolation** - Project won't interfere with other projects
✅ **Consistent Environment** - Same setup on any computer
✅ **Easy Deployment** - Push to cloud with same Docker container
✅ **Version Control** - Everyone uses same Node/package versions
✅ **Clean System** - No installation clutter on your PC
✅ **Perfect for Teams** - Team members get identical setup

## Troubleshooting

### "docker: command not found"
- Docker Desktop is not installed or not in PATH
- Restart your terminal after installing Docker

### "Port 3000 is already in use"
- Change port mapping in `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:3000"  # Use 3001 instead
  ```

### "Cannot connect to Docker daemon"
- Docker Desktop is not running
- Start Docker Desktop application

### Need to rebuild after code changes?
- Exit container (Ctrl+C)
- Run `docker-compose up` again
- Or enable live reload with volume mounting (already configured)

## Next Steps

1. **Start Docker Desktop** (it should run automatically)
2. Open terminal in your project folder
3. Run: `docker-compose up`
4. Visit: http://localhost:3000

That's all! Your AC website is now running in a completely isolated Docker environment.
