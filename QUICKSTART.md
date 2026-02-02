# 🚀 Quick Start Guide - 101 Dress

## ⚡ TL;DR

### First Time Setup

```bash
# 1. Clone and navigate
git clone <your-repo>
cd 101-dress

# 2. Backend Setup
cd backend
cp .env.example .env
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m backend.main

# 3. Frontend Setup (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8001
- API Docs: http://localhost:8001/docs

---

## 🌐 Deploy to Production

### Backend (Render)
1. Create account at [Render](https://render.com)
2. New → Web Service → Connect GitHub
3. Root: `backend`, Start: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables from `backend/.env.example`
5. Deploy ✅

### Frontend (Netlify)
1. Create account at [Netlify](https://netlify.com)
2. New Site → Connect GitHub
3. Base: `frontend`, Build: `npm run build`, Publish: `dist`
4. Add: `VITE_API_URL=<your-backend-url>`
5. Deploy ✅

**Don't forget:** Update `CORS_ORIGINS` in backend with your frontend URL!

---

## 🔧 Environment Variables

### Backend (.env)
```env
SECRET_KEY=<generate-random-key>
DATABASE_URL=<postgresql-url-for-production>
CORS_ORIGINS=https://your-frontend.netlify.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 📖 Full Documentation

- **Deployment**: See `DEPLOYMENT.md`
- **Changes Made**: See `REFACTORING_SUMMARY.md`
- **Backend Details**: See `backend/README.md`
- **Frontend Details**: See `frontend/README.md`

---

## 🆘 Common Issues

**CORS Error?**
→ Check `CORS_ORIGINS` in backend matches your frontend URL exactly

**Can't connect to backend?**
→ Verify `VITE_API_URL` in frontend .env is correct

**Database error?**
→ For production, use PostgreSQL URL, not SQLite

---

**Happy coding! 🎉**
