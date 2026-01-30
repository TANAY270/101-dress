import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  RotateCcw,
  ShieldCheck,
  Camera,
  Package,
  DollarSign,
  User,
  PlusCircle,
  Search,
  CheckCircle,
  AlertCircle,
  Video,
  Truck,
  Gavel,
  ArrowRight,
  Sun,
  Moon,
  X
} from 'lucide-react';

// --- MOCK DATA ---

const MOCK_USER = {
  id: 'u1',
  name: 'Alex Rivera',
  trustScore: 92, // High score
  walletBalance: 45000,
  escrowBalance: 12500, // Money locked in platform
  avatar: 'https://i.pravatar.cc/150?u=u1'
};

const INVENTORY = [
  {
    id: 'i1',
    title: 'Acne Studios Leather Jacket',
    category: 'Jackets',
    brand: 'Acne Studios',
    size: 'M',
    condition: 'A', // Verified by platform
    type: 'both', // sale, rent, both
    salePrice: 28500,
    rentPrice: 1500,
    deposit: 8000,
    image: 'https://images.unsplash.com/photo-1551028919-ac76c9085918?auto=format&fit=crop&q=80&w=1000',
    status: 'live', // live, processing, rented
    verified: true
  },
  {
    id: 'i2',
    title: 'Zimmermann Silk Dress',
    category: 'Dresses',
    brand: 'Zimmermann',
    size: 'S',
    condition: 'A',
    type: 'rent',
    salePrice: null,
    rentPrice: 3200,
    deposit: 10000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000',
    status: 'live',
    verified: true
  },
  {
    id: 'i3',
    title: 'Gucci Horsebit Loafers',
    category: 'Sneakers', // categorized broadly for footwear
    brand: 'Gucci',
    size: '42',
    condition: 'B',
    type: 'sale',
    salePrice: 18000,
    rentPrice: null,
    deposit: null,
    image: 'https://images.unsplash.com/photo-1603145733190-59811e523c72?auto=format&fit=crop&q=80&w=1000',
    status: 'live',
    verified: true
  },
  {
    id: 'i4',
    title: 'Prada Nylon Mini Bag',
    category: 'Bags',
    brand: 'Prada',
    size: 'One Size',
    condition: 'A',
    type: 'rent',
    salePrice: null,
    rentPrice: 2100,
    deposit: 5000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
    status: 'live',
    verified: true
  },
  {
    id: 'i5',
    title: 'Burberry Trench Coat',
    category: 'Jackets',
    brand: 'Burberry',
    size: 'L',
    condition: 'B',
    type: 'sale',
    salePrice: 35000,
    rentPrice: null,
    deposit: null,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
    status: 'live',
    verified: true
  }
];

const MY_ORDERS = [
  {
    id: 'o1',
    itemTitle: 'Burberry Trench Coat',
    type: 'rent',
    status: 'active_rental', // active_rental, shipped, delivered, dispute, closed
    daysRemaining: 2,
    depositLocked: 15000,
    actionRequired: 'Prepare Return',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'o2',
    itemTitle: 'Off-White Hoodie',
    type: 'buy',
    status: 'delivered',
    escrowAmount: 12500,
    actionRequired: 'Upload Unboxing Video', // Key feature
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=200'
  }
];

const MY_LISTINGS = [
  {
    id: 'l1',
    title: 'Prada Nylon Bag',
    status: 'awaiting_pickup', // ingestion pipeline
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=200'
  }
];

