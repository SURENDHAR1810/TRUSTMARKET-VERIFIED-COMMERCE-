import React from 'react';
import { ArrowLeft, Video, Clock, CheckCircle2, MoreHorizontal, Package, Plus, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { verificationService } from '../services/verificationService';
import { Product, Verification } from '../types';
import AddProductModal from './AddProductModal';

interface SellerDashboardProps {
   onBack: () => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ onBack }) => {
   const { user } = useAuth();
   const [activeTab, setActiveTab] = React.useState<'queue' | 'products' | 'stats'>('queue');
   const [products, setProducts] = React.useState<Product[]>([]);
   const [verifications, setVerifications] = React.useState<Verification[]>([]);
   const [loading, setLoading] = React.useState(true);
   const [showAddModal, setShowAddModal] = React.useState(false);

   React.useEffect(() => {
      const fetchData = async () => {
         if (user?.uid) {
            try {
               const [sellerProducts, sellerVers] = await Promise.all([
                  productService.getProductsBySeller(user.uid),
                  verificationService.getSellerVerifications(user.uid)
               ]);
               setProducts(sellerProducts);
               setVerifications(sellerVers);
            } catch (error) {
               console.error("Error fetching seller data:", error);
            } finally {
               setLoading(false);
            }
         }
      };
      fetchData();
   }, [user]);

   if (loading) {
      return (
         <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
         </div>
      );
   }

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                  <span className="text-slate-400 text-sm">Active Queue</span>
                  <h3 className="text-3xl font-bold text-white mt-2">{verifications.filter(v => v.status === 'pending').length}</h3>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                  <span className="text-slate-400 text-sm">Products</span>
                  <h3 className="text-3xl font-bold text-white mt-2">{products.length}</h3>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                  <span className="text-slate-400 text-sm">Avg. Response Time</span>
                  <h3 className="text-3xl font-bold text-white mt-2">--</h3>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                  <span className="text-slate-400 text-sm">Trust Score</span>
                  <h3 className="text-3xl font-bold text-white mt-2">4.9</h3>
               </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-700 mb-8">
               <button
                  onClick={() => setActiveTab('queue')}
                  className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'queue' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
               >
                  Verification Queue
               </button>
               <button
                  onClick={() => setActiveTab('products')}
                  className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'products' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
               >
                  Product Management
               </button>
            </div>

            {activeTab === 'queue' ? (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold text-white">Live Requests</h2>
                     <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Updated just now
                     </div>
                  </div>

                  <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr className="bg-[#0f172a] text-slate-400 text-sm border-b border-slate-700">
                              <th className="p-4 font-medium">Customer/Product</th>
                              <th className="p-4 font-medium">Status</th>
                              <th className="p-4 font-medium">Requested</th>
                              <th className="p-4 font-medium text-right">Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {verifications.length > 0 ? verifications.map((v) => {
                              const product = products.find(p => p.id === v.productId);
                              return (
                                 <tr key={v.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                    <td className="p-4">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-lg bg-[#0f172a] flex items-center justify-center border border-slate-700 overflow-hidden">
                                             {product?.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-slate-500" />}
                                          </div>
                                          <div>
                                             <div className="font-bold text-white text-sm">{product?.name || 'Unknown Product'}</div>
                                             <div className="text-xs text-slate-500">ID: {v.id.slice(0, 8).toUpperCase()}</div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-4">
                                       <span className={`px-2 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit uppercase tracking-tighter ${v.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                          v.status === 'video_ready' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                             v.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                          }`}>
                                          <Clock className="w-3 h-3" /> {v.status.replace('_', ' ')}
                                       </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-400">
                                       {v.requestedAt?.toDate ? v.requestedAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                                    </td>
                                    <td className="p-4 text-right">
                                       <button className="text-indigo-400 hover:text-white text-sm font-bold flex items-center gap-1 justify-end ml-auto">
                                          <Video className="w-4 h-4" />
                                          {v.status === 'pending' ? 'Record Video' : 'View Record'}
                                       </button>
                                    </td>
                                 </tr>
                              );
                           }) : (
                              <tr>
                                 <td colSpan={4} className="p-12 text-center text-slate-500">
                                    <Video className="w-8 h-8 mx-auto mb-4 opacity-20" />
                                    <p>No verification requests in queue</p>
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            ) : (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-bold text-white">Your Product Catalog</h2>
                     <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                     >
                        <Plus className="w-4 h-4" /> Add Product
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {products.length > 0 ? products.map(p => (
                        <div key={p.id} className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden group hover:border-indigo-500/50 transition-all">
                           <div className="aspect-video relative overflow-hidden">
                              <img src={p.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                              <div className="absolute top-2 right-2">
                                 <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                    {p.status.toUpperCase()}
                                 </span>
                              </div>
                           </div>
                           <div className="p-4">
                              <h3 className="font-bold text-white mb-1 line-clamp-1">{p.name}</h3>
                              <p className="text-xs text-slate-400 mb-4 line-clamp-2">{p.description}</p>
                              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                                 <span className="text-white font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                                 <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                    <MoreHorizontal className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     )) : (
                        <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                           <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                           <p className="mb-4">No products found in your catalog</p>
                           <button className="text-indigo-400 hover:text-white font-bold text-sm">Create your first listing</button>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>

         {showAddModal && user && (
            <AddProductModal
               sellerId={user.uid}
               onClose={() => setShowAddModal(false)}
               onSuccess={(newProd) => {
                  setProducts(prev => [newProd, ...prev]);
                  setShowAddModal(false);
               }}
            />
         )}
      </div>
   );
};

export default SellerDashboard;