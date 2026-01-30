import {
    createDocument,
    getDocument,
    getDocuments,
    updateDocument,
    QueryOptions
} from './firestoreService';
import { Order } from '../types';
import { serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'orders';

/**
 * Service for managing purchase records in Firestore
 */
export const orderService = {
    /**
     * Create a new order
     */
    async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
        return createDocument(COLLECTION_NAME, {
            ...orderData,
            status: 'processing',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    },

    /**
     * Get orders for a buyer
     */
    async getBuyerOrders(buyerId: string) {
        return getDocuments<Order>(COLLECTION_NAME, {
            conditions: [{ field: 'buyerId', operator: '==', value: buyerId }],
            sortBy: { field: 'createdAt', direction: 'desc' }
        });
    },

    /**
     * Get orders for a seller
     */
    async getSellerOrders(sellerId: string) {
        return getDocuments<Order>(COLLECTION_NAME, {
            conditions: [{ field: 'sellerId', operator: '==', value: sellerId }],
            sortBy: { field: 'createdAt', direction: 'desc' }
        });
    },

    /**
     * Update order status
     */
    async updateOrderStatus(orderId: string, status: Order['status']) {
        return updateDocument(COLLECTION_NAME, orderId, {
            status,
            updatedAt: serverTimestamp()
        });
    }
};

export default orderService;
