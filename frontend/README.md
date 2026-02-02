# 👗 101 Dresses - Frontend
### A Trust-First Resale Platform for Occasion Wear

---

## Environment Variables

Copy `.env.example` to `.env` and update with your backend API URL:

```bash
cp .env.example .env
```

Required environment variables:
- `VITE_API_URL` - Backend API base URL (e.g., `http://localhost:8001` for local, `https://your-backend.onrender.com` for production)

---

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your backend URL:
```bash
VITE_API_URL=http://localhost:8001
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

---

## Deployment

### Netlify

1. Connect your GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)
4. Deploy

### Vercel

1. Connect your GitHub repository
2. Vercel will auto-detect Vite settings
3. Add environment variable:
   - `VITE_API_URL`: Your backend URL
4. Deploy

---

## Tech Stack

- React 18
- TypeScript
- Vite
- TanStack Query
- React Router
- Tailwind CSS
- Radix UI Components

---

## 📌 Problem Statement

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

Client Apps (Web / Mobile)
│
├── Buyer Interface
├── Seller Interface
│
└── Platform Backend
    ├── Authentication & KYC Service
    ├── Product & Listing Service
    ├── Escrow & Payment Service
    ├── Logistics Coordination Service
    ├── Media Evidence Storage
    ├── Trust Score Engine
    ├── Dispute Resolution Engine
    └── Notification & Chatbot Service


---

## 🔄 Transaction Flow

1. Seller lists dress (photos + details)
2. Buyer browses and bargains
3. Buyer pays 10% advance as security fund
4. Platform schedules pickup
5. Pickup video & condition check from the seller's location
6. Item dual verified at platform hub
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

## 🏁 Conclusion

**101 Dresses** solves the core reason fashion resale platforms fail — lack of trust.

By owning the transaction instead of just listing it, we make fashion resale **safe, fair, and scalable**.
