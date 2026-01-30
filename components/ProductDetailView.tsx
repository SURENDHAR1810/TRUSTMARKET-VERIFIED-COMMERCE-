import React, { useState, useRef, useEffect } from 'react';
import {
   ArrowLeft,
   ShieldCheck,
   Loader2,
   CheckCircle2,
   Video,
   Camera,
   ShoppingBag,
   Star,
   Clock,
   Play,
   Info,
   PackageCheck,
   Lock,
   Send,
   User
} from 'lucide-react';
import { Product, VerificationStatus, Seller, Review, Verification } from '../types';
import { checkApiKeyAvailability, requestApiKey, generateProductVerificationVideo } from '../services/geminiService';
import { verificationService } from '../services/verificationService';
import { useAuth } from '../context/AuthContext';
import SellerTrustChart from './SellerTrustChart';
import Footer from './Footer';

interface ProductDetailViewProps {
   product: Product;
   isLoggedIn: boolean;
   initialTab?: 'overview' | 'video' | 'reviews';
   onBack: () => void;
   onCheckout: () => void;
   onLoginRequired: () => void;
   onNavigateToSupport: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({
   product,
   isLoggedIn,
   initialTab = 'overview',
   onBack,
   onCheckout,
   onLoginRequired,
   onNavigateToSupport
}) => {
   const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'reviews'>(initialTab);
   const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.IDLE);
   const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
   const [activeImage, setActiveImage] = useState(0);
   const [videoWatched, setVideoWatched] = useState(false);

   // Review State
   const [reviews, setReviews] = useState<Review[]>(product.reviews);
   const [newRating, setNewRating] = useState(0);
   const [newComment, setNewComment] = useState('');

   // Persistence State
   const { userData, user: authUser } = useAuth();
   const [verification, setVerification] = useState<Verification | null>(null);

   const videoRef = useRef<HTMLVideoElement>(null);

   // Sync reviews when product changes
   useEffect(() => {
      setReviews(product.reviews);
      setNewRating(0);
      setNewComment('');
   }, [product]);

   // Update active tab if initialTab changes (e.g. re-navigation)
   useEffect(() => {
      setActiveTab(initialTab);
   }, [initialTab]);

   // Load existing verification
   useEffect(() => {
      const loadVerification = async () => {
         if (authUser?.uid && product.id) {
            const existing = await verificationService.findVerification(product.id, authUser.uid);
            if (existing) {
               setVerification(existing);
               // Map stored status to UI status
               if (existing.status === 'pending') setStatus(VerificationStatus.IDLE);
               if (existing.status === 'video_ready' || existing.status === 'watched') {
                  setStatus(VerificationStatus.REVIEWING);
                  setGeneratedVideoUrl(existing.videoUrl || null);
                  if (existing.status === 'watched') setVideoWatched(true);
               }
               if (existing.status === 'approved') setStatus(VerificationStatus.APPROVED);
            }
         }
      };
      loadVerification();
   }, [authUser, product.id]);

   const updateVerificationStatus = async (newStatus: Verification['status'], additional: Partial<Verification> = {}) => {
      if (verification?.id) {
         await verificationService.updateStatus(verification.id, newStatus, additional);
      }
   };

   const handleSubmitReview = () => {
      if (newRating === 0 || !newComment.trim()) return;

      const review: Review = {
         id: `new-${Date.now()}`,
         user: isLoggedIn ? 'John Doe' : 'Guest User',
         avatar: isLoggedIn ? 'JD' : 'GU',
         rating: newRating,
         comment: newComment,
         date: 'Just now'
      };

      setReviews([review, ...reviews]);
      setNewRating(0);
      setNewComment('');
   };

   // Trigger the generation of the packing video
   const handleBuyAndVerify = async () => {
      // Enforce Login
      if (!isLoggedIn) {
         onLoginRequired();
         return;
      }

      try {
         setStatus(VerificationStatus.CONNECTING);
         const hasKey = await checkApiKeyAvailability();
         if (!hasKey) await requestApiKey();

         setStatus(VerificationStatus.GENERATING);

         // 1. Create verification record in Firestore if not exists
         let currentVer = verification;
         if (!currentVer && authUser) {
            currentVer = await verificationService.requestVerification(product.id, authUser.uid, product.sellerId) as Verification;
            setVerification(currentVer);
         }

         // 2. Generate video (Simulating worker upload)
         const url = await generateProductVerificationVideo(product.name, product.description);
         setGeneratedVideoUrl(url);

         // 3. Update status in Firestore
         if (currentVer) {
            await verificationService.updateStatus(currentVer.id, 'video_ready', { videoUrl: url });
         }

         setStatus(VerificationStatus.REVIEWING);
      } catch (err) {
         console.error(err);
         setStatus(VerificationStatus.IDLE);
      }
   };

   const handleApproveAndPay = async () => {
      setStatus(VerificationStatus.APPROVED);
      await updateVerificationStatus('approved');
   };

   const handleVideoEnd = async () => {
      setVideoWatched(true);
      await updateVerificationStatus('watched');
   };

