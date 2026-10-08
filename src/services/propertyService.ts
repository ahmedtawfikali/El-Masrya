/**
 * @license
 * Property Service for Cloud Firestore operations.
 */
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseErrors';
import { Property } from '../types';
import { PROPERTIES } from '../data/properties';

const COLLECTION_NAME = 'properties';

export const subscribeProperties = (onUpdate: (properties: Property[]) => void) => {
  const collRef = collection(db, COLLECTION_NAME);
  const q = query(collRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const list: Property[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          ...(data as Property),
          id: docSnap.id,
        });
      });
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    }
  );
};

export const savePropertyToFirestore = async (property: Partial<Property>, creatorUid: string) => {
  const propertyId = property.id || `prop-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, propertyId);

  const payload = {
    ...property,
    id: propertyId,
    creatorUid,
    status: 'active',
    updatedAt: new Date().toISOString(),
    createdAt: property.createdAt || new Date().toISOString(),
  };

  try {
    await setDoc(docRef, payload, { merge: true });
    return propertyId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${propertyId}`);
  }
};

export const deletePropertyFromFirestore = async (propertyId: string) => {
  const docRef = doc(db, COLLECTION_NAME, propertyId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${propertyId}`);
  }
};

/**
 * Seeds initial rich sample properties if the collection is empty.
 */
export const seedInitialPropertiesIfEmpty = async (creatorUid: string) => {
  try {
    const collRef = collection(db, COLLECTION_NAME);
    const existing = await getDocs(collRef);
    if (!existing.empty) {
      return false; // Already has data
    }

    for (const prop of PROPERTIES) {
      const docRef = doc(db, COLLECTION_NAME, prop.id);
      await setDoc(docRef, {
        ...prop,
        creatorUid: creatorUid || 'system-admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return true;
  } catch (error) {
    console.error('Error seeding properties:', error);
    return false;
  }
};
