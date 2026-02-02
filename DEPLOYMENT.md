# 🚀 Deployment Guide for 101 Dress

## 📋 Overview

This guide will help you deploy the 101 Dress platform with:
- **Frontend**: Netlify or Vercel
- **Backend**: Render or Railway
- **Database**: PostgreSQL (managed by Render/Railway)

---

## 🎯 Pre-Deployment Checklist

### Backend
- [ ] Create a strong SECRET_KEY for JWT
- [ ] Set up PostgreSQL database
- [ ] Configure CORS_ORIGINS with your frontend URL
- [ ] Review environment variables in `.env.example`

### Frontend
- [ ] Set VITE_API_URL to your backend URL
- [ ] Test build locally with `npm run build`
- [ ] Verify all API calls use environment variables

---

## 🔧 Backend Deployment (Render)

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New** → **PostgreSQL**
3. Name: `101-dress-db`
4. Plan: Free (or choose paid for production)
5. Create database and copy the **Internal Database URL**

### Step 2: Deploy Backend Service

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure settings:
   - **Name**: `101-dress-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

4. Add Environment Variables:
   ```
   SECRET_KEY=<generate-strong-random-key>
   DATABASE_URL=<your-postgresql-url-from-step-1>
   CORS_ORIGINS=https://your-frontend.netlify.app
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=600
   UPLOAD_DIR=uploads
   ```

5. Click **Create Web Service**

### Step 3: Verify Deployment

- Visit: `https://your-backend.onrender.com/docs`
- You should see the FastAPI Swagger documentation

---

## 🎨 Frontend Deployment (Netlify)

### Step 1: Build Configuration

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub repository

### Step 2: Configure Build Settings

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

### Step 3: Environment Variables

Add in Netlify dashboard:
```
VITE_API_URL=https://your-backend.onrender.com
```

### Step 4: Deploy

- Click **Deploy site**
- Netlify will build and deploy automatically
- Get your site URL: `https://your-site.netlify.app`

### Step 5: Update Backend CORS

Go back to Render and update `CORS_ORIGINS`:
```
CORS_ORIGINS=https://your-site.netlify.app
```

---

## 🚂 Alternative: Backend on Railway

### Step 1: Create New Project

1. Go to [Railway Dashboard](https://railway.app/)
2. Click **New Project**
3. Choose **Deploy from GitHub repo**
4. Select your repository

### Step 2: Configure

1. Set root directory to `backend`
2. Railway will auto-detect Python and use `railway.toml`

### Step 3: Add Database

1. In Railway project, click **New**
2. Select **Database** → **PostgreSQL**
3. Railway will auto-inject `DATABASE_URL`

### Step 4: Environment Variables

Add these variables:
```
SECRET_KEY=<generate-strong-random-key>
CORS_ORIGINS=https://your-frontend.netlify.app
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=600
UPLOAD_DIR=uploads
```

### Step 5: Deploy

- Railway deploys automatically on push
- Get your backend URL from the dashboard

---

## 🎨 Alternative: Frontend on Vercel

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository

### Step 2: Configure

- **Root Directory**: `frontend`
- Vercel auto-detects Vite settings

### Step 3: Environment Variables

Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend.onrender.com
```

### Step 4: Deploy

- Click **Deploy**
- Vercel builds and deploys automatically

---

## 🔐 Security Best Practices

### Generate Strong SECRET_KEY

```bash
# Python method
python -c "import secrets; print(secrets.token_urlsafe(32))"

# OpenSSL method
openssl rand -base64 32
```

### CORS Configuration

Only allow your frontend domain:
```
CORS_ORIGINS=https://your-exact-domain.netlify.app
```

Never use `*` in production!

### Database Backup

- Render/Railway provide automatic backups on paid plans
- For critical data, set up additional backup strategy

---

## 📊 Monitoring & Logs

### Backend Logs (Render)
- Dashboard → Your Service → Logs
- Real-time log streaming
- Filter by error levels

### Frontend Logs (Netlify)
- Dashboard → Site → Deploys → Deploy log
- Function logs if using serverless functions

---

## 🐛 Troubleshooting

### CORS Errors

**Symptom**: Frontend can't connect to backend
**Solution**: 
- Verify `CORS_ORIGINS` includes your exact frontend URL
- Restart backend service after changing env vars

### Database Connection Issues

**Symptom**: Backend fails to start
**Solution**:
- Verify `DATABASE_URL` is correct
- Check database is running
- Review backend logs

### Build Failures

**Frontend**:
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Test `npm run build` locally

**Backend**:
- Check Python version (should be 3.11+)
- Verify all dependencies are in `requirements.txt`
- Test locally with production DATABASE_URL

### Environment Variables Not Loading

**Solution**:
- Clear build cache and redeploy
- Verify variable names match exactly
- Check for typos in `.env.example` vs actual usage

---

## 📈 Post-Deployment

### Update Backend CORS
After frontend deployment, update backend `CORS_ORIGINS` with actual frontend URL.

### Test End-to-End
1. Visit frontend URL
2. Test user registration/login
3. Test listing creation
4. Test image upload
5. Verify API responses

### Set Up Custom Domains (Optional)

**Netlify**:
- Dashboard → Domain settings → Add custom domain

**Render**:
- Dashboard → Settings → Custom domain

---

## 🔄 Continuous Deployment

Both Netlify and Render/Railway support automatic deployment:

1. Push to `main` branch
2. Platform detects changes
3. Automatic build and deploy
4. Zero downtime deployment

---

## 💡 Tips

- Use separate environments: `dev`, `staging`, `production`
- Keep `.env.example` updated with all required variables
- Never commit `.env` files to git
- Monitor usage and costs regularly
- Set up status monitoring (e.g., UptimeRobot)

---

## 📞 Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check platform status pages:
   - [Netlify Status](https://www.netlifystatus.com/)
   - [Render Status](https://status.render.com/)
   - [Railway Status](https://railway.statuspage.io/)

---

**Happy Deploying! 🚀**
