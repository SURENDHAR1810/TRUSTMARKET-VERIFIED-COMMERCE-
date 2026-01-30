import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, Home } from 'lucide-react';

const Unauthorized: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-slate-200 p-4">
            <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-600 p-3 rounded-xl shadow-lg shadow-red-500/20">
                        <ShieldX className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
                <p className="text-slate-400 mb-8">
                    You don't have permission to access this page. Please contact support if you believe this is an error.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/25 transition-all"
                >
                    <Home className="w-5 h-5" />
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
