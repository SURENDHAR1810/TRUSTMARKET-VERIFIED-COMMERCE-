import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replacing existing logic
import { useAuth } from '../context/AuthContext';
import {
    Search,
    ShoppingCart,
    MapPin,
    Video,
    Laptop,
    Shirt,
    Armchair,
    Watch,
    LayoutGrid,
    Sparkles,
    Dumbbell,
    Car,
    User,
    LogOut,
    LogIn
} from 'lucide-react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

// Define CategoryType locally or import if it was exported. It wasn't exported in original App.tsx so defining here.
type CategoryType = 'All' | 'Electronics' | 'Fashion' | 'Home' | 'Accessories' | 'Beauty' | 'Sports' | 'Automotive';

const Home: React.FC = () => {
    // State management extracted from App.tsx
    const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
    const [cartCount, setCartCount] = useState(0); // Note: This state is local to Home now. If Cart needs to persist, it should be in Context. For workshop demo, this might be acceptable reset on nav.

    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Helper to determine role (simple check based on email as per original App.tsx)
    const userRole = user?.email === 'agent@trustmarket.com' ? 'AGENT' : 'USER';

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // NOTE: Product Selection logic -> Navigate to /product/:id
    const handleProductSelect = (product: Product) => {
        navigate(`/product/${product.id}`);
    };

    const filteredProducts = MOCK_PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

    const categories = [
        { id: 'All', label: 'All', icon: LayoutGrid },
        { id: 'Electronics', label: 'Electronics', icon: Laptop },
        { id: 'Fashion', label: 'Fashion', icon: Shirt },
        { id: 'Home', label: 'Home', icon: Armchair },
        { id: 'Beauty', label: 'Beauty', icon: Sparkles },
        { id: 'Sports', label: 'Sports', icon: Dumbbell },
        { id: 'Automotive', label: 'Automotive', icon: Car },
        { id: 'Accessories', label: 'Accessories', icon: Watch },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#0f172a] text-slate-200">
            {/* Header */}
            <header className="bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40">
                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center gap-8">

                    <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
                        <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-2xl tracking-tight text-white">TrustMarket</span>
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Verified Commerce</span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors bg-[#0f172a] py-2 px-4 rounded-full border border-slate-700">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span>Deliver to </span>
                        <span className="font-bold text-white">Mumbai 400001</span>
                    </div>

                    <div className="flex-1 max-w-2xl h-12 flex rounded-full overflow-hidden bg-[#0f172a] border border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-inner">
                        <input
                            type="text"
                            placeholder="Search for verified authentic products..."
                            className="flex-1 px-6 text-white text-sm bg-transparent outline-none placeholder-slate-500"
                        />
                        <button className="bg-indigo-600 hover:bg-indigo-500 px-8 flex items-center justify-center transition-colors text-white">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer">
                            <ShoppingCart className="w-7 h-7 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                {/* Only show User Profile button if not an agent */}
                                {userRole === 'USER' && (
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-sm hover:bg-indigo-500 hover:text-white transition-all"
                                    >
                                        <User className="w-4 h-4" /> My Profile
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white font-bold text-sm hover:bg-slate-600 transition-all"
                            >
                                <LogIn className="w-4 h-4" /> Sign In
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Listing */}
            <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 lg:p-10 pb-20">

                {/* Categories */}
                <div className="flex overflow-x-auto pb-4 gap-3 mb-8 scrollbar-hide">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as CategoryType)}
                                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap border
                  ${isActive
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                        : 'bg-[#1e293b] border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                                    }
                `}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                {cat.label}
                            </button>
                        )
                    })}
                </div>

                {/* Hero */}
                {activeCategory === 'All' && (
                    <div className="mb-12 rounded-3xl overflow-hidden relative h-[400px] bg-[#0f172a] border border-slate-700 shadow-2xl group">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"
                            alt="Hero"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
                        <div className="relative h-full flex flex-col justify-center p-12 lg:p-20 max-w-3xl">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    AI Powered Verification
                                </span>
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                    Live Video Packing
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                                The New Standard <br /> of Trust.
                            </h1>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
                                Shop confidently with real-time video verification.
                                Watch your item being packed and verified before you pay.
                            </p>
                            <button className="w-fit bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
                                Start Exploring
                            </button>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        {activeCategory === 'All' ? 'Curated Selection' : `${activeCategory} Collection`}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onSelect={handleProductSelect}
                        />
                    ))}
                </div>
            </main>

            <Footer onNavigateToSupport={() => navigate('/support')} />
        </div>
    );
};

export default Home;
