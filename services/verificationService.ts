import {
    createDocument,
    getDocument,
    getDocuments,
    updateDocument,
    setDocument,
    QueryOptions
} from './firestoreService';
import { Verification } from '../types';
import { serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'verifications';

/**
 * Service for managing product verification requests in Firestore
 */
export const verificationService = {
    /**
     * Create a new verification request
     */
    async requestVerification(productId: string, buyerId: string, sellerId: string) {
        const verificationData: Omit<Verification, 'id' | 'requestedAt' | 'updatedAt'> = {
            productId,
            buyerId,
            sellerId,
            status: 'pending'
        };
        // We use a specific ID format or auto-ID
        return createDocument(COLLECTION_NAME, {
            ...verificationData,
            requestedAt: serverTimestamp()
        });
    },

    /**
     * Get verification by ID
     */
    async getVerification(verificationId: string) {
        return getDocument<Verification>(COLLECTION_NAME, verificationId);
    },

    /**
     * Get verifications for a buyer
     */
    async getBuyerVerifications(buyerId: string) {
        return getDocuments<Verification>(COLLECTION_NAME, {
            conditions: [{ field: 'buyerId', operator: '==', value: buyerId }],
            sortBy: { field: 'requestedAt', direction: 'desc' }
        });
    },

    /**
     * Get verifications for a seller
     */
    async getSellerVerifications(sellerId: string) {
        return getDocuments<Verification>(COLLECTION_NAME, {
            conditions: [{ field: 'sellerId', operator: '==', value: sellerId }],
            sortBy: { field: 'requestedAt', direction: 'desc' }
        });
    },

    /**
     * Find existing verification for a buyer-product pair
     */
    async findVerification(productId: string, buyerId: string) {
        const results = await getDocuments<Verification>(COLLECTION_NAME, {
            conditions: [
                { field: 'productId', operator: '==', value: productId },
                { field: 'buyerId', operator: '==', value: buyerId }
            ],
            limitCount: 1
        });
        return results.length > 0 ? results[0] : null;
    },

    /**
     * Update verification status
     */
    async updateStatus(verificationId: string, status: Verification['status'], additionalData: Partial<Verification> = {}) {
        const updateData: Partial<Verification> = {
            ...additionalData,
            status,
            updatedAt: serverTimestamp()
        };

        if (status === 'approved' || status === 'rejected') {
            updateData.completedAt = serverTimestamp();
        }

        return updateDocument(COLLECTION_NAME, verificationId, updateData);
    }
};

export default verificationService;
