import React from 'react';
import { ArrowLeft, Video, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

interface SellerDashboardProps {
  onBack: () => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
       <div className="sticky top-0 z-40 bg-[#1e293b] border-b border-slate-700 px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
             <h1 className="font-bold text-lg text-white">TrustMarket Agent Portal</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-sm font-bold text-emerald-400">Live</span>
          </div>
       </div>

       <div className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                <span className="text-slate-400 text-sm">Pending Requests</span>
                <h3 className="text-3xl font-bold text-white mt-2">12</h3>
             </div>
             <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                <span className="text-slate-400 text-sm">Completed Today</span>
                <h3 className="text-3xl font-bold text-white mt-2">45</h3>
             </div>
             <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                <span className="text-slate-400 text-sm">Avg. Response Time</span>
                <h3 className="text-3xl font-bold text-white mt-2">2m 30s</h3>
             </div>
             <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                <span className="text-slate-400 text-sm">Rating</span>
                <h3 className="text-3xl font-bold text-white mt-2">4.9</h3>
             </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-6">Live Verification Queue</h2>
          
          <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-[#0f172a] text-slate-400 text-sm border-b border-slate-700">
                      <th className="p-4 font-medium">Product</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Requested</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Action</th>
                   </tr>
                </thead>
                <tbody>
                   {MOCK_PRODUCTS.slice(0, 5).map((p, i) => (
                      <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <img src={p.imageUrl} className="w-10 h-10 rounded-md object-cover bg-black" />
                               <span className="font-bold text-white text-sm line-clamp-1 max-w-[200px]">{p.name}</span>
                            </div>
                         </td>
                         <td className="p-4 text-sm text-slate-300">{p.category}</td>
                         <td className="p-4 text-sm text-slate-300">{i * 5 + 2}m ago</td>
                         <td className="p-4">
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit">
                               <Clock className="w-3 h-3" /> Pending
                            </span>
                         </td>
                         <td className="p-4 text-right">
                            <button className="text-indigo-400 hover:text-white text-sm font-bold flex items-center gap-1 justify-end ml-auto">
                               <Video className="w-4 h-4" /> Start Session
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default SellerDashboard;