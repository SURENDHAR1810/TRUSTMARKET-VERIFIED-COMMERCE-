import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    DocumentData,
    QueryConstraint,
    WithFieldValue
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Generic Firestore service for standard CRUD operations
 */

export const createDocument = async <T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    data: T
) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(`Error creating ${collectionName}:`, error);
        throw error;
    }
};

export const setDocument = async <T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    docId: string,
    data: T
) => {
    try {
        await setDoc(doc(db, collectionName, docId), {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true });
        return { id: docId, ...data };
    } catch (error) {
        console.error(`Error setting ${collectionName}/${docId}:`, error);
        throw error;
    }
};

export const getDocument = async <T>(collectionName: string, docId: string): Promise<T | null> => {
    try {
        const docSnap = await getDoc(doc(db, collectionName, docId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as unknown as T;
        }
        return null;
    } catch (error) {
        console.error(`Error getting ${collectionName}/${docId}:`, error);
        throw error;
    }
};

export interface QueryOptions {
    conditions?: { field: string; operator: any; value: any }[];
    sortBy?: { field: string; direction?: 'asc' | 'desc' };
    limitCount?: number;
}

export const getDocuments = async <T>(
    collectionName: string,
    options: QueryOptions = {}
): Promise<T[]> => {
    try {
        let q = collection(db, collectionName);
        const queryConstraints: QueryConstraint[] = [];

        if (options.conditions) {
            options.conditions.forEach(({ field, operator, value }) => {
                queryConstraints.push(where(field, operator, value));
            });
        }

        if (options.sortBy) {
            queryConstraints.push(orderBy(options.sortBy.field, options.sortBy.direction || 'asc'));
        }

        if (options.limitCount) {
            queryConstraints.push(limit(options.limitCount));
        }

        const finalQuery = query(q, ...queryConstraints);
        const snapshot = await getDocs(finalQuery);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as T));
    } catch (error) {
        console.error(`Error getting collections from ${collectionName}:`, error);
        throw error;
    }
};

export const updateDocument = async (collectionName: string, docId: string, data: Partial<DocumentData>) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error(`Error updating ${collectionName}/${docId}:`, error);
        throw error;
    }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        return true;
    } catch (error) {
        console.error(`Error deleting ${collectionName}/${docId}:`, error);
        throw error;
    }
};
