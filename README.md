# 👗 101 Dresses  
### A Trust-First Resale Platform for Occasion Wear

---

## � Project Structure

```
101-dress/
├── frontend/          # React + TypeScript + Vite frontend
├── backend/           # FastAPI Python backend
└── README.md          # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.11+ (for backend)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd 101-dress
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Then run the server
python -m backend.main
```

Backend will run at `http://localhost:8001`

API Documentation: `http://localhost:8001/docs`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env and set VITE_API_URL=http://localhost:8001
# Then run the dev server
npm run dev
```

Frontend will run at `http://localhost:5173`

---

## 🌐 Deployment

### Frontend (Netlify/Vercel)

**Netlify:**
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Base directory: `frontend`
3. Environment variables:
   - `VITE_API_URL`: Your backend URL
4. Deploy

**Vercel:**
1. Connect GitHub repository
2. Root directory: `frontend`
3. Environment variables:
   - `VITE_API_URL`: Your backend URL
4. Deploy

### Backend (Render/Railway)

**Render:**
1. Connect GitHub repository
2. Root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. Environment variables:
   - `SECRET_KEY`: Generate a strong secret key
   - `DATABASE_URL`: PostgreSQL connection string
   - `CORS_ORIGINS`: Your frontend URL
   - `ALGORITHM`: HS256
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: 600
6. Deploy

**Railway:**
1. Connect GitHub repository
2. Root directory: `backend`
3. Environment variables (same as Render)
4. Deploy automatically using `railway.toml`

---

## �📌 Problem Statement

Most fashion resale platforms fail due to:
- Fake returns and item swapping
- False damage claims
- Unsafe and premature payments
- Emotion-based disputes
- No control over logistics

These issues break seller trust and make resale of high-value dresses unsafe.

---

## 💡 Our Solution

**101 Dresses** is a secure resale platform for **wedding, festive, and party wear** that **controls the entire transaction lifecycle**.

We prevent fraud by controlling:
- **Custody** (platform-managed pickup & delivery)
- **Money** (escrow-based payments)
- **Evidence** (mandatory videos and photos)

> If the platform controls custody, money, and proof — fraud becomes irrational.

---

## 🎯 Platform Goals

- Prevent theft and return abuse
- Protect both buyers and sellers
- Resolve disputes using proof, not opinions
- Build trust in high-value fashion resale

---

## 🏗️ System Architecture (High-Level)

Buyer App / Seller App
│
▼
Platform Backend
├── Listings & Users
├── Escrow & Payments
├── Logistics Coordination
├── Media Evidence Storage
├── Trust Score Engine
└── Dispute Resolution
│
▼
Verified Delivery Partner


---

## 🔄 Transaction Flow

1. Seller lists dress (photos + details)
2. Buyer browses and bargains
3. Buyer pays 10% advance
4. Platform schedules pickup
5. Pickup video & condition check
6. Item verified at platform hub
7. Delivered to buyer
8. Buyer records unboxing video
9. 24–48 hour inspection window
10. Escrow released or dispute raised

---

## 🔐 Theft & Fraud Prevention

- No direct seller-to-buyer shipping
- Mandatory pickup and unboxing videos
- Tamper-proof packaging with QR
- Time-limited inspection window
- Evidence-only dispute resolution
- Forced sale if buyer keeps item
- Silent trust score enforcement

---

## 💰 Payment & Escrow Logic

- Buyer money locked in escrow
- Released after:
  - Buyer approval OR
  - Inspection window expiry
- Refunds allowed only for:
  - Item mismatch
  - Undisclosed damage

---

## 🧠 Smart Features

- AI-based dress recommendations
- Smart bargaining assistance
- Seller trust score system
- Wallet for partial refunds
- AI chatbot for user support

---

## 🚀 MVP Features (Hackathon Scope)

### Must-Have
- Escrow system
- Platform pickup flow
- Unboxing video rule
- Inspection window
- Forced sale logic

### Nice-to-Have
- Trust score
- Partial refunds
- Seller payout delay

---

## 🏁 Conclusion

**101 Dresses** solves the core reason fashion resale platforms fail — lack of trust.

By owning the transaction instead of just listing it, we make fashion resale **safe, fair, and scalable**.
