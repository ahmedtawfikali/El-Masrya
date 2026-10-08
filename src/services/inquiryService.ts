/**
 * @license
 * Inquiry & Lead Management Service for Cloud Firestore.
 */
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseErrors';

export interface FirestoreInquiry {
  id: string;
  fullName: string;
  phone: string;
  inquiryType: 'offer' | 'request' | 'consultation' | 'property_inquiry';
  propertyId?: string;
  propertyTitle?: string;
  propertyType?: string;
  area?: string;
  budgetOrPrice?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

const COLLECTION_NAME = 'inquiries';

export const submitInquiry = async (
  data: Omit<FirestoreInquiry, 'id' | 'status' | 'createdAt'> & { id?: string }
) => {
  const inquiryId = data.id || `inq-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, inquiryId);

  const payload: FirestoreInquiry = {
    ...data,
    id: inquiryId,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(docRef, payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${inquiryId}`);
  }
};

export const subscribeInquiries = (onUpdate: (inquiries: FirestoreInquiry[]) => void) => {
  const collRef = collection(db, COLLECTION_NAME);
  const q = query(collRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const list: FirestoreInquiry[] = [];
      snapshot.forEach((docSnap) => {
        list.push({
          ...(docSnap.data() as FirestoreInquiry),
          id: docSnap.id,
        });
      });
      // Sort newest first
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    }
  );
};

export const updateInquiryStatus = async (
  inquiryId: string,
  status: 'new' | 'contacted' | 'closed'
) => {
  const docRef = doc(db, COLLECTION_NAME, inquiryId);
  try {
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${inquiryId}`);
  }
};

export const deleteInquiry = async (inquiryId: string) => {
  const docRef = doc(db, COLLECTION_NAME, inquiryId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${inquiryId}`);
  }
};
