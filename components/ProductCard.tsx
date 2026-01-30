import React from 'react';
import { Star, ShieldCheck, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const formattedPrice = product.price.toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group bg-[#1e293b] rounded-xl border border-slate-700/50 hover:border-indigo-500/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-[#0f172a] overflow-hidden p-6 flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           {product.seller.verified && (
             <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <ShieldCheck className="w-3 h-3" /> VERIFIED SELLER
             </div>
           )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
           <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{product.category}</span>
        </div>
        
        <h3 className="text-base font-semibold text-slate-100 leading-tight mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
           <div className="flex text-amber-400">
             <Star className="w-3.5 h-3.5 fill-current" />
             <span className="text-xs font-bold text-slate-200 ml-1">{product.seller.rating}</span>
           </div>
           <span className="text-xs text-slate-500">• {product.seller.completedVerifications} verified sales</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400">Price</span>
             <span className="text-lg font-bold text-white">₹{formattedPrice}</span>
           </div>
           
           <button className="w-8 h-8 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;