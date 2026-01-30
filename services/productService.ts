import {
    createDocument,
    getDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    QueryOptions
} from './firestoreService';
import { Product } from '../types';

const COLLECTION_NAME = 'products';

/**
 * Service for managing product data in Firestore
 */
export const productService = {
    /**
     * Create a new product listing
     */
    async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
        return createDocument(COLLECTION_NAME, productData);
    },

    /**
     * Get a single product by ID
     */
    async getProduct(productId: string) {
        return getDocument<Product>(COLLECTION_NAME, productId);
    },

    /**
     * Get all active products
     */
    async getActiveProducts(options: Partial<QueryOptions> = {}) {
        const queryOptions: QueryOptions = {
            ...options,
            conditions: [
                ...(options.conditions || []),
                { field: 'status', operator: '==', value: 'active' }
            ],
            sortBy: options.sortBy || { field: 'createdAt', direction: 'desc' }
        };
        return getDocuments<Product>(COLLECTION_NAME, queryOptions);
    },

    /**
     * Get products by seller ID
     */
    async getProductsBySeller(sellerId: string) {
        return getDocuments<Product>(COLLECTION_NAME, {
            conditions: [{ field: 'sellerId', operator: '==', value: sellerId }],
            sortBy: { field: 'createdAt', direction: 'desc' }
        });
    },

    /**
     * Update product details
     */
    async updateProduct(productId: string, data: Partial<Product>) {
        return updateDocument(COLLECTION_NAME, productId, data);
    },

    /**
     * Delete a product
     */
    async deleteProduct(productId: string) {
        return deleteDocument(COLLECTION_NAME, productId);
    }
};

export default productService;