// --- COMPONENTS ---

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    amber: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    gray: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[color] || colors.gray}`}>
      {children}
    </span>
  );
};

const TrustScore = ({ score }) => {
  let color = 'text-emerald-600 dark:text-emerald-400';
  if (score < 80) color = 'text-amber-600 dark:text-amber-400';
  if (score < 50) color = 'text-red-600 dark:text-red-400';

  return (
    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
      <ShieldCheck className={`w-4 h-4 ${color}`} />
      <div className="flex flex-col leading-none">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Trust Score</span>
        <span className={`text-sm font-bold ${color}`}>{score}/100</span>
      </div>
    </div>
  );
};

const ListingCard = ({ item, onAction }) => {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg dark:hover:shadow-slate-800/50 transition-all duration-300">
      <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {item.verified && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm dark:text-slate-200">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            Platform Verified
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {item.type !== 'rent' && <Badge color="blue">For Sale</Badge>}
          {item.type !== 'sale' && <Badge color="purple">For Rent</Badge>}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{item.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.brand} • Size {item.size}</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-medium text-slate-600 dark:text-slate-300">
            Cond. {item.condition}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {(item.type === 'both' || item.type === 'sale') && (
            <button onClick={() => onAction('buy', item)} className="w-full flex justify-between items-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
              <span className="text-sm font-medium">Buy Now</span>
              <span className="font-bold">₹{item.salePrice?.toLocaleString()}</span>
            </button>
          )}

          {(item.type === 'both' || item.type === 'rent') && (
            <button onClick={() => onAction('rent', item)} className="w-full flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
              <span className="text-sm font-medium">Rent / Day</span>
              <div className="text-right leading-none">
                <span className="font-bold block">₹{item.rentPrice?.toLocaleString()}</span>
                <span className="text-[10px] opacity-70">+₹{item.deposit?.toLocaleString()} deposit</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SellerWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    mode: 'both', // sale, rent, both
    salePrice: '',
    rentPrice: '',
  });

  // Mock Pricing Intelligence
  const suggestedRent = formData.salePrice ? Math.round(formData.salePrice * 0.05) : 0;
  const suggestedDeposit = formData.salePrice ? Math.round(formData.salePrice * 0.25) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">List an Item</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Step {step} of 3: {step === 1 ? 'Details' : step === 2 ? 'Pricing' : 'Custody Handover'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Upload Photos</span>
                <span className="text-xs text-slate-400 text-center mt-1">Front, Back, Label, Defects</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Item Name</label>
                <input
                  type="text"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-slate-100"
                  placeholder="e.g. Vintage Leather Jacket"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Brand</label>
                  <input type="text" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-900 dark:text-slate-100" placeholder="Brand name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size</label>
                  <input type="text" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-900 dark:text-slate-100" placeholder="Size" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Listing Mode</label>
                <div className="grid grid-cols-3 gap-3">
                  {['sale', 'rent', 'both'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setFormData({ ...formData, mode: m })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border capitalize transition-colors ${formData.mode === m
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {(formData.mode === 'sale' || formData.mode === 'both') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              )}

              {(formData.mode === 'rent' || formData.mode === 'both') && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-center gap-2 mb-3">
                    <RotateCcw className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Rental Smart Pricing</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-indigo-800 dark:text-indigo-300 mb-1">Daily Rate</label>
                      <input
                        type="number"
                        placeholder={suggestedRent || 0}
                        className="w-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg px-3 py-2 outline-none text-indigo-900 dark:text-indigo-200"
                      />
                      <span className="text-[10px] text-indigo-500 dark:text-indigo-400">Rec: ₹{suggestedRent}</span>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-indigo-800 dark:text-indigo-300 mb-1">Security Deposit</label>
                      <input
                        type="number"
                        placeholder={suggestedDeposit || 0}
                        className="w-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg px-3 py-2 outline-none text-indigo-900 dark:text-indigo-200"
                      />
                      <span className="text-[10px] text-indigo-500 dark:text-indigo-400">Rec: ₹{suggestedDeposit}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Platform Verification Required</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-left bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                To ensure trust, you must send this item to our fulfillment center. We will verify authenticity, record condition (A/B/C), and store it securely.
              </p>
              <div className="flex flex-col gap-2 text-sm text-left px-4 text-slate-700 dark:text-slate-300">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200">1</div>
                  <span>We schedule a pickup courier.</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200">2</div>
                  <span>We film condition & verify.</span>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200">3</div>
                  <span>Listing goes Live.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-200/50"
            >
              Schedule Pickup & Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('browse'); // browse, orders, profile
  const [showListingWizard, setShowListingWizard] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await fetch(`${API_URL}/items`);
        const itemsData = await itemsRes.json();
        setInventory(itemsData);

        const userRes = await fetch(`${API_URL}/users/u1`);
        const userData = await userRes.json();
        setUser(userData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const CATEGORIES = ['All', 'Jackets', 'Dresses', 'Sneakers', 'Bags', 'Accessories'];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Filter Logic
  const filteredInventory = inventory.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-20 md:pb-0 transition-colors duration-200">

        {/* --- HEADER --- */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('browse')}>
              <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold text-xl">
                C
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block dark:text-white">Custody<span className="text-emerald-500">.</span></span>
            </div>

            <div className="flex items-center gap-6">

              {/* Desktop Search Bar */}
              <div className={`hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5 transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-slate-500 dark:text-slate-400">
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search items..."
                    className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-400"
                    autoFocus
                  />
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400"
              >
                <Search className="w-5 h-5" />
              </button>

              <div className="hidden md:flex items-center gap-4">
                {/* Trust score removed from header on Desktop to declutter, effectively moving it to profile as primary location */}
                {/* <TrustScore score={MOCK_USER.trustScore} /> */}

                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Wallet</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">₹{user?.wallet_balance.toLocaleString() || 0}</span>
                </div>
                <div className="flex flex-col items-end border-l border-slate-100 dark:border-slate-800 pl-4">
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    In Escrow <DollarSign className="w-3 h-3" />
                  </span>
                  <span className="text-sm font-bold text-slate-400">₹{user?.escrow_balance.toLocaleString() || 0}</span>
                </div>
              </div>

              <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 transition-colors">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowListingWizard(true)}
                className="hidden md:flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                List Item
              </button>
              <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="Profile" className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 cursor-pointer" onClick={() => setView('profile')} />
            </div>
          </div>

          {/* Mobile Search Input (Visible when toggled) */}
          {isSearchOpen && (
            <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands, items..."
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-4 py-2 outline-none text-slate-900 dark:text-slate-100"
                autoFocus
              />
            </div>
          )}
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="max-w-7xl mx-auto px-4 py-8">

          {view === 'browse' && (
            <>
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              {filteredInventory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredInventory.map(item => (
                    <ListingCard
                      key={item.id}
                      item={item}
                      onAction={(type, item) => alert(`Mock Flow: Initiating ${type} flow for ${item.title}. Money will be moved to Escrow.`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-slate-400 dark:text-slate-600">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No items found matching your search.</p>
                </div>
              )}
            </>
          )}

          {view === 'orders' && (
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Active Transactions</h2>

              <div className="space-y-4">
                {MY_ORDERS.map(order => (
                  <div key={order.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-4 flex gap-4">
                      <img src={order.image} alt="" className="w-20 h-24 object-cover rounded-md bg-slate-100 dark:bg-slate-800" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge color={order.type === 'rent' ? 'purple' : 'blue'}>
                                {order.type === 'rent' ? 'Rental' : 'Purchase'}
                              </Badge>
                              <span className="text-xs text-slate-400">Order #{order.id}</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{order.itemTitle}</h3>
                          </div>
                          {order.status === 'delivered' && (
                            <div className="flex flex-col items-end">
                              <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">Escrow Locked</span>
                            </div>
                          )}
                        </div>

                        {/* Dynamic Action Area based on status */}
                        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                          <div className="flex items-center gap-2">
                            {order.status === 'delivered' ? (
                              <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Status: {order.status.replace('_', ' ').toUpperCase()}</span>
                              {order.type === 'rent' && <span className="text-[10px] text-slate-500 dark:text-slate-400">{order.daysRemaining} days remaining</span>}
                            </div>
                          </div>

                          {order.actionRequired === 'Upload Unboxing Video' && (
                            <button className="flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-3 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm animate-pulse">
                              <Video className="w-3 h-3" />
                              Record Unboxing
                            </button>
                          )}

                          {order.actionRequired === 'Prepare Return' && (
                            <button className="flex items-center gap-2 bg-indigo-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-indigo-700 shadow-sm">
                              <RotateCcw className="w-3 h-3" />
                              Schedule Return
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Escrow Visualizer */}
                    <div className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Platform Protection Active
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        Funds Held: ₹{(order.depositLocked || order.escrowAmount)?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12">My Listings Pipeline</h2>
              <div className="space-y-4">
                {MY_LISTINGS.map(listing => (
                  <div key={listing.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 opacity-75">
                    <img src={listing.image} className="w-16 h-16 rounded-lg object-cover grayscale" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{listing.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-amber-600 font-medium">
                        <Truck className="w-4 h-4" />
                        Awaiting Platform Pickup
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md">View Instructions</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'profile' && user && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
              <div className="bg-slate-900 dark:bg-slate-800 h-32 relative">
                <div className="absolute -bottom-10 left-8">
                  <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900" />
                </div>
              </div>
              <div className="pt-12 px-8 pb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400">Member since 2024</p>
                  </div>
                  {/* Trust Score in Profile - High Visibility */}
                  <div className="flex flex-col items-end">
                    <TrustScore score={user.trust_score} />
                    <span className="text-[10px] text-slate-400 mt-1">Verified ID • 12 Transactions</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800">
                    <div className="text-emerald-800 dark:text-emerald-400 text-sm font-medium mb-1">Available Balance</div>
                    <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">₹{user.wallet_balance.toLocaleString()}</div>
                    <button className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium hover:underline">Withdraw</button>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800">
                    <div className="text-amber-800 dark:text-amber-400 text-sm font-medium mb-1">Locked in Escrow</div>
                    <div className="text-2xl font-bold text-amber-900 dark:text-amber-300">₹{user.escrow_balance.toLocaleString()}</div>
                    <div className="mt-2 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <Gavel className="w-3 h-3" />
                      Pending 1 Completion
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Trust Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Dispute Rate</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">0% (Excellent)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Avg Shipping Time</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">1.2 Days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Return Condition Match</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* --- MOBILE NAV --- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50 safe-area-bottom">
          <button onClick={() => setView('browse')} className={`flex flex-col items-center ${view === 'browse' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            <ShoppingBag className="w-6 h-6" />
            <span className="text-[10px] mt-1">Browse</span>
          </button>
          <button onClick={() => setShowListingWizard(true)} className="flex flex-col items-center text-slate-400">
            <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full p-3 -mt-6 shadow-lg border-4 border-slate-50 dark:border-slate-800">
              <PlusCircle className="w-6 h-6" />
            </div>
          </button>
          <button onClick={() => setView('orders')} className={`flex flex-col items-center ${view === 'orders' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            <Package className="w-6 h-6" />
            <span className="text-[10px] mt-1">Orders</span>
          </button>
        </nav>

        {showListingWizard && <SellerWizard onClose={() => setShowListingWizard(false)} />}
      </div>
    </div>
  );
}