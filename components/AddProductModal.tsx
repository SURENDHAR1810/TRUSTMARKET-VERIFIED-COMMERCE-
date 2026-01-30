import React, { useState } from 'react';
import { X, Upload, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/productService';

interface AddProductModalProps {
    sellerId: string;
    onClose: () => void;
    onSuccess: (product: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ sellerId, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Electronics' as Product['category'],
        imageUrl: '',
        features: ['']
    });

    const categories: Product['category'][] = ['Electronics', 'Fashion', 'Home', 'Accessories', 'Beauty', 'Sports', 'Automotive'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
                sellerId,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
                images: [formData.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'],
                features: formData.features.filter(f => f.trim() !== ''),
                staticVideoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Placeholder
                status: 'active'
            };

            const result = await productService.createProduct(productData);
            onSuccess(result as Product);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">List New Product</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Product Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors"
                                placeholder="e.g. Sony WH-1000XM5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Price (₹)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors"
                                placeholder="29999"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors text-xs"
                                    placeholder="https://..."
                                />
                                <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex-shrink-0">
                                    {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-5 h-5 m-3 text-slate-600" />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors h-32 resize-none"
                            placeholder="Describe your product in detail..."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">Key Features</label>
                        {formData.features.map((feat, idx) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    value={feat}
                                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                    className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl p-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                                    placeholder={`Feature ${idx + 1}`}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="text-indigo-400 hover:text-white text-xs font-bold flex items-center gap-1 mt-2"
                        >
                            <Plus className="w-3 h-3" /> Add another feature
                        </button>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-[#1e293b]">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-slate-300 hover:text-white font-bold transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold px-8 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        {loading ? 'Creating...' : <><Check className="w-5 h-5" /> List Product</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
