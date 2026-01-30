import React from 'react';
import { ArrowLeft, Package, User, CreditCard, MapPin, History, MessageSquare } from 'lucide-react';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Product, Order } from '../types';

interface UserProfileProps {
   onBack: () => void;
   onNavigateToSupport: () => void;
   onProductSelect: (product: Product, initialTab?: 'overview' | 'video' | 'reviews') => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack, onNavigateToSupport, onProductSelect }) => {
   const { user, userData } = useAuth();
   const [orders, setOrders] = React.useState<Order[]>([]);
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      const fetchOrders = async () => {
         if (user?.uid) {
            try {
               const buyerOrders = await orderService.getBuyerOrders(user.uid);
               setOrders(buyerOrders);
            } catch (error) {
               console.error("Error fetching orders:", error);
            } finally {
               setLoading(false);
            }
         }
      };
      fetchOrders();
   }, [user]);

   if (loading) {
      return (
         <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
         <div className="sticky top-0 z-40 bg-[#1e293b] border-b border-slate-700 px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5" />
               </button>
               <h1 className="font-bold text-lg text-white">My Profile</h1>
            </div>
         </div>

         <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 flex-1">
            {/* User Info Card */}
            <div className="flex items-center gap-6 bg-[#1e293b] p-8 rounded-2xl border border-slate-700">
               <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg uppercase">
                  {userData?.name?.substring(0, 2) || 'U'}
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-white">{userData?.name || 'User'}</h2>
                  <p className="text-slate-400">{user?.email}</p>
                  <div className="flex gap-2 mt-4">
                     <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">Verified Buyer</span>
                     <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full border border-indigo-500/20">Prime Member</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Stats */}
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors group">
                  <Package className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-1">12 Orders</h3>
                  <p className="text-slate-400 text-sm">3 Pending Delivery</p>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors group">
                  <MapPin className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-1">Mumbai</h3>
                  <p className="text-slate-400 text-sm">Primary Address</p>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors group">
                  <CreditCard className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-1">Visa •••• 4242</h3>
                  <p className="text-slate-400 text-sm">Default Payment</p>
               </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden">
               <div className="p-6 border-b border-slate-700 flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-white">Order History</h3>
               </div>

               <div className="divide-y divide-slate-700">
                  {orders.length > 0 ? orders.map((order) => (
                     <div key={order.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-700/20 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 bg-[#0f172a] rounded-lg flex items-center justify-center overflow-hidden border border-slate-700">
                              <Package className="w-8 h-8 text-slate-600" />
                           </div>
                           <div>
                              <h4 className="font-bold text-white line-clamp-1">{order.productName}</h4>
                              <div className="flex flex-col gap-1 mt-1">
                                 <p className="text-sm text-slate-400">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                 <p className="text-xs text-slate-500">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Just now'}</p>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="font-bold text-white">₹{order.productPrice.toLocaleString('en-IN')}</p>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded border uppercase tracking-tighter ${order.status === 'processing' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                 order.status === 'shipped' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                    order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                       'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                 }`}>
                                 {order.status}
                              </span>
                           </div>
                           <div className="flex gap-2">
                              <button
                                 onClick={onNavigateToSupport}
                                 className="px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2 border border-indigo-500/20"
                              >
                                 <MessageSquare className="w-4 h-4" />
                                 Support
                              </button>
                           </div>
                        </div>
                     </div>
                  )) : (
                     <div className="p-12 text-center text-slate-500">
                        <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>You haven't placed any orders yet.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <Footer onNavigateToSupport={onNavigateToSupport} />
      </div>
   );
};

export default UserProfile;