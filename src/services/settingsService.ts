/**
 * @license
 * Settings Service for Cloud Firestore.
 * Allows the Admin to customize site-wide phone numbers, address, hero headlines, and brand copy.
 */
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseErrors';
import { SITE_CONFIG, PhoneContact } from '../config/siteConfig';

export interface FirestoreSiteSettings {
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubAr: string;
  heroSubEn: string;
  aboutAr: string;
  aboutEn: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr: string;
  workingHoursEn: string;
  phones: PhoneContact[];
  facebookUrl: string;
  tiktokUrl: string;
  updatedAt?: string;
  updatedBy?: string;
}

const SETTINGS_DOC_ID = 'site_config';

export const defaultSettings: FirestoreSiteSettings = {
  heroHeadlineAr: SITE_CONFIG.brand.heroHeadlineAr,
  heroHeadlineEn: SITE_CONFIG.brand.heroHeadlineEn,
  heroSubAr: SITE_CONFIG.brand.heroSubAr,
  heroSubEn: SITE_CONFIG.brand.heroSubEn,
  aboutAr: SITE_CONFIG.brand.aboutAr,
  aboutEn: SITE_CONFIG.brand.aboutEn,
  addressAr: SITE_CONFIG.contact.addressAr,
  addressEn: SITE_CONFIG.contact.addressEn,
  workingHoursAr: SITE_CONFIG.contact.workingHoursAr,
  workingHoursEn: SITE_CONFIG.contact.workingHoursEn,
  phones: SITE_CONFIG.contact.phones,
  facebookUrl: SITE_CONFIG.social.facebook,
  tiktokUrl: SITE_CONFIG.social.tiktok,
};

export const subscribeSiteSettings = (onUpdate: (settings: FirestoreSiteSettings) => void) => {
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({
          ...defaultSettings,
          ...(snapshot.data() as FirestoreSiteSettings),
        });
      } else {
        onUpdate(defaultSettings);
      }
    },
    (error) => {
      console.warn('Using default site settings fallback:', error.message);
      onUpdate(defaultSettings);
    }
  );
};

export const saveSiteSettings = async (
  newSettings: Partial<FirestoreSiteSettings>,
  updatedBy: string
) => {
  const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
  const payload = {
    ...defaultSettings,
    ...newSettings,
    updatedAt: new Date().toISOString(),
    updatedBy,
  };

  try {
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `settings/${SETTINGS_DOC_ID}`);
  }
};