   return (
      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col relative">

         {/* Navbar */}
         <div className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-700 px-4 h-16 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
               <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="flex items-center gap-2 text-sm font-bold">
               <ShieldCheck className="w-4 h-4 text-emerald-400" />
               Verified Commerce
            </div>
         </div>

         <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1 pb-20">

            {/* LEFT: Media Gallery */}
            <div className="space-y-6">
               <div className="relative aspect-square md:aspect-video bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden flex items-center justify-center">
                  {/* Overlay for Generation Process */}
                  {(status === VerificationStatus.GENERATING || status === VerificationStatus.REVIEWING || status === VerificationStatus.APPROVED) && (
                     <div className="absolute inset-0 z-20 bg-[#0f172a] flex flex-col items-center justify-center">
                        {status === VerificationStatus.GENERATING && (
                           <div className="text-center p-8 animate-in fade-in zoom-in">
                              <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6 mx-auto" />
                              <h3 className="text-2xl font-bold text-white mb-2">Connecting to Warehouse</h3>
                              <p className="text-slate-400">Agent is picking and packing your item...</p>
                           </div>
                        )}

                        {status === VerificationStatus.REVIEWING && generatedVideoUrl && (
                           <div className="w-full h-full flex flex-col">
                              <div className="bg-emerald-900/30 p-2 text-center text-emerald-400 text-xs font-bold uppercase tracking-widest border-b border-emerald-500/20">
                                 Live Packing Feed
                              </div>
                              <video
                                 src={generatedVideoUrl}
                                 className="w-full flex-1 object-contain bg-black"
                                 controls
                                 autoPlay
                                 onEnded={handleVideoEnd}
                              />
                           </div>
                        )}
                     </div>
                  )}

                  {/* Standard Gallery Content */}
                  {activeTab === 'video' ? (
                     <video
                        src={product.staticVideoUrl}
                        controls
                        className="w-full h-full object-contain bg-black"
                     />
                  ) : (
                     <img
                        src={product.images[activeImage] || product.imageUrl}
                        alt="Product"
                        className="w-full h-full object-contain"
                     />
                  )}
               </div>

               {/* Thumbnails */}
               <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                     <button
                        key={idx}
                        onClick={() => { setActiveImage(idx); setActiveTab('overview'); }}
                        className={`w-24 h-24 rounded-lg border-2 overflow-hidden flex-shrink-0 bg-[#1e293b] ${activeImage === idx && activeTab === 'overview' ? 'border-indigo-500' : 'border-transparent opacity-60'}`}
                     >
                        <img src={img} className="w-full h-full object-cover" />
                     </button>
                  ))}
                  {/* Product Video Thumbnail (Static) */}
                  <button
                     onClick={() => setActiveTab('video')}
                     className={`w-24 h-24 rounded-lg border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-1 text-xs font-bold text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all ${activeTab === 'video' ? 'border-indigo-500 text-indigo-400' : ''}`}
                  >
                     <Play className="w-6 h-6" />
                     Product Video
                  </button>
               </div>
            </div>

            {/* RIGHT: Info & Actions */}
            <div className="flex flex-col">
               <div className="mb-6">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs mb-2 block">{product.category}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>

                  <div className="flex items-center gap-6 text-sm">
                     <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        {product.seller.rating}
                     </div>
                     <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        Verified Seller
                     </div>
                     <div className="text-slate-500">ID: {product.id.toUpperCase()}</div>
                  </div>
               </div>

               <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 text-sm">inclusive of all taxes</span>
               </div>

               {/* Tabs */}
               <div className="flex border-b border-slate-700 mb-6">
                  {['overview', 'reviews'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 font-medium text-sm capitalize transition-all border-b-2 ${activeTab === tab ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-white'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>

               {/* Tab Content */}
               <div className="flex-1 min-h-[200px]">
                  {(activeTab === 'overview' || activeTab === 'video') && (
                     <div className="space-y-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        <p className="text-slate-300 leading-relaxed text-lg">{product.description}</p>
                        <div>
                           <h3 className="text-sm font-bold text-white uppercase mb-3">Key Features</h3>
                           <ul className="grid grid-cols-2 gap-3">
                              {product.features.map(feat => (
                                 <li key={feat} className="flex items-center gap-2 text-sm text-slate-400">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {feat}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                           <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-indigo-400" /> Seller Transparency
                           </h3>
                           <SellerTrustChart data={product.seller.trustHistory} />
                        </div>
                     </div>
                  )}

                  {activeTab === 'reviews' && (
                     <div className="space-y-8 animate-in slide-in-from-bottom-2 fade-in duration-300">

                        {/* Summary Header */}
                        <div className="flex items-center gap-4 bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                           <div className="flex flex-col items-center justify-center pr-6 border-r border-slate-700">
                              <span className="text-4xl font-bold text-white">
                                 {reviews.length > 0
                                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                    : '0.0'}
                              </span>
                              <div className="flex text-amber-400 my-1">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? 'fill-current' : 'text-slate-600'}`} />
                                 ))}
                              </div>
                              <span className="text-xs text-slate-400">{reviews.length} Reviews</span>
                           </div>
                           <div className="flex-1">
                              <h3 className="font-bold text-white mb-1">Customer Feedback</h3>
                              <p className="text-sm text-slate-400">Share your experience with verified purchases.</p>
                           </div>
                        </div>

                        {/* Write Review Form */}
                        <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                           <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Write a Review</h3>
                           <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-2">
                                 <span className="text-sm text-slate-400 mr-2">Your Rating:</span>
                                 {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                       key={star}
                                       onClick={() => setNewRating(star)}
                                       className="focus:outline-none hover:scale-110 transition-transform"
                                    >
                                       <Star
                                          className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                                       />
                                    </button>
                                 ))}
                                 {newRating > 0 && <span className="text-sm text-indigo-400 font-medium ml-2">{newRating} Stars</span>}
                              </div>

                              <textarea
                                 value={newComment}
                                 onChange={(e) => setNewComment(e.target.value)}
                                 placeholder={isLoggedIn ? "Share your thoughts on the product packing and quality..." : "Please login to write a verified review."}
                                 disabled={!isLoggedIn}
                                 className="w-full bg-[#0f172a] border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:border-indigo-500 outline-none resize-none h-32 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              />

                              <div className="flex justify-end">
                                 <button
                                    onClick={handleSubmitReview}
                                    disabled={!isLoggedIn || newRating === 0 || !newComment.trim()}
                                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                                 >
                                    <Send className="w-4 h-4" />
                                    Post Review
                                 </button>
                              </div>
                              {!isLoggedIn && (
                                 <div className="text-xs text-center text-slate-500 mt-2">
                                    Only verified users can post reviews.
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-4">
                           {reviews.length > 0 ? (
                              reviews.map(review => (
                                 <div key={review.id} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg text-sm">
                                             {review.avatar}
                                          </div>
                                          <div>
                                             <div className="flex items-center gap-2">
                                                <span className="font-bold text-white">{review.user}</span>
                                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">Verified</span>
                                             </div>
                                             <span className="text-xs text-slate-500">{review.date}</span>
                                          </div>
                                       </div>
                                       <div className="flex bg-[#0f172a] px-2 py-1 rounded-lg border border-slate-700">
                                          {[...Array(5)].map((_, i) => (
                                             <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                                          ))}
                                       </div>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{review.comment}</p>
                                 </div>
                              ))
                           ) : (
                              <div className="text-center py-12 bg-[#1e293b] rounded-xl border border-slate-700 border-dashed">
                                 <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-slate-500" />
                                 </div>
                                 <h3 className="text-slate-300 font-bold mb-1">No reviews yet</h3>
                                 <p className="text-slate-500 text-sm">Be the first to share your experience!</p>
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>

               {/* Sticky Action Footer */}
               <div className="mt-8 pt-6 border-t border-slate-700">

                  {/* IDLE STATE: Buy & Verify */}
                  {status === VerificationStatus.IDLE && (
                     <div className="space-y-3">
                        <button
                           onClick={handleBuyAndVerify}
                           className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-14 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
                        >
                           {isLoggedIn ? (
                              <>
                                 <PackageCheck className="w-5 h-5" />
                                 Buy & Verify Packing
                              </>
                           ) : (
                              <>
                                 <Lock className="w-4 h-4" />
                                 Login to Buy & Verify
                              </>
                           )}
                        </button>
                        <p className="text-center text-xs text-slate-500">
                           A live packing video will be generated for your approval before final charge.
                        </p>
                     </div>
                  )}

                  {/* GENERATING STATE */}
                  {status === VerificationStatus.GENERATING && (
                     <button disabled className="w-full bg-slate-800 text-slate-400 font-bold h-14 rounded-xl flex items-center justify-center gap-3 cursor-not-allowed">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Preparing Live Feed...
                     </button>
                  )}

                  {/* REVIEWING STATE */}
                  {status === VerificationStatus.REVIEWING && (
                     <div className="space-y-3">
                        <div className="flex gap-4">
                           <button onClick={() => setStatus(VerificationStatus.IDLE)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold h-14 rounded-xl transition-all">
                              Reject Condition
                           </button>
                           <button
                              onClick={handleApproveAndPay}
                              disabled={!videoWatched}
                              className={`flex-[2] font-bold h-14 rounded-xl flex items-center justify-center gap-3 transition-all ${videoWatched ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                           >
                              {videoWatched ? (<><CheckCircle2 className="w-5 h-5" /> Approve & Pay</>) : 'Watch Full Packing Video'}
                           </button>
                        </div>
                        <p className="text-center text-xs text-amber-400 animate-pulse">
                           Please watch the entire packing process to ensure item quality.
                        </p>
                     </div>
                  )}

                  {/* APPROVED STATE */}
                  {status === VerificationStatus.APPROVED && (
                     <button
                        onClick={onCheckout}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold h-14 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] animate-pulse"
                     >
                        <ShoppingBag className="w-5 h-5" />
                        Complete Payment
                     </button>
                  )}
               </div>
            </div>
         </div>

         <Footer onNavigateToSupport={onNavigateToSupport} />
      </div>
   );
};

export default ProductDetailView;